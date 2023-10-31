"use client";
import Loading from "@/app/loading";
import Card from "@/components/ui/Card";
import { useCategoriesQuery } from "@/redux/api/categoryApi";
import { useServicesQuery } from "@/redux/api/serviceApi";
import { useDebounced } from "@/redux/hooks";
import { FilterOutlined, ReloadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Pagination, Popover, Select } from "antd";
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
    setSortBy("title");
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

  const filterButton = (
    <Popover
      content={
        <div style={{ padding: "16px" }}>
          <Select
            style={{ width: "100%", margin: "8px 0" }}
            placeholder="Sort By"
            onChange={handleSortByChange}
            value={sortBy}
          >
            <Option value="title">Title</Option>
            <Option value="price">Price</Option>
          </Select>
          <Select
            style={{ width: "100%", margin: "8px 0" }}
            placeholder="Sort Order"
            onChange={handleSortOrderChange}
            value={sortOrder}
          >
            <Option value="asc">Ascending</Option>
            <Option value="desc">Descending</Option>
          </Select>
          <Select
            style={{ width: "100%", margin: "8px 0" }}
            placeholder="Category"
            onChange={handleCategoryChange}
            value={categoryId}
          >
            {categoryOptions}
          </Select>
          <Button
            type="primary"
            style={{ width: "100%", margin: "8px 0" }}
            onClick={resetFilters}
          >
            <ReloadOutlined /> Reset Filters
          </Button>
        </div>
      }
      title="Filter Options"
      trigger="click"
    >
      <Button
        type="primary"
        icon={<FilterOutlined />}
        style={{ margin: "0 8px" }}
        size="large"
      >
        Filter
      </Button>
    </Popover>
  );

  return (
    <div className="m-10">
      <h1 className="mb-2 text-center">All services</h1>
      <div className="flex flex-wrap items-center m-5">
        <Input.Search
          className="w-full sm:w-1/2 md:w-3/4 lg:w-5/6 mb-3 sm:mb-0"
          size="large"
          placeholder="Searching..........."
          onChange={(e) => handleSearch(e.target.value)}
        />
        {filterButton}
      </div>
      <hr />
      <div className="my-5">
        {isLoading ? (
          <div>
            <Loading />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-5">
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
