"use client";
import Loading from "@/app/loading";
import { useFaqsQuery } from "@/redux/api/faqApi";
import { Collapse } from "antd";
import React from "react";

const FaqPage: React.FC = () => {
  const { data: faqsData, isLoading } = useFaqsQuery(undefined);

  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  if (isLoading) {
    return <Loading />;
  }

  console.log(faqsData);
  if (faqsData.length === 0) {
    return <p>No FAQ data available.</p>;
  }

  return (
    <div
      className="mx-auto my-10"
      style={{
        width: "80%",
      }}
    >
      <Collapse
        accordion
        onChange={onChange}
        defaultActiveKey={faqsData?.map((faq: any) => faq.id)}
      >
        {faqsData?.map((faq: any) => (
          <Collapse.Panel header={faq.question} key={faq.id}>
            <p>{faq.answer}</p>
          </Collapse.Panel>
        ))}
      </Collapse>
    </div>
  );
};

export default FaqPage;
