import type { NextPage } from "next";
import { useRouter } from "next/router";

const qProp = "username";


export const Profile: NextPage = () => {
  const router = useRouter();

  const { [qProp]: usern } = router.query;

  console.log(usern);

  // console.log("username:", username, router);

  return (
    <div>
      <h1>Profile {usern}</h1>
    </div>
  );
};

export default Profile;
