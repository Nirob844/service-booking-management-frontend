"use client";
import Loading from "@/app/loading";
import ProfilePageInfo from "@/components/view/ProfilePageInfo";
import { useProfileQuery } from "@/redux/api/profileApi";

const AllProfilePage = () => {
  const { data, isLoading } = useProfileQuery(undefined);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <ProfilePageInfo data={data}></ProfilePageInfo>
    </div>
  );
};

export default AllProfilePage;
