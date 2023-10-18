"use client";
import Loading from "@/app/loading";
import Card from "@/components/ui/Card";
import SBPagination from "@/components/ui/Pagination";
import { useCategoriesQuery } from "@/redux/api/categoryApi";
import { useServicesQuery } from "@/redux/api/serviceApi";
import { Button, Col, Input, Row } from "antd";
import { useState } from "react";

const ServicesPage = () => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");

  const handleSearch = (value: any) => {
    setSearchTerm(value);
    setPage(1); // Reset page when searching
  };

  const handlePaginationChange = (current: any) => {
    setPage(current);
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
    <>
      <Row>
        <Col span={20} push={4}>
          <div className="m-10">
            <div className="flex items-center mb-4">
              <Input.Search
                size="large"
                placeholder="Search"
                onChange={(e) => handleSearch(e.target.value)}
              />
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
              <SBPagination
                page={page}
                total={meta?.total}
                onChange={handlePaginationChange}
              />
            </div>
          </div>
        </Col>
        <Col span={4} pull={20}>
          <div className="m-10">
            <h1 className="mb-2">All Categories</h1>
            {categoryOptions} {/* Render the categoryOptions here */}
          </div>
        </Col>
      </Row>
    </>
  );
};

export default ServicesPage;
