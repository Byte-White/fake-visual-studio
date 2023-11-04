import React, { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import {getFirestore,collection,doc,getDoc,getDocs,addDoc,setDoc,deleteDoc, onSnapshot,serverTimestamp} from "firebase/firestore"

//TODO: tab 1, vs icon, firebase post, phone mode
export default function LiteMode({ firebaseData, selectedTab, ChangeTab}) {
    const { mainDoc, zadachaDoc } = firebaseData;
    const [code, setCode] = useState('');//main.cs code
    const [text, setText] = useState('');//zadacha text
    const lineNumbersCode = code.split('\n').map((_, index) => index + 1);
    const lineNumbersZadacha = text.split('\n').map((_, index) => index + 1);
    
    
    useEffect(() => {
        // vzima koda ot mainDoc
        const fetchData = async () => {
          try {
            const mainSnapshot = await getDoc(mainDoc);
            const zadachaSnapshot = await getDoc(zadachaDoc);
            if (mainSnapshot.exists()) {
              const datamain = mainSnapshot.data();
              const datazadacha = zadachaSnapshot.data();
              setCode(datamain.code);
              setText(datazadacha.text)
            } else {
              console.log('Document does not exist');
            }
          } catch (error) {
            console.error('Error getting document:', error);
          }
        };
        onSnapshot(mainDoc, (doc) => {
            if (doc.exists()) {
              const data = doc.data();
              setCode(data.code);
            }
        });
        onSnapshot(zadachaDoc, (doc) => {
          if (doc.exists()) {
            const data = doc.data();
            setText(data.text);
          }
        });

        fetchData();
      }, [mainDoc,zadachaDoc]); // Specify mainDoc as a dependency

      

    const handleChange = (event) => {
      if(selectedTab===0)
      {
        setCode(event.target.value);
        const newData = {
          code : event.target.value
          };
        setDoc(mainDoc, newData);
      }else{
        setText(event.target.value);
        const newData = {
          text : event.target.value
          };
        setDoc(zadachaDoc, newData);
      }
    };
  
    return (
      <div className="flex-1 flex-col h-screen w-full">
        <div className="h-12 bg-gray-900 flex items-center">
                <button className={selectedTab===0?"underline m-3":"m-3"} onClick={() => {ChangeTab(0)}}>main.cs</button>
                <button className={selectedTab===1?"underline m-3":"m-3"} onClick={() => {ChangeTab(1)}}>zadacha</button>
        </div>
        <div className="flex-1 p-4 bg-gray-950">
          <div className="flex">
            <div className="w-10 pr-2 select-none text-gray-500">
              {selectedTab===0?lineNumbersCode.map((lineNumber, index) => (
                <div key={index}>{lineNumber}</div>
              )):lineNumbersZadacha.map((lineNumber, index) => (
                <div key={index}>{lineNumber}</div>
              ))
              }
            </div>
            <textarea
            className="flex-1 w-full bg-gray-950 text-white border-none p-2 resize-none"
            style={{ overflow: 'hidden', outline: 'none' }} // Set overflow to hidden
              placeholder="Enter your code here..."
              value={selectedTab===0?code:text}
              onChange={handleChange}
              spellCheck={false} // Disable spell-checking
            ></textarea>
          </div>
        </div>
      </div>
    );
  }