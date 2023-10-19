"use client";
import { useFaqsQuery } from "@/redux/api/faqApi";
import { Collapse } from "antd";
import React from "react";

const FaqPage: React.FC = () => {
  const { data: faqsData, isLoading } = useFaqsQuery(undefined);

  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  return (
    <Collapse
      accordion
      onChange={onChange}
      defaultActiveKey={faqsData?.map((faq: any) => faq.key)}
    >
      {faqsData?.map((faq: any) => (
        <Collapse.Panel header={faq.label} key={faq.key}>
          <p>{faq.children}</p>
        </Collapse.Panel>
      ))}
    </Collapse>
  );
};

export default FaqPage;
