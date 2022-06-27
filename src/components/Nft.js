import React, { useEffect, useState } from "react";
import {
  Connection,
  clusterApiUrl,
  LAMPORTS_PER_SOL,
  PublicKey,
} from "@solana/web3.js";
import {
  getParsedNftAccountsByOwner,
  isValidSolanaAddress,
} from "@nfteyez/sol-rayz";

import Collectible from "./Collectible";
const Nft = (props) => {
  const [nftData, setNftData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(null);

  const getProvider = async () => {
    if ("solana" in window) {
      await window.solana.connect();
      const provider = window.solana;

      if (provider.isPhantom) {
        return provider;
      }
    } else {
      window.open("https://www.phantom.app/", "_blank");
    }
  };
  const getAllNftData = async () => {
    try {
      const provider = await getProvider();
      let ownerToken = provider.publicKey;

      //get balance
      const connection = new Connection(
        clusterApiUrl("mainnet-beta"),
        "confirmed"
      );
      //finish
      let wallet = new PublicKey(ownerToken.toString());
      let balance = await connection.getBalance(wallet);
      setBalance(balance);
      const result = isValidSolanaAddress(ownerToken);
      const nfts = await getParsedNftAccountsByOwner({
        publicAddress: ownerToken,
      });
      return nfts;
    } catch (error) {
      console.log("HAYATATATTAATA");
      console.log(error);
    }
  };
  useEffect(() => {
    async function data() {
      let res = await getAllNftData();
      setNftData(res);
      setLoading(true);
    }
    data();
  }, []);
  return (
    <>
      <section className="nft mt-2 my-5">
        <div className="container">
          <div className="row text-center">
            <div className="col-12">
              <h4 className="title">NFT</h4>
            </div>
            <h3>{balance / LAMPORTS_PER_SOL} SOL</h3>
          </div>
          <div className="row  d-flex justify-content-center">
            {loading ? (
              <>
                {nftData &&
                  nftData.length > 0 &&
                  nftData.map((val, ind) => {
                    return <Collectible val={val} key={ind} />;
                  })}
              </>
            ) : (
              <>
                <p className="text-center">loading...</p>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Nft;
