import Axios from "axios";
import type { NextPage } from "next";
import Image from "next/image";
import { css, cx } from "@emotion/css";
import { useCallback, useEffect, useMemo, useState } from "react";
import probe from "probe-image-size";
// @ts-ignore
import reactImageSize from "react-image-size";

const urlOfNoImage = `https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg`;

interface OneCoin {
  availableSupply: number;
  exp: string[];
  icon: string;

  id: string;
  marketCap: number;
  name: string;
  price: number;
  priceBtc: number;
  priceChange1d: number;
  priceChange1h: number;
  priceChange1w: number;
  rank: number;
  symbol: string;
  totalSupply: number;
  twitterUrl: string;
  volume: number;
  websiteUrl: string;
}

interface CoolCoin extends OneCoin {
  iconInfo:
    | null
    | probe.ProbeResult
    | { url: string; width: number; height: number };
}

const getMyProps = async () => {
  // This is NodeJS code, not browser code !!!!!!!!!!!!!!!!
  console.log("vaaaaaaaa");
  const fetched = await Axios.get(
    `https://api.coinstats.app/public/v1/coins?skip=0`
  );

  const theList = fetched.data.coins as OneCoin[];

  const superList: CoolCoin[] = await Promise.all(
    theList.map(async (coin) => {
      try {
        // for brwoser code

        /*
        const wihe: { width: number; height: number } = await reactImageSize(
          coin.icon
        );

        if (wihe) {
          return {
            ...coin,
            iconInfo: {
              url: coin.icon,
              width: wihe.width,
              height: wihe.height,
            },
          };
        } else {
          return {
            ...coin,
            iconInfo: null,
          };
        }
        */

        // for NodeJs code

        const imgInfo: probe.ProbeResult = await probe(coin.icon);

        if (imgInfo) {
          return {
            ...coin,
            iconInfo: imgInfo,
          };
        } else {
          return {
            ...coin,
            iconInfo: null,
          };
        }
      } catch (err) {
        console.log(err);
        return {
          ...coin,
          iconInfo: null,
        };
      }
    })
  );

  return {
    props: {
      coinData: superList,
    },
    revalidate: 10,
  };
};

export const CoinList: NextPage<{
  //
  coinData: CoolCoin[];
}> = ({
  //
  coinData,
}) => {
  // console.log("kkkk:", coinData);

  const classNameForCoolStyles = useMemo(() => {
    return css`
      // font-size: 7px;
      color: blue;
      margin-bottom: 60px;
      @media (max-width: 600px) {
        color: green;
      }
    `;
  }, []);

  // alternative =============== start
  /*
  const [coinData, setCoinData] = useState<CoolCoin[]>([]);

  useEffect(() => {
    getMyProps().then((x) => {
      const myList = x.props.coinData;
      setCoinData((prev) => myList);
    });
  }, []);
  */
  // alternative =============== end

  if (!coinData || coinData.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className={cx("aaa", "bbb", classNameForCoolStyles)}>
      <h1>CoinsDe</h1>
      {coinData.map((coin) => {
        return (
          <div key={coin.id}>
            <Image
              src={coin.iconInfo?.url || urlOfNoImage}
              alt={coin.name}
              width={coin.iconInfo?.width || 100}
              height={coin.iconInfo?.height || 100}
            />

            <picture>
              <source srcSet={coin.iconInfo?.url || urlOfNoImage} />
              <img
                src={coin.iconInfo?.url || urlOfNoImage}
                alt="Landscape picture"
              />
            </picture>

            <span>
              {coin.name} --- ${coin.price}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export const getStaticProps = getMyProps; // This is NodeJS code, not browser code !!!!!!!!!!!!!!!!

export default CoinList;
