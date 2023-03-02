import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';
import ProfileCreation from '../components/Create_profile';
import Dashboard from '../components/Dashboard';
import { useAccount, useConnect, useDisconnect,  } from 'wagmi'



const Home: NextPage = () => {

  const { disconnect } = useDisconnect()
  const { address, isConnected } = useAccount()
  const [hydrated, setHydrated] = useState(false);


  useEffect(() => {
		setHydrated(true);
	}, []);

	
  if (!hydrated) {
		return null;
	}


  return (

    <div className={styles.container}>
      <Head>
        <title>Digital Identity DApp</title>
      </Head>

      {
        isConnected? (
          <div className={styles.main}>
            <ConnectButton />
            <Dashboard />
          </div>

        ):(

          <div>
            <main className={styles.main}>
            
            <ConnectButton />
            <h1 className={styles.title}>
              Welcome to Arweave Digital Identity DApp
            </h1>

            <p className={styles.description}>
              Developed using NextJs Solidity Arweave
            </p>
          </main>

          <footer className={styles.footer}>
            <a href="https://github.com/sajad-salehi" target="_blank" rel="noopener noreferrer">
              Made by SajadDev 
            </a>
          </footer>
          </div>
        )
      }

    </div>
  );
};

export default Home;
