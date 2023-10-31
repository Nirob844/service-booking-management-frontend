"use client";
import Loading from "@/app/loading";
import Card from "@/components/ui/Card";
import { useServicesQuery } from "@/redux/api/serviceApi";

const LatestServicePage = () => {
  const { data, isLoading } = useServicesQuery({
    limit: 4,
    sortOrder: "desc",
    status: "inProgress",
  });
  const services = data?.services;

  return (
    <div className="m-10">
      <h1 className="mt-5 mb-5 text-center">Latest Service</h1>
      <div>
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
      </div>
    </div>
  );
};

export default LatestServicePage;
