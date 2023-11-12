"use client";
import Loading from "@/app/loading";
import UmBreadCrumb from "@/components/ui/BreadCrumb";
import Card from "@/components/ui/Card";
import { useCategoriesQuery } from "@/redux/api/categoryApi";
import { useServicesQuery } from "@/redux/api/serviceApi";
import { useDebounced } from "@/redux/hooks";
import {
  CloseCircleOutlined,
  FilterOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
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
  const [minPrice, setMinPrice] = useState<number>();
  const [maxPrice, setMaxPrice] = useState<number>();
  const [visible, setVisible] = useState(false);
  const { Option } = Select;

  query["page"] = page;
  query["limit"] = size;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;
  query["minPrice"] = minPrice;
  query["maxPrice"] = maxPrice;
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

  const handleSortByChange = (value: any) => {
    // setSortBy("price");
    // setSortBy("title");
    setSortBy(value);
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

  const handleMinPriceChange = (value: number) => {
    setMinPrice(value);
  };

  const handleMaxPriceChange = (value: number) => {
    setMaxPrice(value);
  };

  const handleClose = () => {
    setVisible(false); // Close the popover
  };

  const resetFilters = () => {
    setSortBy("");
    setSortOrder("");
    setSearchTerm("");
    setCategoryId(null);
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setPage(1); // Reset the page to 1
    form.setFieldsValue({
      sortBy: "",
      sortOrder: "",
      categoryId: "",
      minPrice: undefined,
      maxPrice: undefined,
    });
  };

  const filterButton = (
    <Popover
      content={
        <div style={{ padding: "16px" }}>
          <Button
            type="default"
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
            }}
            onClick={handleClose}
          >
            <CloseCircleOutlined />
          </Button>
          <p>Select Sort By</p>
          <Select
            style={{ width: "100%", margin: "8px 0" }}
            placeholder="Sort By"
            onChange={handleSortByChange}
            value={sortBy}
          >
            <Option value="title">Title</Option>
            <Option value="price">Price</Option>
          </Select>
          <p>Select Sort Order</p>
          <Select
            style={{ width: "100%", margin: "8px 0" }}
            placeholder="Sort Order"
            onChange={handleSortOrderChange}
            value={sortOrder}
          >
            <Option value="asc">Ascending</Option>
            <Option value="desc">Descending</Option>
          </Select>
          <p>Select Category</p>
          <Select
            style={{ width: "100%", margin: "8px 0" }}
            placeholder="Category"
            onChange={handleCategoryChange}
            value={categoryId}
          >
            {categoryOptions}
          </Select>
          <p>Min Price</p>
          <Input
            type="number"
            style={{ width: "100%", margin: "8px 0" }}
            placeholder="Min Price"
            onChange={(e) => handleMinPriceChange(+e.target.value)}
            value={minPrice}
          />

          <p>Max Price</p>
          <Input
            type="number"
            style={{ width: "100%", margin: "8px 0" }}
            placeholder="Max Price"
            onChange={(e) => handleMaxPriceChange(+e.target.value)}
            value={maxPrice}
          />
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
      visible={visible} // Control the visibility of the popover
      onVisibleChange={(newVisible) => setVisible(newVisible)} // Update the state when the popover visibility changes
    >
      <Button
        type="primary"
        icon={<FilterOutlined />}
        style={{ margin: "0 8px" }}
        size="large"
        onClick={() => setVisible(!visible)} // Toggle the visibility of the popover
      >
        Filter
      </Button>
    </Popover>
  );

  return (
    <div className="m-10">
      <UmBreadCrumb
        items={[
          {
            label: "Home",
            link: "/",
          },
        ]}
      />
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
