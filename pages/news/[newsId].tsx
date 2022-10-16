import type { NextPage } from "next";
import { useRouter } from "next/router";

const qProp = "newsId"


export const DetailPage: NextPage = () => {
  const router = useRouter();

  const postId = router.query[qProp];

  console.log(postId);

  return (
    <div>
      <h1>details</h1>
    </div>
  );
};

export default DetailPage;
