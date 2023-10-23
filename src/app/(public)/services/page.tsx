"use client";
import Loading from "@/app/loading";
import Card from "@/components/ui/Card";
import { useCategoriesQuery } from "@/redux/api/categoryApi";
import { useServicesQuery } from "@/redux/api/serviceApi";
import { useDebounced } from "@/redux/hooks";
import { ReloadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Pagination, Select } from "antd";
import { useState } from "react";

const ServicesPage = () => {
  const query: Record<string, any> = {};
  const [form] = Form.useForm();

  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryId, setCategoryId] = useState<any>({});
  const { Option } = Select;

  query["page"] = page;
  query["limit"] = size;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;
  query["searchTerm"] = searchTerm;
  query["categoryId"] = categoryId;

  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedTerm) {
    query["searchTerm"] = debouncedTerm;
  }

  const { data, isLoading } = useServicesQuery({
    ...query,
  });
  if (isLoading) {
    <Loading />;
  }

  const services = data?.services;
  const meta = data?.meta;

  const { data: categoriesData } = useCategoriesQuery({
    limit: 100,
    page: 1,
  });

  const categories = categoriesData?.categories;

  const categoryOptions = categories?.map((category) => (
    <Button key={category?.id} size="large">
      {category?.title}
    </Button>
  ));

  const handleSearch = (value: any) => {
    setSearchTerm(value);
  };

  const handleSortByChange = (value: string) => {
    setSortBy("price");
    setSortOrder(value === "ascend" ? "asc" : "desc");
  };

  const handleSortOrderChange = (value: string) => {
    setSortOrder(value);
  };

  const handleCategoryChange = (categoryId: string) => {
    setCategoryId(categoryId);
  };

  const handlePaginationChange = (current: number) => {
    setPage(current);
  };

  const resetFilters = () => {
    setSortBy("");
    setSortOrder("");
    setSearchTerm("");
    setCategoryId(null); // Set categoryId to null
    setPage(1); // Reset the page to 1
    form.setFieldsValue({
      sortBy: "", // Clear the selected value for Sort By
      sortOrder: "", // Clear the selected value for Sort Order
      categoryId: "", // Clear the selected value for Category
    });
  };

  return (
    <div className="m-10">
      <h1 className="mb-2 text-center">All services</h1>
      <div className="flex items-center mb-4">
        <p>Search....</p>
        <Input.Search
          style={{
            width: "40%",
          }}
          size="large"
          placeholder="Search"
          onChange={(e) => handleSearch(e.target.value)}
        />
        <p className="ml-3">Sort By</p>
        <Select
          placeholder="Sort By"
          style={{ width: 120, marginLeft: 16 }}
          onChange={handleSortByChange}
          value={sortBy}
        >
          <Option value="title">Title</Option>
          <Option value="price">Price</Option>
        </Select>
        <p className="ml-3">Sort Order</p>
        <Select
          placeholder="Sort Order"
          style={{ width: 120, marginLeft: 16 }}
          onChange={handleSortOrderChange}
          value={sortOrder}
        >
          <Option value="asc">Ascending</Option>
          <Option value="desc">Descending</Option>
        </Select>
        <p className="ml-3">Category</p>
        <Select
          style={{ width: 200, marginLeft: 16 }}
          placeholder="Category"
          onChange={handleCategoryChange}
          value={categoryId}
        >
          {categoryOptions}
        </Select>
        {(!!sortBy || !!sortOrder || !!searchTerm) && (
          <Button
            style={{ margin: "0px 5px" }}
            type="primary"
            onClick={resetFilters}
          >
            <ReloadOutlined />
          </Button>
        )}
      </div>
      <hr />
      <div className="my-5">
        {isLoading ? (
          <div>
            <Loading />
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-x-5 gap-y-5">
            {services?.map((service) => {
              return <Card key={service.id} service={service} />;
            })}
          </div>
        )}
        <div className="flex justify-center mt-4">
          <Pagination
            current={page}
            total={meta?.total || 0}
            pageSize={size}
            onChange={handlePaginationChange}
            showSizeChanger={true}
            onShowSizeChange={(current, size) => {
              setSize(size);
              setPage(1);
            }}
            showTotal={(total, range) =>
              `${range[0]}-${range[1]} of ${total} items`
            }
          />
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
