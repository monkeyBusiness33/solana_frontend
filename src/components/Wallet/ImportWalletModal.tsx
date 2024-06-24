import { importNewWallet } from "@/core/api";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { useState } from "react";
import { toast } from "react-toastify";
import { AppDispatch, RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { setWalletInfo } from "@/redux/features/usersReducer";

interface ImportWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleReload: () => void;
}

interface NewWallet {
  publicAddress: string;
  secretKey: string;
}

const emptyWallet = {
  publicAddress: "",
  secretKey: "",
};

const ImportWalletModal: React.FC<ImportWalletModalProps> = ({
  isOpen,
  onClose,
  handleReload,
}) => {
  const [secretKey, setSecretKey] = useState<string>("");
  const [walletName, setWalletName] = useState<string>("");
  const [newWallet, setNewWallet] = useState<NewWallet>(emptyWallet);
  const dispatch: AppDispatch = useDispatch();

  const handleSecretKeyChange = (e: any) => {
    setSecretKey(e.target.value);
  };

  const handleWalletNameChange = (e: any) => {
    setWalletName(e.target.value);
  };

  const handleImport = async () => {
    const walletData = {
      wallet: {
        walletName: walletName,
        secretKey: secretKey,
      },
    };
    if (!walletName || !secretKey) {
      toast.error("wallet name and key is required");
    } else {
      dispatch(setWalletInfo({publicKey:secretKey,connected:true}))
      const result = await importNewWallet(walletData);
      if (result.status) {
        toast.success(result.msg);
      } else {
        toast.error(result.msg);
      }
      handleReload();
    }
  };

  return (
    <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          Import New Wallet
        </ModalHeader>
        <ModalBody>
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-row gap-2 items-center justify-center">
              <div className="w-[105px] text-right">Wallet Name :</div>
              <div>
                <input
                  type="text"
                  className="border rounded-lg p-2"
                  placeholder="Enter wallet name"
                  onChange={(e) => handleWalletNameChange(e)}
                  value={walletName}
                />
              </div>
            </div>
            <div className="flex flex-row gap-2 items-center justify-center">
              <div className="w-[105px] text-right">Secret Key :</div>
              <div>
                <input
                  type="text"
                  className="border rounded-lg p-2"
                  placeholder="Enter secret key"
                  onChange={(e) => handleSecretKeyChange(e)}
                  value={secretKey}
                />
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Close
          </Button>
          <Button color="primary" onPress={handleImport}>
            Import
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ImportWalletModal;
