"use client";
import UmBreadCrumb from "@/components/ui/BreadCrumb";
import { useProfileQuery } from "@/redux/api/profileApi";
import { getUserInfo } from "@/services/auth.service";

const ProfilePage = () => {
  const { userId } = getUserInfo() as any;
  const { data, isLoading } = useProfileQuery(undefined);
  //const { data, isLoading } = useUserQuery(userId);
  console.log(data);
  return (
    <div>
      <UmBreadCrumb
        items={[
          {
            label: "Home",
            link: "/",
          },
        ]}
      />
      <div>
        <img className="w-[150px]" src={data?.image} alt=""></img>
        <h1>well come to back to profile </h1>
        <h3>Name:{data?.name}</h3>
        <h3>Email:{data?.email}</h3>
      </div>
    </div>
  );
};

export default ProfilePage;
