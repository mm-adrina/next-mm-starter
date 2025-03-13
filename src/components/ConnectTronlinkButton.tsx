'use client';
import { Button } from './ui/button';

import { formatAddress } from '../lib/utils';
import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from '@/components/ui/popover';
import { useEffect, useMemo, useState } from 'react';

export const ConnectTronlinktButton = () => {
  const [readyState, setReadyState] = useState('Found');
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      checkConnection();
    }
  }, []);

  const checkConnection = async () => {
    try {
      //@ts-ignore
      if (!window.tronLink) {
        alert('TronLink not installed');
      }

      //@ts-ignore
      await window.tronLink.request({ method: 'tron_requestAccounts' });

      //@ts-ignore
      if (!window.tronLink.tronWeb.defaultAddress.base58) {
        alert('Please log in to TronLink');
      }

      //@ts-ignore
      setWalletAddress(window.tronLink.tronWeb.defaultAddress.base58);
    } catch (err) {
      console.log(err);
      setError((err as Error).message);
    }
  };

  const connectWallet = async () => {
    setError(null);
    await checkConnection();
  };

  const connect = async () => {
    try {
      connectWallet();
    } catch (err) {
      console.warn(`No accounts found`, err);
    }
  };

  const disconnect = () => {};

  //     useEffect(()=>{
  // connectTronLink()
  //     },[])
  // Handle TronLink connection

  return (
    <div className='relative'>
      {walletAddress ? (
        <Popover>
          <PopoverTrigger>
            <Button>{formatAddress(walletAddress)}</Button>
          </PopoverTrigger>
          <PopoverContent className='bg-black-100 right-0 top-10 z-10 mt-2 w-fit rounded-md border shadow-lg'>
            <Button onClick={disconnect}>Disconnet</Button>
          </PopoverContent>
        </Popover>
      ) : (
        <Button
          disabled={readyState === 'Loading' || readyState === 'NotFound'}
          onClick={connect}
        >
          {/* <WalletIcon className="mr-2 h-4 w-4" />  */}
          Connect Tronlink
        </Button>
      )}
    </div>
  );
};
