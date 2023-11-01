"use client";
import Loading from "@/app/loading";
import { useCategoriesQuery } from "@/redux/api/categoryApi";
import { Card } from "antd";
import Link from "next/link";

const CategoryCard = () => {
  const { data, isLoading } = useCategoriesQuery({});
  if (isLoading) {
    return <Loading />;
  }
  const categories = data?.categories;

  return (
    <div className="m-10">
      <h1 className="mb-10 text-center">Category</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-x-2 gap-y-2">
        {categories?.map((category) => (
          <Link key={category.id} href={`/categories/${category.id}`}>
            <Card
              hoverable
              className="sm:w-[100px] md:w-[200px]"
              cover={
                <img
                  style={{ width: "100%", height: "150px" }}
                  alt={category.title}
                  src={category.image}
                />
              }
            >
              <Card.Meta title={category.title} />
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryCard;
