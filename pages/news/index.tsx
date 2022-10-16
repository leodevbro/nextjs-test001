import type { NextPage } from "next";
import Link from "next/link";

// import { NextPage } from "next/types";

// import { NextPage } from "next";

export const News: NextPage = () => {
  return (
    <div>
      <h1>News</h1>

      <ul>
        <li>
          <Link href={"news/aaa"}>
            <a>link 1</a>
          </Link>
        </li>

        <li>
          <Link href={"/news/bbb"}>
            <a>link 2</a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default News;
