import type { NextPage } from "next";
import { useRouter } from "next/router";

export const Profile: NextPage = () => {
  const router = useRouter();

  const { username } = router.query;

  return (
    <div>
      <h1>Profile {username}</h1>
    </div>
  );
};

export default Profile;
