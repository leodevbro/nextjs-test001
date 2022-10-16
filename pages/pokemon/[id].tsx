import Axios from "axios";
import type {
  GetServerSideProps,
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from "next";
import { useRouter } from "next/router";
import { IPok, baseUrlOfPokAPI, getPoks } from "pages";
import { useEffect, useState } from "react";

// enum fEnum {
//   pathSection = "id",
// }

const qProp = "id";

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

// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
export const getStaticProps: GetStaticProps = async ({ params }) => {
  let pok: null | IPokDetails = null;
  if (params && typeof params[qProp] === "string") {
    pok = await getOnePok(Number(params[qProp]));
  }

  console.log("staaart iddd");
  await new Promise((res, rej) => {
    setTimeout(() => {
      res(true);
    }, 5000);
  });
  console.log("eeeend iddd");

  return {
    props: {
      pok,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const myPoks = await getPoks();

  const myPaths = myPoks.map((item) => {
    return {
      params: {
        [qProp]: item.id.toString(),
      },
    };
  });

  console.log("myPaths:", myPaths);

  return {
    paths: [],
    fallback: false,
  };
};

export const PokProfile: NextPage<{ pok: IPokDetails | null }> = ({ pok }) => {
  const router = useRouter();

  const rQuery = router.query;

  const { [qProp]: id } = rQuery as { [qProp]: string | undefined };

  /*
  const [pok, setPok] = useState<IPokDetails | null>(null);

  useEffect(() => {
    if (!id) {
      return;
    }

    getOnePok(Number(id)).then((fetchedPok) => {
      setPok(() => fetchedPok);
    });
  }, [id]);
  */

  if (!pok) {
    return <div>{`Loading...777`}</div>;
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

// export const getStaticProps = () => {
//   return {
//     props: {
//       coinData: [],
//     },
//     revalidate: 10,
//   };
// }

export default PokProfile;
