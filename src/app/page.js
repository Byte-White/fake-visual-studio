"use client"
import Image from 'next/image'
import React, { useState, useEffect } from 'react';
import Explorer from './explorer';
import Editor from './editor';
import LiteMode from './litemode';

import { initializeApp } from "firebase/app";
import {getFirestore,collection,doc,getDoc,getDocs,addDoc,setDoc,deleteDoc, onSnapshot,serverTimestamp} from "firebase/firestore"
import { isMobile, isTablet } from 'react-device-detect';


const firebaseConfig = {

  apiKey: process.env.NEXT_PUBLIC_API_KEY,

  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,

  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,

  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,

  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,

  appId: process.env.NEXT_PUBLIC_APP_ID

};
const fire = initializeApp(firebaseConfig);
const db = getFirestore(fire);
const explorer = collection(db,'explorer');
const main = doc(explorer,'main.cs');
const zadacha = doc(explorer,'zadacha');


export default function Home() {
  const firebaseData = {
    mainDoc: main,
    zadachaDoc: zadacha,
  };
  const [tab, setTab] = useState(0);
  const [lite, setLite] = useState(-1);//select version (lite is intended for mobile)
  if(isMobile && lite===-1){
    return (
      <div className='flex w-screen h-screen bg-gray-950'>
       <button className="ml-2 px-4 py-2 w-1/2 bg-green-800 text-white rounded-lg" onClick={()=>{setLite(1)}}>
          <Image src="/mobile-solid.svg" alt="Mobile" width={35} height={40} />
       </button>
       <button className="ml-2 px-4 py-2 w-1/2 bg-green-600 text-white rounded-lg" onClick={()=>{setLite(0)}}>
       <Image src="/desktop-solid.svg" alt="Desktop" width={50} height={50} /> 
       </button>
      </div>
    )
  }
  else if(lite===1)
  {
    return (
      <div className='flex h-screen bg-gray-950'>
        <LiteMode firebaseData={firebaseData} selectedTab={tab} ChangeTab={setTab}/>
      </div>
    )
  }
  else if(lite===0 || isMobile!=true){
    return (
      <div className='flex h-screen bg-gray-950'>
        <Explorer firebaseData={firebaseData} selectedTab={tab} ChangeTab={setTab}/>
        <Editor firebaseData={firebaseData} selectedTab={tab}/>
      </div>
    )
  }
}
