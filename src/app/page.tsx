"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { redirect } from "next/navigation";
import Header from "@/components/Header";

// const socket = io('http://localhost:5001');

export default function Home() {
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 text-white">
      <h1 className=" text-white">Dashboard</h1>
      
    </main>
  );
}
