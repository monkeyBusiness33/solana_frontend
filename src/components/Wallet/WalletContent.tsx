import { useEffect, useMemo, useState } from "react";
import { Icon } from "@iconify/react";
import { useDisclosure, useSelect } from "@nextui-org/react";
import WalletList from "./WalletList";
import { getWallets } from "@/core/api";
import ImportWalletModal from "./ImportWalletModal";

const WalletContent: React.FC = () => {
  const {
    isOpen: isCreateWalletOpen,
    onOpen: onCreateWalletOpen,
    onClose: onCreateWalletClose,
  } = useDisclosure();
  const {
    isOpen: isImportWalletOpen,
    onOpen: onImportWalletOpen,
    onClose: onImportWalletClose,
  } = useDisclosure();
  const [wallets, setWallets] = useState<any[]>([]);
  const [reloadTable, setReload] = useState<boolean>(false);

  useMemo(() => {
    const fetchData = async () => {
      const data = await getWallets();
      setWallets(data.data);
    };
    fetchData();
  }, [reloadTable]);

  const handleCreateWallet = () => {
    onCreateWalletOpen();
    setReload((prev) => !prev);
  };

  const handleImportWallet = () => {
    onImportWalletOpen();
    setReload((prev) => !prev);
  };

  return (
    <div className="px-8 py-4 w-full flex flex-col">
      {/* <div className="flex flex-row gap-4 ml-auto mb-4">

        <button className="p-2 border rounded-lg border-[#06b6d4] hover:cursor-pointer hover:bg-[#06b6d4] hover:text-white flex flex-row items-center w-[170px] justify-center" onClick={() => handleImportWallet()}>
          Import Wallet
          <Icon icon="solar:wallet-money-bold" className="ml-1"/>
        </button>
      </div> */}
      <div className="w-full">
        <WalletList
          wallets={wallets}
          handleReload={() => setReload((prev) => !prev)}
        />
      </div>

      {/* <ImportWalletModal isOpen={isImportWalletOpen} onClose={onImportWalletClose} handleReload={() => setReload((prev) => !prev)}/> */}
    </div>
  );
};

export default WalletContent;
