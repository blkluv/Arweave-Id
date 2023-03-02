import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';
import { ethers } from 'ethers';
import ProfileCreation from '../components/Create_profile';
import { useAccount, useConnect, useDisconnect, useSigner } from 'wagmi'
const {abi} = require('../NFTManager.json')
const ContractAddress = "0x03b0E3f71DffEF465dA10B287A6f6FEfc6b7785c";


export default function Dashboard() {

  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAccount();
  const { data: signer, isError, isLoading } = useSigner();
  const [isRegister, setIsRegister] = useState(false);


  useEffect(() => {
    if (isConnected && address) {
      checkRegistration();
    }
  }, [isConnected, address, signer]);


  const checkRegistration = async () => {
    try {
      const contract = new ethers.Contract(ContractAddress, abi, signer);
      const status = await contract.authenticate(address);
      if (status != null && status != undefined) {
        setIsRegister(status)
      }
      
    } catch (error) {
      console.error(error);
    }
  };



  return (

    <div className={styles.container}>

      {
        isRegister? (
            <div></div>

        ):(

            <ProfileCreation />
        )
      }

    </div>
  );
};

