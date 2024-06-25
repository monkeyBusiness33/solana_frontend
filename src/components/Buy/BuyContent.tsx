import { getBuySettings, updateBuySetting } from "@/core/api";
import { Switch, Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getWallets } from "@/core/api";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";

interface FormValues {
  investAmount?: number;
  gasFee?: number;
  slippageAmount?: number;
  xAmount?: number;
  yAmount?: number;
  zAmount?: number;
  zProfit?: number;
  [key: string]: boolean | number | undefined; // Index signature
}
// interface Wallet {
//   secretKey: string;
//   walletName: string;
//   publicAddress: string;
// }
const BuyContent: React.FC = () => {
  const connected = useSelector(
    (state: RootState) => state.users.walletInfo.publicKey
  );
  const [formValues, setFormValues] = useState<FormValues>({
    investAmount: undefined,
    gasFee: undefined,
    slippageAmount: undefined,
    xAmount: undefined,
    yAmount: undefined,
    zAmount: undefined,
    zProfit: undefined,
  });
  // const [wallets, setWallets] = useState<Wallet[]>([]);
  const [selectedWallet, setSelectedWallet] = useState<string>("");
  const [tokenAddress, setTokenAddress] = useState<string>("");
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [isUpdating, setUpdating] = useState<boolean>(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = event.target;

    setFormValues((prevState) => ({
      ...prevState,
      [name]: value === "" ? undefined : Number(value), // Convert empty string to undefined, and parse number
    }));
  };

  useEffect(() => {
    console.log(formValues);
  }, [formValues]);

  // useEffect(() => {
  // const fetchDataW = async () => {
  //   const data = await getWallets();
  //   setWallets(data.data);
  // };

  // fetchDataW();
  //   const fetchData = async () => {
  //     try {
  //       const result = await getBuySettings();
  //       if (result.status) {
  //         setData(result.data);
  //       } else {
  //         toast.warning(result.msg);
  //       }
  //       // Do something with the result if needed
  //     } catch (error) {
  //       console.error("Error updating buy setting:", error);
  //     }
  //   };

  //   if (connectWallet) {
  //     fetchData();
  //   } else {
  //     toast.warning("Connect Wallet");
  //   }
  // }, [connectWallet]);

  const handleUpdate = async () => {
    if (connected && selectedWallet) {
      setUpdating(true);

      const setting = {
        ...formValues,
        connected,
        tokenAddress,
        walletAddress,
      };
      // console.log("setting", setting);
      const result = await updateBuySetting(setting);
      if (result.status) {
        toast.success(result.msg);
        setData(result.data);
      } else {
        toast.warning(result.msg);
      }
      setUpdating(false);
    } else {
      toast.warning("Connect Wallet, Input Token Address");
    }
  };

  const setData = (data: any) => {
    const newData = {
      gasFee: data.gasFee,
      investAmount: data.investSolAmount,
      slippageAmount: data.buySlippage,
      xAmount: data.xAmount,
      yAmount: data.yAmount,
      zAmount: data.zAmount,
      zProfit: data.zProfit,
    };
    setFormValues(newData);
  };

  const handleChangeWallet = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedWallet(event.target.value);
  };
  const handleTokenChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    selectedWallet == "wallet"
      ? setWalletAddress(event.target.value)
      : setTokenAddress(event.target.value);
  };
  return (
    <div>
      <div className="flex flex-row w-full p-4 gap-4">
        <div className="flex-1 p-4 flex flex-col border rounded-lg border-[#3d3d3d] border-dashed">
          <div>wallet Address : </div>
          <div>
            {connected ? connected : "Connect wallet"}
            {/* <select value={selectedWalletId} onChange={handleChangeWallet}>
              <option value="">Select a wallet</option>
              {walletList}
            </select> */}
          </div>
          <div>Select Target Address</div>
          <select value={selectedWallet} onChange={handleChangeWallet}>
            <option value="account">Account</option>
            <option value="wallet">Wallet</option>
          </select>
          <div>Token/Wallet Address :</div>
          <input
            type="string"
            placeholder="Account/Wallet Address"
            className="rounded-md p-1 px-3"
            name= {selectedWallet=="wallet"? "walletAddress" : "tokenAddress"}
            value={tokenAddress || walletAddress}
            onChange={handleTokenChange}
          />
        </div>

        <div className="flex-1 border p-4 rounded-lg border-[#3d3d3d] border-dashed flex flex-col">
          <div className="flex flex-col gap-2 mb-2">
            <div className="text-center text-xl">Buy Settings</div>
            <div>Invest amount :</div>
            <input
              type="number"
              placeholder="Invest sol amount"
              className="rounded-md p-1 px-3"
              name="investAmount"
              value={formValues.investAmount ?? ""}
              onChange={handleChange}
            />
            <div>Slippage percentage :</div>
            <input
              type="number"
              placeholder="Enter slippage percentage"
              className="rounded-md p-1 px-3"
              name="slippageAmount"
              value={formValues.slippageAmount ?? ""}
              onChange={handleChange}
            />
            <div>Priority Gas Fees :</div>
            <input
              type="number"
              placeholder="Enter priority Gas Fees"
              className="rounded-md p-1 px-3"
              name="gasFee"
              value={formValues.gasFee ?? ""}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex-1 border p-4 rounded-lg border-[#3d3d3d] border-dashed flex flex-col">
          <div className="flex flex-col gap-2 mb-2">
            <div className="text-center text-xl">Sell Settings</div>

            <div>Between 10%-20% profit :</div>
            <input
              type="number"
              placeholder="sell X% of available tokens"
              className="rounded-md p-1 px-3"
              name="xAmount"
              value={formValues.xAmount ?? ""}
              onChange={handleChange}
            />
            <div>Between 21%-30% profit :</div>
            <input
              type="number"
              placeholder="sell Y% of available tokens"
              className="rounded-md p-1 px-3"
              name="yAmount"
              value={formValues.yAmount ?? ""}
              onChange={handleChange}
            />
            <div>More than (x%) profit :</div>
            <input
              type="number"
              placeholder="(x%) profit"
              className="rounded-md p-1 px-3"
              name="zProfit"
              value={formValues.zProfit ?? ""}
              onChange={handleChange}
            />
            <input
              type="number"
              placeholder="sell Z% of available tokens"
              className="rounded-md p-1 px-3"
              name="zAmount"
              value={formValues.zAmount ?? ""}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="flex w-full justify-center">
        <Button
          color="secondary"
          isLoading={isUpdating}
          className="w-fit"
          size="lg"
          onClick={handleUpdate}
        >
          Update
        </Button>
      </div>
    </div>
  );
};

export default BuyContent;
