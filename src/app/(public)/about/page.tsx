import { Button } from "antd";
import Image from "next/image";
import parts from "../../../assets/images/about_us/parts.jpg";
import person from "../../../assets/images/about_us/person.jpg";

const About = () => {
  return (
    <div className="mx-5 lg:mx-10 mt-10 mb-32">
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 relative">
          <Image
            src={person}
            alt=""
            className="w-full h-auto lg:w-4/5 lg:h-full rounded-lg shadow-2xl"
          />
          <Image
            src={parts}
            alt=""
            className="hidden lg:block absolute right-5 top-1/2 w-3/5 h-[280px] border-8 rounded-lg shadow-2xl"
          />
        </div>
        <div className="w-full lg:w-1/2">
          <p className="text-2xl font-bold text-blue-400">About Us</p>
          <h1 className="my-5 text-3xl lg:text-5xl font-bold">
            We are qualified <br />
            & have years of experience <br />
            in this field
          </h1>
          <p className="py-4 lg:py-6">
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humor, or randomised words which dont look even slightly believable.
          </p>
          <p className="py-4 lg:py-6">
            The majority have suffered alteration in some form, by injected
            humor, or randomised words which dont look even slightly believable.
          </p>
          <Button type="primary">Get More Info</Button>
        </div>
      </div>
    </div>
  );
};

export default About;
