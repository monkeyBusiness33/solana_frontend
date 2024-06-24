import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Header() {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const connected = false;

  const accountInfo = (
    <>
      <div className="grid grid-cols-2 gap-3 items-center">
        <span className="text-xs sm:text-sm font-bold text-white">
          Connected Account
        </span>
        <input
          className="border-none p-1 text-sm focus:outline-none h-6 w-16 sm:w-24 text-white bg-gray-900"
          type="text"
          value={0}
        />
      </div>
      <div className="grid grid-cols-2 gap-3 items-center">
        <span className="text-xs sm:text-sm font-bold text-white">
          SOL Balance
        </span>
        <input
          className="border-none p-1 text-sm focus:outline-none h-6 w-16 sm:w-24 text-white bg-gray-900"
          type="text"
          value={0}
        />
      </div>
    </>
  );
  const connectButton = (
    <>
      <button
        onClick={() => setModal(true)}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 rounded-md border-none focus:outline-none"
      >
        Connect Wallet
      </button>
    </>
  );
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      {connected ? accountInfo : connectButton}
    </div>
  );
}
