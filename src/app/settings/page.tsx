"use client";
import { useEffect, useMemo, useState } from "react";
import { Icon } from "@iconify/react";
import { Tabs, Tab, Chip } from "@nextui-org/react";
import WalletContent from "@/components/Wallet/WalletContent";
import BuyContent from "@/components/Buy/BuyContent";
import { useDisclosure, useSelect } from "@nextui-org/react";
import ImportWalletModal from "@/components/Wallet/ImportWalletModal";
import { useDispatch, useSelector } from 'react-redux';
import { Connection } from '@solana/web3.js';
import { AppDispatch, RootState } from '@/redux/store';


export default function Home() {
  const {
    isOpen: isImportWalletOpen,
    onOpen: onImportWalletOpen,
    onClose: onImportWalletClose,
  } = useDisclosure();
  const [reloadTable, setReload] = useState<boolean>(false);
  const handleImportWallet = () => {
    onImportWalletOpen();
    setReload((prev) => !prev);
  };
  const connected = useSelector((state: RootState) => state.users.walletInfo.connected);
  return (
    <div className="flex w-full flex-col p-20 text-gray-400">
      <p className="text-gray-400 text-3xl text-center">Settings</p>
      <div className="flex flex-row gap-4 ml-auto mb-4">
          <button
            className="p-2 border rounded-lg border-[#06b6d4] hover:cursor-pointer hover:bg-[#06b6d4] hover:text-white flex flex-row items-center w-[170px] justify-center"
            onClick={() => handleImportWallet()}
          >
           {connected?'Connected' : 'Connect Wallet'}
            <Icon icon="solar:wallet-money-bold" className="ml-1" />
          </button>
        </div>
        <ImportWalletModal isOpen={isImportWalletOpen} onClose={onImportWalletClose} handleReload={() => setReload((prev) => !prev)}/>
        <BuyContent />
    </div>
  );
}
