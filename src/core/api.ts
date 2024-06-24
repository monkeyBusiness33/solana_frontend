import {
  clusterApiUrl,
  Connection,
  PublicKey,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
  TransactionInstruction,
  SYSVAR_RENT_PUBKEY,
  SYSVAR_CLOCK_PUBKEY,
  Keypair
} from '@solana/web3.js';
import bs58 from 'bs58';
import { caxios } from "./utils"

const axiosInstance = caxios(); // Get the axios instance by invoking the caxios function

interface Values {
  username: string;
  password: string;
}

export const User = async (info: Values) => {

}

export const  getWallets = async () => {
  try {
    const walletDatas = await axiosInstance.get('wallet/all'); // Use axios instance to make a post request

    return {
      status: true,
      data: walletDatas.data, // Assuming userData contains the response data
      msg: "Success"
    };
  } catch (err: any) {
    console.error(err);
    return {
      status: false,
      data: [],
      msg: err.message || "Error occurred"
    };
  }
};

export const generateNewWallet = async () => {
  const newWallet = Keypair.generate();
  return {
    publicAddress: newWallet.publicKey.toString(),
    secretKey: bs58.encode(newWallet.secretKey)
  }
}

export const importNewWallet = async ({ wallet }: { wallet: any }) => {
  try {
    const newWallet = Keypair.fromSecretKey(bs58.decode(wallet.secretKey))
    const walletData = {
      walletName: wallet.walletName,
      publicAddress: newWallet.publicKey.toString(),
      secretKey: wallet.secretKey
    }
    const result = await axiosInstance.post('wallet/create', walletData);
    if (result.data?.publicAddress) {
      return {
        status: true,
        msg: 'It has been successfully imported.'
      }
    } else {
      return {
        status: true,
        msg: 'Something wrong. Please try again'
      }
    }
  } catch (err: any) {
    console.log(err.message);
    return {
      status: false,
      msg: err.message
    }
  }
}

export const saveNewWallet = async ({ wallet }: { wallet: any }) => {
  try {
    const result = await axiosInstance.post('wallet/create', wallet);
    if (result.data?.publicAddress) {
      return {
        status: true,
        msg: 'It has been successfully created.'
      }
    } else {
      return {
        status: true,
        msg: 'Something wrong. Please try again'
      }
    }
  } catch (e: any) {
    console.log(e.message);
    return {
      status: false,
      msg: e.message
    }
  }
}

export const statusChangeWallet = async ({ walletId }: { walletId: string }) => {
  try {
    const result = await axiosInstance.post('wallet/status', {
      walletId: walletId
    });

    if (result.data?.publicAddress) {
      return {
        status: true,
        msg: 'It has been successfully updated.'
      }
    } else {
      return {
        status: true,
        msg: 'Something wrong. Please try again'
      }
    }
  } catch (e: any) {
    return {
      status: false,
      msg: e.message
    }
  }
}

export const deleteWallet = async ({ walletId }: { walletId: string }) => {
  try {
    const result = await axiosInstance.post('wallet/delete', {
      walletId
    });

    if (result.data?.publicAddress) {
      return {
        status: true,
        msg: 'It has been successfully deleted.'
      }
    } else {
      return {
        status: false,
        msg: 'Something wrong. Please try again'
      }
    }
  } catch (e: any) {
    return {
      status: false,
      msg: e.message
    }
  }
}

export const updateBuySetting = async (selectedWalletId: string, buySetting: any) => {
  try {
    const result = await axiosInstance.post('settings/buy/update', {
      wallet: selectedWalletId,
      ...buySetting
    });
    const resultAmount = await axiosInstance.post('wallet/sol', {
      wallet: selectedWalletId,
      ...buySetting
    });

    if (result.status === 200 && resultAmount.status === 200) {
      return {
        status: true,
        msg: 'It has been successfully updated',
        data: result.data
      }
    } else {
      return {
        status: false,
        msg: 'Something wrong. Please try again'
      }
    }
  } catch (e: any) {
    return {
      status: false,
      msg: e.message
    }
  }
}

export const getBuySettings = async (selectedWalletIds: string) => {
  try {
    const result = await axiosInstance.post('settings/buy', { wallet: selectedWalletIds });

    if (result.status === 200) {
      return {
        status: true,
        data: result.data
      }
    } else {
      return {
        status: false,
        msg: 'Something wrong. Please try again'
      }
    }
  } catch (e: any) {
    return {
      status: false,
      msg: e.message
    }
  }
}

export const getSellSettings = async () => {
  try {
    const result = await axiosInstance.get('settings/sell',);

    if (result.status === 200) {
      return {
        status: true,
        data: result.data
      }
    } else {
      return {
        status: false,
        msg: 'Something wrong. Please try again'
      }
    }
  } catch (e: any) {
    return {
      status: false,
      msg: e.message
    }
  }
}

export const updateSellSetting = async (sellSetting: any) => {
  try {
    const result = await axiosInstance.post('settings/sell/update', {
      sellSetting
    });

    if (result.status === 200) {
      return {
        status: true,
        msg: 'It has been successfully updated',
        data: result.data
      }
    } else {
      return {
        status: false,
        msg: 'Something wrong. Please try again'
      }
    }
  } catch (e: any) {
    return {
      status: false,
      msg: e.message
    }
  }
}