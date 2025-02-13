"use client"
import React, {useEffect, useState} from 'react'
import { useSession } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

const page = () => {
    const {data: session, isPending}=useSession();
    const [join, setJoin]=useState(false);
    const [create, setCreate]=useState(false);
    const [roomId, setRoomId]=useState("");
    const router=useRouter();

    useEffect(()=>{
        if(!session && !isPending){
            router.push('/');

        }

    },[])
  return (
    <div className="min-h-screen w-full bg-slate-100 text-black">
       <div className="flex justify-around pt-4">

        <h1 className="flex justify-center items-center font-bold text-xl">Draw on the Area Provided</h1>
        <button className="bg-green-300 p-3 rounded-2xl hover:bg-green-500" onClick={()=>setJoin(!join)}>Join Room</button>
        <button className="bg-green-300 p-3 rounded-2xl hover:bg-green-500" onClick={()=>setCreate(!create)}>Create Room</button>
        <div className="flex">
            <img src={session?.user.image} className="w-10 h-10 rounded-xl"/>
            <h1 className="flex justify-center items-center pl-1">{session?.user.name}</h1>

        </div>



       </div>
       {join?<div className="bg-white flex flex-col justify-center items-center mx-7 mt-7 shadow-xl py-3 gap-3">
        <h1 className="text-2xl">Join Roomm</h1>
        <input placeholder="Enter roomId" className="border-2 border-black"/>
        <button className="bg-black text-white px-7 w-[210px]">Join Room</button>

       </div>:null}
      
    </div>
  )
}

export default page;
