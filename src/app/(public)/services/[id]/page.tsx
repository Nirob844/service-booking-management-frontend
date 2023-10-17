"use client";
import { useServiceQuery } from "@/redux/api/serviceApi";

const ServicePage = ({ params }: any) => {
  const { id } = params;
  const { data, isLoading } = useServiceQuery(id);

  return (
    <div>
      <div className="w-[500px] h-[400px]">
        <img src={data?.image} alt="" />
      </div>
    </div>
  );
};

export default ServicePage;
