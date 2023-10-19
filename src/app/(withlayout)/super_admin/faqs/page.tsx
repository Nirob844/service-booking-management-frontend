"use client";
import UMBreadCrumb from "@/components/ui/BreadCrumb";
import UMTable from "@/components/ui/Table";
import UMModal from "@/components/ui/UMModal";
import { useDeleteCategoryMutation } from "@/redux/api/categoryApi";
import { useFaqsQuery } from "@/redux/api/faqApi";
import { useDebounced } from "@/redux/hooks";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import dayjs from "dayjs";
import Link from "next/link";
import { useState } from "react";
const CategoriesPage = () => {
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>("");

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }
  const { data, isLoading } = useFaqsQuery({
    ...query,
  });
  console.log(data);

  const [deleteCategory] = useDeleteCategoryMutation();
  const deleteHandler = async (id: string) => {
    message.loading("Deleting.....");
    try {
      const res = await deleteCategory(id);
      if (!!res) {
        message.success(" delete successfully");
        setOpen(false);
      }
    } catch (err: any) {
      //   console.error(err.message);
      message.error(err.message);
    }
  };

  const columns = [
    {
      title: "Question",
      dataIndex: "question",
    },
    {
      title: "Answer",
      dataIndex: "answer",
    },
    {
      title: "Created at",
      dataIndex: "createdAt",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
      sorter: true,
    },
    {
      title: "Action",
      dataIndex: "id",
      render: function (data: any) {
        return (
          <>
            <Link href={`/super_admin/faqs/edit/${data}`}>
              <Button
                style={{
                  margin: "0px 5px",
                }}
                onClick={() => console.log(data)}
                type="primary"
              >
                <EditOutlined />
              </Button>
            </Link>
            <Button
              type="primary"
              onClick={() => {
                setOpen(true);
                setUserId(data);
              }}
              danger
              style={{ marginLeft: "3px" }}
            >
              <DeleteOutlined />
            </Button>
          </>
        );
      },
    },
  ];

  const onPaginationChange = (page: number, pageSize: number) => {
    console.log("Page:", page, "PageSize:", pageSize);
    setPage(page);
    setSize(pageSize);
  };
  const onTableChange = (pagination: any, filter: any, sorter: any) => {
    const { order, field } = sorter;
    // console.log(order, field);
    setSortBy(field as string);
    setSortOrder(order === "ascend" ? "asc" : "desc");
  };

  const resetFilters = () => {
    setSortBy("");
    setSortOrder("");
    setSearchTerm("");
  };

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

      <UMTable loading={isLoading} columns={columns} dataSource={data} />
      <UMModal
        title="Remove category"
        isOpen={open}
        closeModal={() => setOpen(false)}
        handleOk={() => deleteHandler(userId)}
      >
        <p className="my-5">Do you want to remove this faq?</p>
      </UMModal>
    </div>
  );
};

export default CategoriesPage;
