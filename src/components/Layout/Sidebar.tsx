import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Icon } from "@iconify/react";
import logo from '@/app/logo.svg';
import { usePathname } from 'next/navigation';

interface SideBarProps {
  show: boolean;
  setter: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideBar: React.FC<SideBarProps> = ({ show, setter }) => {
    const pathname = usePathname()
    // Define our base class
    const className = "w-[250px] transition-[margin-left] ease-in-out duration-500 fixed md:static top-0 bottom-0 left-0 z-40";
    // Append class based on state of sidebar visiblity
    const appendClass = show ? " ml-0" : " ml-[-250px] md:ml-0";

    // Clickable menu items
    const MenuItem = ({ icon, name, route }: {icon: React.ReactNode, name: string, route: string}) => {
        // Highlight menu item based on currently displayed route
        const colorClass = pathname === route ? "text-white" : "text-white/50 hover:text-white";

        return (
            <Link
                href={route}
                onClick={() => {
                    setter(oldVal => !oldVal);
                }}
                className={`flex gap-1 [&>*]:my-auto text-md pl-6 py-3 border-b-[1px] border-b-white/10 ${colorClass}`}
            >
                <div className="text-xl flex [&>*]:mx-auto w-[30px]">
                    {icon}
                </div>
                <div>{name}</div>
            </Link>
        )
    }

    // Overlay to prevent clicks in background, also serves as our close button
    const ModalOverlay = () => (
        <div
            className={`flex md:hidden fixed top-0 right-0 bottom-0 left-0 bg-black/50 z-30`}
            onClick={() => {
                setter(oldVal => !oldVal);
            }}
        />
    )

    return (
        <>
            <div className={`${className}${appendClass} bg-[#0e0f11] shadow-md`}>
                <div className="p-14 flex">
                    <Link href="/">
                        {/*eslint-disable-next-line*/}
                        <img src={logo.src} alt="Company Logo" width={300} height={300} />
                    </Link>
                </div>
                <div className="flex flex-col">
                    <MenuItem
                        name="Home"
                        route="/"
                        icon={<Icon icon="flat-color-icons:home" className="mr-1"/>}
                    />
                    <MenuItem
                        name="Setting"
                        route="/settings"
                        icon={<Icon icon="icon-park-twotone:setting" className="mr-1"/>}
                    />
                </div>
            </div>
            {show ? <ModalOverlay /> : <></>}
        </>
    )
};

export default SideBar;