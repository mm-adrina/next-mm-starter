'use client';
import { SidebarTrigger } from '../ui/sidebar';
import { Separator } from '../ui/separator';
import { Breadcrumbs } from '../breadcrumbs';
import SearchInput from '../search-input';
import { UserNav } from './user-nav';
import ThemeToggle from './ThemeToggle/theme-toggle';
import { MetaMaskProvider } from '@metamask/sdk-react';
import { ConnectWalletButton } from '../ConnectWalletButton';

export default function Header() {
  const host =
    typeof window !== 'undefined' ? window.location.host : 'defaultHost';

  const sdkOptions = {
    logging: { developerMode: false },
    checkInstallationImmediately: false,
    dappMetadata: {
      name: 'Next-mm-starter',
      url: host // using the host constant defined above
    }
  };

  return (
    <header className='flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
      <div className='flex items-center gap-2 px-4'>
        <SidebarTrigger className='-ml-1' />
        <Separator orientation='vertical' className='mr-2 h-4' />
        <Breadcrumbs />
      </div>

      <div className='flex items-center gap-2 px-4'>
        <MetaMaskProvider debug={false} sdkOptions={sdkOptions}>
          <ConnectWalletButton />
        </MetaMaskProvider>
        <div className='hidden md:flex'>
          <SearchInput />
        </div>
        <UserNav />
        <ThemeToggle />
      </div>
    </header>
  );
}
