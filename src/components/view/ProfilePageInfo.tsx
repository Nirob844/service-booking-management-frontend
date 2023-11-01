"use client";
import Loading from "@/app/loading";
import UmBreadCrumb from "@/components/ui/BreadCrumb";
import { useProfileQuery } from "@/redux/api/profileApi";
import { getUserInfo } from "@/services/auth.service";
import { EditOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Link from "next/link";

const ProfilePageInfo = () => {
  const { userId, role } = getUserInfo() as any;
  const { data, isLoading } = useProfileQuery(undefined);
  if (isLoading) {
    return <Loading />;
  }
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
      <div style={{ margin: "0 auto", maxWidth: "500px" }}>
        <div>
          <h1>Well come to profile </h1>
          <img className="w-[150px]" src={data?.image} alt=""></img>
          <h3>Name:{data?.name}</h3>
          <h3>Email:{data?.email}</h3>
        </div>
        <div className="mt-3">
          <Link href={`/profile/edit/${userId}`}>
            <Button
              style={{
                margin: "0px 5px",
              }}
              onClick={() => console.log(userId)}
              type="primary"
            >
              Edit Profile
              <EditOutlined />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfilePageInfo;
