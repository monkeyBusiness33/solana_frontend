"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Spinner,
  getKeyValue,
  Chip,
  ChipProps,
  Tooltip,
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownItem,
  DropdownMenu,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { shortAddress } from "@/core/utils";
import copy from "copy-to-clipboard";
import { statusChangeWallet, deleteWallet } from "@/core/api";
import { useBalance } from "@/core/useToken";
import { toast } from "react-toastify";

const columns = [
  { name: "NO", uid: "no" },
  { name: "NAME", uid: "walletName" },
  { name: "Wallet Address", uid: "publicAddress" },
  { name: "Current Balance", uid: "walletBalance" },
  { name: "Token Adress(JOCAT)", uid: "tokendAddress" },
  { name: "STATUS", uid: "status" },
  { name: "Buying Amount", uid: "investAmount" },
  { name: "Total Profit/Loss", uid: "profit" },
  { name: "ACTIONS", uid: "actions" },
];

interface WalletlistProps {
  wallets: any[];
  handleReload: () => void;
}

const WalletList: React.FC<WalletlistProps> = ({ wallets, handleReload }) => {
  const RenderCell = ({
    wallet,
    columnKey,
  }: {
    wallet: any;
    columnKey: React.Key;
  }) => {
    const [copyed, setCopyed] = useState<boolean>(false);
    const cellValue = wallet[columnKey as keyof any];
    const handleCopy = () => {
      setCopyed((prev) => !prev);
      copy(cellValue);
      setTimeout(() => setCopyed((prev) => !prev), 1000);
    };

    const handleStart = async (walletId: string) => {
      if (wallet.status) {
        toast.error("It's already activated.");
        return;
      }
      const result = await statusChangeWallet({ walletId });
      if (result.status) {
        toast.success(result.msg);
      } else {
        toast.error(result.msg);
      }
      handleReload();
    };

    const handleDelete = async (walletId: string) => {
      if (wallet.status) {
        toast.error("It's currently working. Please stop it first.");
        return;
      }
      const result = await deleteWallet({ walletId });
      if (result.status) {
        toast.success(result.msg);
      } else {
        toast.error(result.msg);
      }
      handleReload();
    };

    const handleStop = async (walletId: string) => {
      if (!wallet.status) {
        toast.error("It's already deactivated.");
        return;
      }
      const result = await statusChangeWallet({ walletId });
      if (result.status) {
        toast.success(result.msg);
      } else {
        toast.error(result.msg);
      }
      handleReload();
    };
    const balance = useBalance(wallet.publicAddress);
    switch (columnKey) {
      case "no":
        return <div>{wallets.findIndex((w) => w === wallet) + 1}</div>;
      case "publicAddress":
        return (
          <div className="flex flex-row">
            <p className="text-bold text-sm capitalize">
              {shortAddress(cellValue)}
            </p>
            <button onClick={() => handleCopy()}>
              <Icon
                icon={copyed ? "entypo:check" : "ion:copy"}
                className="ml-2 text-lg"
              />
            </button>
          </div>
        );
      case "walletBalance":
        return (
          <div className="flex flex-row">
            <p className="text-bold text-sm capitalize">
              {balance}
            </p>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={cellValue ? "success" : "danger"}
            size="sm"
            variant="flat"
          >
            {cellValue ? "Listening" : "Trading In Progress"}
          </Chip>
        );
      case "investAmount":
        return (
          <div className="flex flex-row justify-center">
            <p className="text-bold text-sm">{cellValue}</p>
          </div>
        );
      case "profit":
        return (
          <div className="flex flex-row justify-center">
            <p className="text-bold text-sm">{cellValue}</p>
          </div>
        );
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown className="bg-background border-1 border-default-200">
              <DropdownTrigger>
                <Button isIconOnly radius="full" size="sm" variant="light">
                  <Icon icon="pepicons-pop:dots-y" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Action Column">
                <DropdownItem onClick={() => handleStart(wallet["_id"])}>
                  Edit
                </DropdownItem>
                <DropdownItem onClick={() => handleStop(wallet["_id"])}>
                  Pause
                </DropdownItem>
                <DropdownItem onClick={() => handleDelete(wallet["_id"])}>
                  Cancel
                </DropdownItem>
                <DropdownItem onClick={() => handleDelete(wallet["_id"])}>
                  View Trading History
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  };

  return (
    <>
      <Table aria-label="Example table with custom cells">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={wallets} emptyContent={"No rows to display."}>
          {(item) => (
            <TableRow key={item["_id"]}>
              {(columnKey) => (
                <TableCell>
                  <RenderCell wallet={item} columnKey={columnKey} />
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default WalletList;
