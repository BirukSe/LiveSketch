"use client"
import Image from "next/image";
import { signIn } from "@/lib/auth-client";
export default function Home() {
  return (
   <div className="min-h-screen min-w-screen w-full bg-slate-100">
    <div className="flex">
      {/* <div className="sm:w-[50%] min-h-screen flex flex-col items-center justify-center">
        <img src="crayon.png" className="w-10 h-10 "/>
        <h1 className="text-black text-2xl mt-7">Welcome to LiveSketch</h1>
        <div className="flex gap-2 bg-slate-300 p-2 rounded hover:bg-slate-400">
          <img src="google.png" className="w-10 h-10"/>
          <h1 className="text-black text-xl flex justify-center items-center font-bold">Login with google</h1>
        </div>
        <hr className="w-full mx-28 mt-7"></hr>
        <div>
          <h1 className="text-black text-xl">Email</h1>
          <input name="email" type="email" placeholder="biruke@example.com" className="p-4 rounded text-black border-2 border-black"/>
          <h1 className="text-black text-xl">Password</h1>
          <input name="password" type="password" placeholder="qwerty" className="p-4 rounded text-black border-2 border-black"/>
          
        </div>
        <button className="bg-black text-center text-white font-bold w-[238px] mt-7 p-2 rounded mx-14">Login</button>


      </div> */}
      <div className="sm:w-[50%] min-h-screen flex flex-col items-center justify-center bg-white">
  <img src="crayon.png" className="w-10 h-10" alt="Logo" />
  <h1 className="text-black text-2xl mt-7">
    Welcome to <span className="text-green-500">LiveSketch</span>
  </h1>
  <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded mt-4 hover:bg-gray-800" onClick={async ()=>{
    await signIn.social({
      provider: "google",
      callbackURL: "/draw"
    })
    
  }}>
    <img src="google.png" className="w-6 h-6" alt="Google Icon" />
    <span className="text-xl font-bold">Login with Google</span>
  </button>
  <div className="relative flex items-center w-full px-12 mt-6">
    <div className="w-full h-px bg-gray-300"></div>
    <span className="absolute bg-white px-2 text-gray-500">OR</span>
  </div>
  <form className="w-full px-12 space-y-4 mt-6">
    <div>
      <label htmlFor="email" className="block text-black text-lg">Email</label>
      <input
        name="email"
        type="email"
        placeholder="m@example.com"
        className="w-full px-4 py-3 border rounded text-black focus:outline-none focus:ring-2 focus:ring-gray-900"
      />
    </div>
    <div>
      <label htmlFor="password" className="block text-black text-lg">Password</label>
      <input
        name="password"
        type="password"
        placeholder="qwerty"
        className="w-full px-4 py-3 border rounded text-black focus:outline-none focus:ring-2 focus:ring-gray-900"
      />
    </div>
    <button className="w-full bg-black text-white py-3 rounded text-lg font-bold hover:bg-gray-800">Login</button>
  </form>
</div>

      <div className="min-h-screen w-full w-[50%] flex items-center justify-center bg-gradient-to-br from-black via-green-900 to-yellow-500 hidden sm:flex">
  <div className="text-center text-white">
    <h1 className="text-3xl font-semibold">Draw in Real Time</h1>
    <p className="mt-2 text-gray-300 max-w-md mx-7">
    LiveDraw is a real-time collaborative drawing app using Socket.io for instant, synchronized sketching on a shared canvas.
    </p>
    <div className="mt-4">
      <img src="bura.jpg" alt="Profile" className="w-12 h-12 rounded-full mx-auto"/>
      <p className="mt-2 font-medium">Biruk Seyoum</p>
      <p className="text-sm text-gray-400">Developer</p>
    </div>
  </div>
</div>


    </div>


   </div>
  );
}
