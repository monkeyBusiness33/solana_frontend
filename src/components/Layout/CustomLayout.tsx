'use client'
import Link from "next/link";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Suspense, useMemo } from "react";
import { NextUIProvider } from "@nextui-org/system";
import CustomHeader from "./CustomHeader";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SideBar from "./Sidebar";

require("@solana/wallet-adapter-react-ui/styles.css");

const CustomLayout = ({ children } : { children: React.ReactNode }) => {
  const router = useRouter();  
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <Suspense>
      <NextUIProvider >
        <div className="min-h-screen bg-[#15171a] dark">
          <div className="flex">
            <SideBar show={showSidebar} setter={setShowSidebar} />
            <div className="flex flex-col flex-grow w-screen md:w-full min-h-screen">
              <CustomHeader />
              {children}
            </div>
          </div>
          <ToastContainer 
            position = "top-right"
            autoClose = {5000}
            hideProgressBar = {false}
            closeOnClick = {true}
            pauseOnHover = {true}
            draggable = {true}
            theme = "light"
          />
        </div>
      </NextUIProvider>
    </Suspense>
  );
}

export default CustomLayout;