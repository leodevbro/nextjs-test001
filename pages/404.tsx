import type { NextPage } from "next";
import Link from "next/link";

export const PageNotFound: NextPage = () => {
  return (
    <div>
      <p>This is super-duper cool 404 page</p>
      <div>
        <Link href={"/profile"}>
          <a>Profile</a>
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;