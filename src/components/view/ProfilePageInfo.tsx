"use client";
import UmBreadCrumb from "@/components/ui/BreadCrumb";
import { useProfileQuery } from "@/redux/api/profileApi";
import { getUserInfo } from "@/services/auth.service";
import { EditOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Link from "next/link";

const ProfilePageInfo = () => {
  const { userId, role } = getUserInfo() as any;
  const { data, isLoading } = useProfileQuery(undefined);
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
        <div>
          <img className="w-[150px]" src={data?.image} alt=""></img>
          <h1>well come to back to profile </h1>
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
