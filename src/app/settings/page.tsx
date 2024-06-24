'use client'
import React from "react";
import { Icon } from "@iconify/react";
import {Tabs, Tab, Chip} from "@nextui-org/react";
import WalletContent from "@/components/Wallet/WalletContent";
import BuyContent from "@/components/Buy/BuyContent";
import SellContent from "@/components/Sell/SellContent";

export default function Home() {
  return (
    <div className="flex w-full flex-col p-20 text-gray-400">
      <p className="text-gray-400 text-3xl text-center">Settings</p>
      <Tabs 
        aria-label="Options" 
        color="primary" 
        variant="underlined"
        classNames={{
          tabList: "gap-6 w-full relative rounded-none p-0 ",
          cursor: "w-full bg-[#22d3ee]",
          tab: "max-w-fit px-0 h-12",
          tabContent: "group-data-[selected=true]:text-[#06b6d4]"
        }}
      >
        <Tab
          key="wallet"
          title={
            <div className="flex items-center space-x-2">
              <Icon icon="solar:wallet-money-bold" className="mr-1"/>
              <span>Wallets</span>
            </div>
          }
        >
          <WalletContent />
        </Tab>
        <Tab
          key="buy"
          title={
            <div className="flex items-center space-x-2">
              <Icon icon="game-icons:sell-card" className="mr-1"/>
              <span>Buy</span>
            </div>
          }
        >
          <BuyContent />
        </Tab>
        <Tab
          key="sell"
          title={
            <div className="flex items-center space-x-2">
              <Icon icon="game-icons:buy-card" className="mr-1"/>
              <span>Sell</span>
            </div>
          }
        >
          <SellContent />
        </Tab>
      </Tabs>
    </div>  
  );
}
