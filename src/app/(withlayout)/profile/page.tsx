"use client";
import { useUserQuery } from "@/redux/api/userApi";
import { getUserInfo } from "@/services/auth.service";

const ProfilePage = () => {
  const { userId } = getUserInfo() as any;

  const { data, isLoading } = useUserQuery(userId);
  console.log(data);
  return (
    <div>
      <img className="w-[300px]" src={data?.image} alt=""></img>
      <h1>well come to back to profile </h1>
      <p>{data?.name}</p>
      <p>{data?.email}</p>
    </div>
  );
};

export default ProfilePage;
