"use client"
import Image from "next/image";
import { signIn, signUp } from "@/lib/auth-client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router=useRouter();
  const [toSignup, setToSignup]=useState(false);
  const [toLogin, setToLogin]=useState(true);
  const [email, setEmail]=useState("");
  const [name, setName]=useState("");
  const [isLoading, setIsLoading]=useState(false);
  
  const [password, setPassword]=useState("");
  const handleSignup = async () => {
    try {
      setIsLoading(true);
      
      const { data, error } = await signUp.email(
        {
          email,
          password,
          name,
        },
        {
          onRequest: () => setIsLoading(true),
          onSuccess: () => {
            setIsLoading(false);
            router.push("/draw");
          },
          onError: (ctx) => {
            setIsLoading(false);
            if (ctx && ctx.error) {
              console.error("Signup error:", ctx.error);
              alert(ctx.error.message);
            } else {
              alert("An unknown error occurred during signup.");
            }
          },
        }
      );
      
      if (error) {
        console.error("Error signing up:", error);
        alert(error.message);
      }
    } catch (err) {
      setIsLoading(false);
      console.error("Unexpected error:", err);
      alert("Something went wrong. Please try again.");
    }
  };
  
  const handleLogin = async () => {
    try {
      setIsLoading(true);
  
      const { data, error } = await signIn.email(
        {
          email,
          password,
          callbackURL: "/draw"
        },{}
        // {
        //   onRequest: () => setIsLoading(true),
        //   onSuccess: (ctx) => {
        //     setIsLoading(false);
        //     console.log("Login successful:", ctx);
        //     alert("Login successful!");
        //     router.push("/dashboard"); // Redirect to a page after login
        //   },
        //   onError: (ctx) => {
        //     setIsLoading(false);
        //     console.error("Login error:", ctx);
  
        //     // Check the error object more closely
        //     if (ctx?.error) {
        //       console.log("Error details:", ctx.error);
        //       alert(ctx.error.message || "Login failed. Please try again.");
        //     } else {
        //       console.log("Unknown error:", ctx);
        //       alert("Login failed. Please try again.");
        //     }
        //   },
        // }
      );
  
      // Check the API response
      console.log("API Login Response:", data);
  
    } catch (err) {
      setIsLoading(false);
      console.error("Unexpected error:", err);
      alert("Something went wrong. Please try again.");
    }
  };
  
  
  



















  
   
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
  <form className={toLogin?"w-full px-12 space-y-4 mt-6":"hidden"}>
    <div>
      <label htmlFor="email" className="block text-black text-lg">Email</label>
      <input
        name="email"
        type="email"
        placeholder="m@example.com"
        className="w-full px-4 py-3 border rounded text-black focus:outline-none focus:ring-2 focus:ring-gray-900"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
      />
    </div>
    <div>
      <label htmlFor="password" className="block text-black text-lg">Password</label>
      <input
        name="password"
        type="password"
        placeholder="qwerty"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        className="w-full px-4 py-3 border rounded text-black focus:outline-none focus:ring-2 focus:ring-gray-900"
      />
    </div>
    <button className="w-full bg-black text-white py-3 rounded text-lg font-bold hover:bg-gray-800" onClick={handleLogin}>{isLoading?"Logging in...":"Login"}</button>
    <p onClick={()=>{
       setPassword("");
       setEmail("");
       setToLogin(false);
       setToSignup(true)

    }} className="text-black hover:text-blue-500 cursor-pointer">Dont have an account? </p>
  </form>
  <form className={toSignup?"w-full px-12 space-y-4 mt-6":"hidden"}>
  <div>
      <label htmlFor="email" className="block text-black text-lg">Name</label>
      <input
        name="name"
        type="text"
        placeholder="biruke"
        className="w-full px-4 py-3 border rounded text-black focus:outline-none focus:ring-2 focus:ring-gray-900"
        value={name}
        onChange={(e)=>setName(e.target.value)}
      />
    </div>
    <div>
      <label htmlFor="email" className="block text-black text-lg">Email</label>
      <input
        name="email"
        type="email"
        placeholder="m@example.com"
        className="w-full px-4 py-3 border rounded text-black focus:outline-none focus:ring-2 focus:ring-gray-900"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
      />
    </div>
    <div>
      <label htmlFor="password" className="block text-black text-lg">Password</label>
      <input
        name="password"
        type="password"
        placeholder="qwerty"
        className="w-full px-4 py-3 border rounded text-black focus:outline-none focus:ring-2 focus:ring-gray-900"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
      />
    </div>
    <button className="w-full bg-black text-white py-3 rounded text-lg font-bold hover:bg-gray-800" onClick={handleSignup}>{isLoading?"Signing up...":"Signup"}</button>
    <p onClick={()=>{
      setPassword("");
      setEmail("");
      setToSignup(false);
      setToLogin(true);
    }}className="text-black hover:text-blue-500 cursor-pointer">Already have an account? </p>
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
