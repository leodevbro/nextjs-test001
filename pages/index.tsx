import Axios from "axios";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

import sty from "../styles/Home.module.scss";

export const baseUrlOfPokAPI = `https://jherr-pokemon.s3.us-west-1.amazonaws.com/`;

export interface IPok {
  id: number;
  image: string;
  name: string;
}

const getPoks = async () => {
  const fetched = await Axios.get(`${baseUrlOfPokAPI}index.json`);

  const pokArr = fetched.data as IPok[];

  return pokArr;
};

const Home: NextPage = () => {
  const [pokemons, setPokemons] = useState<IPok[]>([]);

  useEffect(() => {
    getPoks().then((fetchedArr) => {
      setPokemons(() => fetchedArr);
    });
  }, []);

  return (
    <div className={sty.container}>
      <Head>
        <title>Leo2</title>
      </Head>
      <Link href={"/about"}>about</Link>
      <h1 className={sty.hello}>Hello</h1>

      <div className={sty.bigGrid}>
        {pokemons.map((pok, pokIndex) => {
          return (
            <div key={pok.id}>
              <div>{pokIndex + 1}</div>
              <Link href={`/pokemon/${pok.id}`}>
                <a target="_blank" rel="noopener noreferrer">
                  <picture>
                    <img
                      className={sty.pokIcon}
                      alt={"pok icon"}
                      src={`${baseUrlOfPokAPI}${pok.image}`}
                    />
                  </picture>
                </a>
              </Link>

              <h3>{pok.name}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
