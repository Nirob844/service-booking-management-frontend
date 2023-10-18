"use client";
import Loading from "@/app/loading";
import Card from "@/components/ui/Card";
import { useCategoriesQuery } from "@/redux/api/categoryApi";
import { useServicesQuery } from "@/redux/api/serviceApi";
import { ReloadOutlined } from "@ant-design/icons";
import { Button, Input, Pagination, Select } from "antd";
import { useState } from "react";

const ServicesPage = () => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const { Option } = Select;

  const handleSearch = (value: any) => {
    setSearchTerm(value);
    setPage(1); // Reset page when searching
  };

  const handleSortByChange = (value: string) => {
    setSortBy(value);
  };

  const handleSortOrderChange = (value: string) => {
    setSortOrder(value);
  };

  const handleCategoryChange = (categoryId: string) => {
    // Handle category change
  };

  const handlePaginationChange = (current: number) => {
    setPage(current);
  };

  const resetFilters = () => {
    setSortBy("");
    setSortOrder("");
    setSearchTerm("");
  };

  const { data, isLoading } = useServicesQuery({
    limit: size,
    page,
    sortBy,
    sortOrder,
    searchTerm,
  });
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

  return (
    <div className="m-10">
      <h1 className="mb-2 text-center">All services</h1>
      <div className="flex items-center mb-4">
        <Input.Search
          size="large"
          placeholder="Search"
          onChange={(e) => handleSearch(e.target.value)}
        />
        <Select
          style={{ width: 200, marginLeft: 16 }}
          placeholder="Sort By"
          onChange={handleSortByChange}
        >
          <Option value="title">Title</Option>
        </Select>

        <Select
          style={{ width: 120, marginLeft: 16 }}
          placeholder="Sort Order"
          onChange={handleSortOrderChange}
        >
          <Option value="asc">Ascending</Option>
          <Option value="desc">Descending</Option>
        </Select>

        <Select
          style={{ width: 200, marginLeft: 16 }}
          placeholder="Category"
          onChange={handleCategoryChange}
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

      <div>
        {isLoading ? (
          <div>
            <Loading />
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-x-10 gap-y-10">
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
