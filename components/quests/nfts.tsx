import React, { FunctionComponent } from "react";
import styles from "../../styles/quests.module.css";

type NftsProps = {
  nfts: Nft[];
};

const Nfts: FunctionComponent<NftsProps> = ({ nfts }) => {
  return (
    <div className="flex gap-5 flex-wrap justify-center items-center">
      {nfts.map((nft, index) => (
        <div key={index} className="flex justify-center items-center flex-col">
          <img className={styles.nftStyle} src={nft.imgSrc} />
          {nft.level && nfts.length > 1 ? (
            <p className={styles.level}>Level {nft.level}</p>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default Nfts;
