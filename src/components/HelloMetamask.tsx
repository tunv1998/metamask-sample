import { useEffect } from "react";
import { useMetamask, ConnectMetamask, loadSmartContract } from "../metamask";
import dapp from "../metamask/dapp";

export default function HelloMetamask() {
  const { user, setContract, disconnected } = useMetamask();
  const setSmartContract = () => {
    setContract(loadSmartContract(dapp.address, dapp.abi));
  };

  useEffect(() => {
    setSmartContract();
  }, []);

  return (
    <div className="flex flex-col items-center bg-slate-100 h-screen justify-center">
      <div className="shadow-lg text-center border border-slate-300 bg-white p-10 rounded-md">
        {!user.isConnected ? (
          <ConnectMetamask />
        ) : (
          <>
            <div className="my-3 uppercase text-sm tracking-widest font-light">
              Wallet connected
            </div>
            <div className="my-3 tracking-widest font-extrabold">
              {user.address}
            </div>
            <div className="my-3 uppercase tracking-wide text-xs">
              Balance: {user.balance.toString().slice(0, 10)} ETH
            </div>
            <button
              className="bg-red-500 text-white px-5 py-3 rounded-md my-2 font-bold tracking-wider text-center hover:cursor-pointer uppercase cursor-pointer"
              onClick={disconnected}
            >
              Disconnected
            </button>
          </>
        )}
      </div>
    </div>
  );
}
