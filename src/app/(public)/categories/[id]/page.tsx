"use client";
import Loading from "@/app/loading";
import ServiceCard from "@/components/ui/Card";
import { useCategoryQuery } from "@/redux/api/categoryApi";

const CategoryPage = ({ params }: any) => {
  const { id } = params;
  // Fetch services for the given category using categoryId
  const { data: category, isLoading } = useCategoryQuery(id);
  if (isLoading) {
    return <Loading />;
  }
  const services = category?.services;

  return (
    <div className="m-10">
      <h1 className="mb-5 text-center">Services in this Category</h1>
      <div className="grid grid-cols-4 gap-x-5 gap-y-5">
        {services?.map((service: any) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
