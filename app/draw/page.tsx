"use client";
import React, { useEffect, useState, useRef } from "react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { io } from "socket.io-client";

const page = () => {
  const canvasRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, isPending } = useSession();
  const [roomId, setRoomId] = useState("");
  const [drawing, setDrawing] = useState(false);
  const [color, setColor] = useState("#000000");
  const [shape, setShape] = useState("line");
  const [startPos, setStartPos] = useState(null);
  const router = useRouter();
  const socket = io("http://localhost:3001");

  useEffect(() => {
    if (!session && !isPending) {
      router.push("/");
    }
    
    socket.on("draw", ({ start, end, color, shape }) => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      ctx.strokeStyle = color;
      ctx.fillStyle = color;

      if (shape === "line") {
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();
      } else if (shape === "rectangle") {
        ctx.fillRect(start.x, start.y, end.x - start.x, end.y - start.y);
      } else if (shape === "circle") {
        const radius = Math.sqrt(
          Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2)
        );
        ctx.beginPath();
        ctx.arc(start.x, start.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    return () => {
      socket.off("draw");
    };
  }, []);

  const joinRoom = () => {
    if (roomId) {
      socket.emit("joinRoom", roomId);
    }
  };

  const createRoom = () => {
    const newRoom = Math.random().toString(36).substr(2, 6);
    setRoomId(newRoom);
    socket.emit("createRoom", newRoom);
  };

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 2;
    const x = e.clientX - canvas.offsetLeft;
    const y = e.clientY - canvas.offsetTop;
    setStartPos({ x, y });
    if (shape === "line") {
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
    setDrawing(true);
  };

  const draw = (e) => {
    if (!drawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const x = e.clientX - canvas.offsetLeft;
    const y = e.clientY - canvas.offsetTop;
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    if (shape === "line") {
      ctx.beginPath();
      ctx.moveTo(startPos.x, startPos.y);
      ctx.lineTo(x, y);
      ctx.stroke();
      setStartPos({ x, y });
      socket.emit("draw", { roomId, start: startPos, end: { x, y }, color, shape });
    }
  };

  const stopDrawing = (e) => {
    if (!drawing) return;
    const x = e.clientX - canvasRef.current.offsetLeft;
    const y = e.clientY - canvasRef.current.offsetTop;
    if (shape === "rectangle" || shape === "circle") {
      socket.emit("draw", { roomId, start: startPos, end: { x, y }, color, shape });
    }
    setDrawing(false);
  };

  return (
    <div className="min-h-screen w-full bg-slate-100 text-black">
      <div className="flex justify-around pt-4">
        <h1 className="font-bold text-xl">Draw on the Area Provided</h1>
        <input type="text" placeholder="Enter Room ID" value={roomId} onChange={(e) => setRoomId(e.target.value)} className="border p-2 rounded" />
        <button onClick={joinRoom} className="bg-blue-500 text-white px-4 py-2 rounded">Join Room</button>
        <button onClick={createRoom} className="bg-green-500 text-white px-4 py-2 rounded">Create Room</button>
      </div>
      <div>
        <canvas
          ref={canvasRef}
          className="mx-[25%] mt-7"
          width={Math.min(800, window.innerWidth - 200)}
          height={600}
          style={{ border: "1px solid black", backgroundColor: "white", cursor: "crosshair", maxWidth: "100%" }}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
        ></canvas>
      </div>
    </div>
  );
};

export default page;