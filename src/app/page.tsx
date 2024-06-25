"use client";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import WalletList from "@/components/Wallet/WalletList";
import { getWallets } from "@/core/api";
import WalletContent from "@/components/Wallet/WalletContent";

// const socket = io('http://localhost:5001');

export default function Home() {


  return (
    <main className="flex flex-col items-center justify-between p-24 text-white">
      <h1 className=" text-white">Dashboard</h1>
      <WalletContent></WalletContent>
    </main>
  );
}
