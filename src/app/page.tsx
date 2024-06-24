"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { redirect } from "next/navigation";
import Header from "@/components/Header";

// const socket = io('http://localhost:5001');

export default function Home() {
  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");

  // useEffect(() => {
  //   // Listen for incoming messages
  //   const handleNewMessage = (message: string) => {
  //     console.log(message);
  //     setMessages((prevMessages) => [...prevMessages, message]);
  //   };
  //   socket.on('log', handleNewMessage);

  //   // Clean up the event listener when the component unmounts or when dependencies change
  //   return () => {
  //     socket.off('log', handleNewMessage);
  //   };
  // }, []);

  // const sendMessage = () => {
  //   socket.emit('chat message', newMessage);
  //   setNewMessage('');
  // };
  // const accessDenied = true;
  // if (accessDenied) {
  //   redirect("/login");
  // }
  return (
    
    <main className="flex min-h-screen flex-col items-center justify-between p-24 text-white">

      <h1 className=" text-white">Dashboard</h1>

      {/* <div>
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div> */}
      {/* <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        className="text-white border border-white"
      /> */}
      {/* <button onClick={sendMessage}>Send</button> */}
    </main>
  );
}
