import { generateNewWallet, saveNewWallet } from "@/core/api";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { useState } from "react";
import { toast } from "react-toastify";

interface CreateWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleReload: () => void;
}

interface NewWallet {
  publicAddress: string;
  secretKey: string;
}

const emptyWallet = {
  publicAddress: '',
  secretKey: ''
};

const CreateWalletModal: React.FC<CreateWalletModalProps> = ({ isOpen, onClose, handleReload }) => {
  const [newWallet, setNewWallet] = useState<NewWallet>(emptyWallet);
  const [walletName, setWalletName] = useState<string>('');

  const handleGenerateWallet = async () => {
    const newWallet = await generateNewWallet();
    setNewWallet(newWallet);
  }

  const handleSaveNewWallet = async () => {
    if(walletName === '') {
      toast.warning('Please enter your wallet name');
      return;
    }
    if(newWallet.publicAddress === '' || newWallet.secretKey === '') {
      toast.warning('Please generate wallet');
      return;
    }
    const walletData = {
      wallet: {
        walletName: walletName,
        publicAddress: newWallet.publicAddress,
        secretKey: newWallet.secretKey,
      }
    };
    const result = await saveNewWallet(walletData);
    if(result.status) {
      toast.success(result.msg);
    } else {
      toast.error(result.msg);
    }
    handleReload();
  }

  const handleWalletNameChange = (e:any) => {
    setWalletName(e.target.value);
  }

  return (
    <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Generate New Wallet</ModalHeader>
        <ModalBody>
          <div className="flex flex-col gap-4">
            <div className="flex flex-row gap-2 items-center">
              <div>Wallet Name :</div>
              <div>
                <input type='text' className="border rounded-lg p-2" placeholder="Enter wallet name" onChange={(e) => handleWalletNameChange(e)} value={walletName}/>
              </div>
            </div>
            <div className="w-full">
            {
              newWallet.publicAddress !== '' &&
              <div className="flex flex-col text-sm">
                <p className=" font-bold ">Public Address</p>
                <p className="flex flex-wrap break-all">{newWallet.publicAddress}</p>
                <p className="font-bold mt-2">Secret Key</p>
                <p className="flex flex-wrap break-all">{newWallet.secretKey}</p>
              </div>
            }
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Close
          </Button>
          <Button color="primary" onPress={handleGenerateWallet}>
            Generate
          </Button>
          <Button color="success" onPress={handleSaveNewWallet}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default CreateWalletModal;