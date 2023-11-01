"use client";
import ActionBar from "@/components/ui/ActionBar";
import UMBreadCrumb from "@/components/ui/BreadCrumb";
import UMTable from "@/components/ui/Table";
import {
  useBookingsQuery,
  useUpdateBookingMutation,
} from "@/redux/api/bookingApi";
import { useDebounced } from "@/redux/hooks";
import { Button, Input, message } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
const CategoriesPage = () => {
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

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
  const { data, isLoading } = useBookingsQuery({
    ...query,
    include: {
      user: true,
      bookingServices: {
        include: {
          service: true,
        },
      },
    },
  });

  const bookings = data?.bookings;
  const meta = data?.meta;
  const [updateBooking] = useUpdateBookingMutation();
  const EditHandler = async (id: string) => {
    message.loading("Cancelling booking...");
    try {
      const updatedBooking = {
        status: "Cancelled",
      };

      const res = await updateBooking({ id, body: updatedBooking });

      if (res) {
        message.success("Booking cancelled successfully");
      }
    } catch (err: any) {
      message.error(err.message);
    }
  };

  const columns = [
    {
      title: "User Name",
      dataIndex: ["user", "name"],
    },
    {
      title: "Service Image",
      dataIndex: ["bookingServices", 0, "service", "image"],
      render: (image: string) => (
        <img src={image} alt="Service" style={{ width: "50px" }} />
      ),
    },
    {
      title: "Service Title",
      dataIndex: ["bookingServices", 0, "service", "title"],
    },
    {
      title: "Status",
      dataIndex: "status",
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
      render: function (id: any) {
        return (
          <>
            <Button
              type="primary"
              onClick={() => EditHandler(id)}
              danger
              style={{ marginLeft: "3px" }}
            >
              cancel booking
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

  return (
    <div>
      <UMBreadCrumb
        items={[
          {
            label: "customer",
            link: "/customer",
          },
        ]}
      />

      <ActionBar title="Booking  list">
        <Input
          size="large"
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "20%",
          }}
        />
      </ActionBar>
      <UMTable
        loading={isLoading}
        columns={columns}
        dataSource={bookings}
        pageSize={size}
        totalPages={meta?.total}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
      />
    </div>
  );
};

export default CategoriesPage;
