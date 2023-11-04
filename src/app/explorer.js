import { initializeApp } from "firebase/app";
import {getFirestore,collection,doc,getDoc,getDocs,addDoc,setDoc,deleteDoc, onSnapshot,serverTimestamp} from "firebase/firestore"
import React, { useState, useEffect } from 'react';


export default function Explorer({ firebaseData, selectedTab, ChangeTab}) {
    const { mainDoc, zadachaDoc } = firebaseData;

    return (
      <div className="fixed h-screen w-1/6 bg-gray-900 text-white p-4">
        <h className="flex"><img src="visualstudio.png"  width={25}/> Visual Studio</h>
        <div className="p-4">
          <div className="text-gray-600">Solution Explorer</div>
          <ul className="pl-4">
            <li>
              <div className="flex items-center">
                <span className="mr-2">▼</span>
                NewProject2
              </div>
              <ul className="pl-4">
                <li>
                    <div className='flex'><img src="cslogo.png" /><button className={selectedTab===0?"underline":""} onClick={() => {ChangeTab(0)}}>main.cs</button></div>
                </li>
                <li>
                  <button className={selectedTab===1?"underline":""} onClick={() => {ChangeTab(1)}}>zadacha</button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    );
  }