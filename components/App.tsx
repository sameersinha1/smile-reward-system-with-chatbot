"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Camera } from "lucide-react";

export default function App() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      alert("Camera permission denied or not available");
      console.error(err);
    }
  };

  return (
    <div className="bg-yellow-100 min-h-screen flex flex-col items-center justify-center gap-6">
      <Card className="p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">
          Smile App Camera Test 😁
        </h1>

        <Button onClick={openCamera}>
          <Camera className="mr-2" />
          Open Camera
        </Button>
      </Card>

      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="mt-4 w-96 rounded-lg border-4 border-black"
      />
    </div>
  );
}
