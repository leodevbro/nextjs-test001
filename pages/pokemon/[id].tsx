import Axios from "axios";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { IPok, baseUrlOfPokAPI } from "pages";
import { useEffect, useState } from "react";

interface IPokDetails {
  image: string;
  name: string;
  stats: {
    name: string;
    value: number;
  }[];
  type: string[];
}

const getOnePok = async (pokId: number) => {
  const fetched = await Axios.get(`${baseUrlOfPokAPI}pokemon/${pokId}.json`);

  const thePok = fetched.data as IPokDetails;

  return thePok;
};

export const PokProfile: NextPage = () => {
  const router = useRouter();

  const rQuery = router.query;

  const { id } = rQuery as { id: string | undefined };

  const [pok, setPok] = useState<IPokDetails | null>(null);

  useEffect(() => {
    if (!id) {
      return;
    }

    getOnePok(Number(id)).then((fetchedPok) => {
      setPok(() => fetchedPok);
    });
  }, [id]);

  if (!pok) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>PokId: {id}</h1>
      <div>PokName: {pok.name}</div>
      <div>PokType: {pok.type.join(", ")}</div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {pok.stats.map(({ name, value }, statIndex) => (
            <tr key={name}>
              <td>{name}</td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <picture>
        <img alt={"pok icon"} src={`${baseUrlOfPokAPI}${pok.image}`} />
      </picture>
    </div>
  );
};

export default PokProfile;
