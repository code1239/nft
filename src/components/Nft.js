import React, { useEffect, useState } from "react";
import { Connection, clusterApiUrl, LAMPORTS_PER_SOL } from "@solana/web3.js";
import {
  getParsedNftAccountsByOwner,
  isValidSolanaAddress,
  createConnectionConfig,
} from "@nfteyez/sol-rayz";
import Collectible from "./Collectible";

const Nft = (props) => {
  const [nftData, setNftData] = useState([]);
  const [loading, setLoading] = useState(false);
  const createConnection = () => {
    return new Connection(clusterApiUrl("devnet"));
  };
  const getProvider = async () => {
    if ("solana" in window) {
      // opens wallet to connect to
      await window.solana.connect();

      const provider = window.solana;
      if (provider.isPhantom) {
        console.log("Is Phantom installed?  ", provider.isPhantom);
        return provider;
      }
    } else {
      window.open("https://www.phantom.app/", "_blank");
    }
  };
  const getAllNftData = async () => {
    try {
      if (true) {
        const connect = await createConnection();
        const provider = await getProvider();
        let ownerToken = provider.publicKey;

        console.log(ownerToken);
        const result = isValidSolanaAddress(ownerToken);
        console.log("result", result);
        const nfts = await getParsedNftAccountsByOwner({
          publicAddress: ownerToken,
        });
        return nfts;
      }
    } catch (error) {
      console.log("HAYATATATTAATA");
      console.log(error);
    }
  };
  useEffect(() => {
    async function data() {
      let res = await getAllNftData();
      console.log("RESSSSS", res);
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
