"use client";
import React, { useEffect, useState, useRef } from "react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const page = () => {
  const canvasRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, isPending } = useSession();
  const [join, setJoin] = useState(false);
  const [create, setCreate] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [drawing, setDrawing] = useState(false);
  const [color, setColor] = useState("#000000");
  const [shape, setShape] = useState("line"); // Default shape is a freehand line
  const [startPos, setStartPos] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (!session && !isPending) {
      router.push("/");
    }
  }, []);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.strokeStyle = color; // Set stroke color
    ctx.fillStyle = color; // Set fill color for shapes
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

    if (shape === "line") {
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  const stopDrawing = (e) => {
    if (!drawing) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const x = e.clientX - canvas.offsetLeft;
    const y = e.clientY - canvas.offsetTop;

    if (shape === "rectangle") {
      const width = x - startPos.x;
      const height = y - startPos.y;
      ctx.fillRect(startPos.x, startPos.y, width, height);
    } else if (shape === "circle") {
      const radius = Math.sqrt(
        Math.pow(x - startPos.x, 2) + Math.pow(y - startPos.y, 2)
      );
      ctx.beginPath();
      ctx.arc(startPos.x, startPos.y, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    setDrawing(false);
  };

  return (
    <div className="min-h-screen w-full bg-slate-100 text-black">
      {/* Toolbar */}
      <div className="flex justify-around pt-4">
        <h1 className="flex justify-center items-center font-bold text-xl">
          Draw on the Area Provided
        </h1>
        <div>
          <label className="mr-2">Color:</label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
        <select
          className="p-2 border rounded"
          value={shape}
          onChange={(e) => setShape(e.target.value)}
        >
          <option value="line">Freehand</option>
          <option value="rectangle">Rectangle</option>
          <option value="circle">Circle</option>
        </select>
        <div className="flex">
          <img src={session?.user.image} className="w-10 h-10 rounded-xl" />
          <h1 className="flex justify-center items-center pl-1">
            {session?.user.name}
          </h1>
        </div>
      </div>

      {/* Canvas */}
      <div>
        <canvas
          ref={canvasRef}
          className="mx-[25%] mt-7"
          width={Math.min(800, window.innerWidth - 200)}
          height={600}
          style={{
            border: "1px solid black",
            backgroundColor: "white",
            cursor: "crosshair",
            maxWidth: "100%",
          }}
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
