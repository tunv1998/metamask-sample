import React, { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";
import getBalance from "./helpers/getBalance";
import requestAccounts from "./helpers/requestAccounts";

type Values = {
  user: User;
  setUser: (values: any) => void;
  contract: any;
  setContract: (values: any) => void;
  getUserInfo: () => void;
  isConnecting: boolean;
  disconnected: () => void;
};

const initialValues: Values = {
  contract: {},
  setContract: () => {},
  user: {
    address: "",
    isConnected: false,
    balance: 0,
  },
  setUser: () => {},
  getUserInfo: () => {},
  isConnecting: false,
  disconnected: () => {},
};

const MetamaskContext = React.createContext<Values>(initialValues);

const MetamaskProvider = ({ children }: any) => {
  const [contract, setContract] = React.useState<any>();
  const [isConnecting, setIsConnecting] = useState(false);
  const [user, setUser] = React.useState<User>({
    address: window.ethereum?.selectedAddress,
    isConnected: false,
    balance: 0,
  });
  const getUserInfo = async () => {
    if (window.ethereum) {
      setIsConnecting(true);
      try {
        const userInfo = await requestAccounts();
        setUser({
          ...user,
          ...userInfo,
        });
      } catch (error) {
      } finally {
        setIsConnecting(false);
      }
    }
  };

  const disconnected = useCallback(() => {
    setUser({
      address: "",
      isConnected: false,
      balance: 0,
    });
  }, []);

  const values: Values = {
    user,
    setUser,
    contract,
    setContract,
    getUserInfo,
    isConnecting,
    disconnected,
  };

  if (window.ethereum)
    window.ethereum.on("accountsChanged", async (accounts: any) => {
      getUserInfo();
    });

  //   useEffect(() => {
  //     const timer = window.setInterval(() => {
  //       getUserInfo();
  //     }, 1500);
  //     return () => clearInterval(timer);
  //   }, []);

  return (
    <MetamaskContext.Provider value={values}>
      {children}
    </MetamaskContext.Provider>
  );
};

export { MetamaskProvider, MetamaskContext };
