"use client";
import BlogCard from "@/components/ui/BlogCard";
import { useContentsQuery } from "@/redux/api/contentApi";
// Update the import path

const BlogPage = () => {
  const { data: blogData, isLoading } = useContentsQuery(undefined);

  return (
    // <div
    //   style={{
    //     marginTop: "30px",
    //     padding: "20px",
    //     justifyContent: "center",
    //     marginLeft: "50px",
    //   }}
    // >
    //   <h1>Blog Page</h1>
    //   {isLoading && <p>Loading...</p>}
    //   {blogData &&
    //     blogData.map((blog: any) => (
    //       <div key={blog.id}>
    //         <div className="flex">
    //           <div className="w-1/2">
    //             <h2>{blog.title}</h2>
    //             <p>{blog.body}</p>
    //           </div>
    //           <div>
    //             {blog.image && (
    //               <img
    //                 style={{
    //                   width: "200px",
    //                 }}
    //                 src={blog.image}
    //                 alt="Blog Image"
    //               />
    //             )}
    //           </div>
    //         </div>
    //       </div>
    //     ))}
    // </div>
    <BlogCard />
  );
};

export default BlogPage;
