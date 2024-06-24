import { getSellSettings, updateSellSetting } from "@/core/api";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getWallets } from "@/core/api";

interface FormSellValues {
  xAmount?: number;
  yAmount?: number;
  zAmount?: number;
  zProfit?: number;
  [key: string]: boolean | number | undefined; // Index signature
}

const SellContent: React.FC = () => {
  const [formSellValues, setFormSellValues] = useState<FormSellValues>({
    xAmount: undefined,
    yAmount: undefined,
    zAmount: undefined,
    zProfit: undefined,
  });

  const [isUpdatingSell, setUpdatingSell] = useState<boolean>(false);

  const handleChangeSell = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = event.target;

    setFormSellValues((prevState) => ({
      ...prevState,
      [name]: value === '' ? undefined : Number(value),
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getSellSettings();
        if (result.status) {
          setSellData(result.data);
        } else {
          toast.warning(result.msg);
        }
        // Do something with the result if needed
      } catch (error) {
        console.error("Error updating buy setting:", error);
      }
    };
    fetchData();
  }, []);

  const handleUpdateSell = async () => {
    setUpdatingSell(true);
    const result = await updateSellSetting(formSellValues);
    if (result.status) {
      toast.success(result.msg);
      setSellData(result.data);
    } else {
      toast.warning(result.msg);
    }
    setUpdatingSell(false);
  };

  const setSellData = (data: any) => {
    const newData = {
      xAmount: data.xAmount,
      yAmount: data.yAmount,
      zAmount: data.zAmount,
      zProfit: data.zProfit,
    };
    setFormSellValues(newData);
  };

  return (
    <div>
      <div className="flex flex-row w-full p-4 gap-4">
        <div className="flex-1"></div>
        <div className="flex-1 border p-4 rounded-lg border-[#3d3d3d] border-dashed flex flex-col">
          <div className="flex flex-col gap-2 mb-2">
            <div className="text-center text-xl">Sell Settings</div>

            <div>Between 10%-20% profit :</div>
            <input
              type="number"
              placeholder="sell X% of available tokens"
              className="rounded-md p-1 px-3"
              name="xAmount"
              value={formSellValues.xAmount ?? ''}
              onChange={handleChangeSell}
            />
            <div>Between 21%-30% profit :</div>
            <input
              type="number"
              placeholder="sell Y% of available tokens"
              className="rounded-md p-1 px-3"
              name="yAmount"
              value={formSellValues.yAmount ?? ''}
              onChange={handleChangeSell}
            />
            <div>More than (x%) profit :</div>
            <input
              type="number"
              placeholder="(x%) profit"
              className="rounded-md p-1 px-3"
              name="zProfit"
              value={formSellValues.zProfit ?? ''}
              onChange={handleChangeSell}
            />
            <input
              type="number"
              placeholder="sell Z% of available tokens"
              className="rounded-md p-1 px-3"
              name="zAmount"
              value={formSellValues.zAmount ?? ''}
              onChange={handleChangeSell}
            />
          </div>
        </div>
        <div className="flex-1"></div>
      </div>
      <div className="flex w-full justify-center">
        <Button
          color="secondary"
          isLoading={isUpdatingSell}
          className="w-fit"
          size="lg"
          onClick={handleUpdateSell}
        >
          Update
        </Button>
      </div>
    </div>
  );
};

export default SellContent;
