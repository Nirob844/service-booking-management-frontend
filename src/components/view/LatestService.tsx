"use client";
import Loading from "@/app/loading";
import Card from "@/components/ui/Card";
import { useServicesQuery } from "@/redux/api/serviceApi";

const LatestServicePage = () => {
  const { data, isLoading } = useServicesQuery({
    limit: 3,
    sortOrder: "desc",
  });
  const services = data?.services;

  return (
    <div className="m-10">
      <div className="">
        <h1 className="mt-5 mb-2 text-center">Latest Service</h1>
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
        </div>
      </div>
    </div>
  );
};

export default LatestServicePage;
