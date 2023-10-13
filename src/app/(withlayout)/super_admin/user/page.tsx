import ActionBar from "@/components/ui/ActionBar";
import UMBreadCrumb from "@/components/ui/BreadCrumb";
import { Button } from "antd";
import Link from "next/link";
const ManageUserPage = () => {
  return (
    <div>
      <UMBreadCrumb
        items={[
          {
            label: "super_admin",
            link: "/super_admin",
          },
        ]}
      />

      <ActionBar title="User Lis">
        <Link href="/super_admin/user/create">
          <Button type="primary">Create User</Button>
        </Link>
      </ActionBar>
    </div>
  );
};

export default ManageUserPage;
