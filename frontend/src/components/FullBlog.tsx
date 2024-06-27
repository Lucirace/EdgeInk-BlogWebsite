import { Appbar } from "./Appbar";
import { Blog } from "../hooks";
import { Avatar } from "./BlogCard";

import DOMPurify from "dompurify";

export const FullBlog = ({ blog }: { blog: Blog }) => {
  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div className="grid grid-cols-12 px-10 w-full  pt-200 max-w-screen-xl">
          <div className=" col-span-8 pt-4">
            <div className="text-5xl font-extrabold">{blog.title}</div>
            <div className="text-slate-500 pt-2">Posted on 10/05/2024</div>

            <div
              className="text-xl pt-4"
              //@ts-ignore
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(blog.content),
              }}
            ></div>
          </div>

          <div className=" pt-4 col-span-4">
            <div className="text-lg pb-2 font-semibold"> Author</div>
            <div className="flex w-full">
              <div className="pr-2 flex flex-col justify-center">
                <Avatar name={blog.author.email} />
              </div>
              <div>
                <div className="text-xl font-bold">{blog.author.email}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
