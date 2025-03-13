'use client';
import { Button } from './ui/button';

import { useSDK } from '@metamask/sdk-react';
import { formatAddress } from '../lib/utils';
import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from '@/components/ui/popover';

export const ConnectWalletButton = () => {
  const { sdk, connected, connecting, account } = useSDK();

  const connect = async () => {
    try {
      await sdk?.connect();
    } catch (err) {
      console.warn(`No accounts found`, err);
    }
  };

  const disconnect = () => {
    if (sdk) {
      sdk.terminate();
    }
  };

  return (
    <div className='relative'>
      {connected ? (
        <Popover>
          <PopoverTrigger>
            <Button>{formatAddress(account)}</Button>
          </PopoverTrigger>
          <PopoverContent className='bg-black-100 right-0 top-10 z-10 mt-2 w-fit rounded-md border shadow-lg'>
            <Button onClick={disconnect}>Disconnet</Button>
          </PopoverContent>
        </Popover>
      ) : (
        <Button disabled={connecting} onClick={connect}>
          {/* <WalletIcon className="mr-2 h-4 w-4" />  */}
          Connect Metamask
        </Button>
      )}
    </div>
  );
};
