import * as web3 from "@solana/web3.js";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Connection } from '@solana/web3.js';
import { AppDispatch, RootState } from '@/redux/store';
import { toast } from "react-toastify";

export const useBalance = (publicKey: string): number | undefined => {
    const dispatch: AppDispatch = useDispatch();

    const connected = useSelector((state: RootState) => state.users.walletInfo.connected);

    const [balance, setBalance] = useState<number | undefined>();
    const [rpcUrl, setRpcUrl] = useState<string | undefined>();

    useEffect(() => {
        const url = 'https://mainnet.helius-rpc.com/?api-key=d973a2d5-0d39-464d-9bc0-ed372343bd53';
        if (!url) {
            toast.error("RPC_URL environment variable is not set");
            console.error("RPC_URL environment variable is not set");
        } else {
            setRpcUrl(url);
        }
    }, []);
 
    useEffect(() => {
        if (!rpcUrl || !publicKey) {
            return;
        }
        console.log("publicKey", publicKey)
        const connection = new Connection(rpcUrl, "confirmed");

        if (publicKey) {
            connection.getBalance(new web3.PublicKey(publicKey)).then((res) => {
                setBalance(res / web3.LAMPORTS_PER_SOL);
            });
        }
    }, [connected, publicKey, rpcUrl, dispatch]);
    console.log("balance", balance)
    return balance;
};