"use client";
import ActionBar from "@/components/ui/ActionBar";
import BookingModal from "@/components/ui/BookingModal";
import UMBreadCrumb from "@/components/ui/BreadCrumb";
import UMTable from "@/components/ui/Table";
import UMModal from "@/components/ui/UMModal";
import {
  useAddCartsQuery,
  useDeleteCartMutation,
} from "@/redux/api/addCartApi";
import { useAddBookingMutation } from "@/redux/api/bookingApi";
import { useDebounced } from "@/redux/hooks";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Input, message } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
const AddCartPage = () => {
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [bookingDate, setBookingDate] = useState(null);
  const [isBookingSuccessful, setIsBookingSuccessful] = useState(false);

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
  const { data, isLoading } = useAddCartsQuery({
    ...query,
    include: {
      user: true,
      service: true,
    },
  });

  const carts = data?.carts;
  const meta = data?.meta;

  const [addBooking] = useAddBookingMutation();
  const handleBooking = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      if (!bookingDate) {
        message.error("Please select a booking date.");
        return; // Return early if no booking date is selected
      }

      const selectedCart = carts?.find((cart: any) => cart.id);
      const bookingData = {
        bookingServices:
          bookingDate && selectedCart
            ? [
                {
                  serviceId: selectedCart.service.id, // Access the service ID
                  bookingDate: bookingDate,
                },
              ]
            : [],
      };
      const res = await addBooking(bookingData).unwrap();
      if (res.id) {
        message.success("Service booked successfully.");
        const del = await deleteCart(selectedCart.id);
        if (!!del) {
          message.info("go booking list");
        }
        setIsBookingSuccessful(true);
        setIsModalVisible(false);
      }
    } catch (err: any) {
      message.error(err.message);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDateChange = (date: any) => {
    setBookingDate(date); // No need for toDate() here
  };

  const [deleteCart] = useDeleteCartMutation();
  const deleteHandler = async (id: string) => {
    message.loading("Deleting.....");
    try {
      const res = await deleteCart(id);
      if (!!res) {
        message.success("cart delete successfully");
        setOpen(false);
      }
    } catch (err: any) {
      //   console.error(err.message);
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
      dataIndex: ["service", "image"],
      render: (image: string) => (
        <img src={image} alt="Service" style={{ width: "50px" }} />
      ),
    },
    {
      title: "Service Title",
      dataIndex: ["service", "title"],
    },
    {
      title: "Price",
      dataIndex: ["service", "price"],
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
            <Button type="primary" onClick={handleBooking}>
              Booking
            </Button>
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
            label: "customer",
            link: "/customer",
          },
        ]}
      />

      <ActionBar title="cart  list">
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
        dataSource={carts}
        pageSize={size}
        totalPages={meta?.total}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
      />
      <UMModal
        title="Remove cart"
        isOpen={open}
        closeModal={() => setOpen(false)}
        handleOk={() => deleteHandler(userId)}
      >
        <p className="my-5">Do you want to remove this cart?</p>
      </UMModal>
      <BookingModal
        title="Booking Model"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        setBookingDate={handleDateChange}
      />
    </div>
  );
};

export default AddCartPage;
