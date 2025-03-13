// Type definitions
declare global {
  interface Window {
    tronWeb?: {
      request: (args: { method: string }) => Promise<void>;
      defaultAddress: {
        base58: string;
      };
      on: (event: string, callback: () => void) => void;
      removeListener: (event: string, callback: () => void) => void;
    };
  }
}
