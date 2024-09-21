import { BlogType } from "@/hooks";
import Appbar from "./Appbar";
import { AvatarPic } from "@/pages/BlogCard";

const BlogContent = ({ blog }: { blog: BlogType }) => {
  return (
    <div>
      <Appbar />
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-12 px-10 w-full pt-12 max-w-screen-xl">
          <div className="col-span-8">
            <div className="text-5xl font-extrabold">{blog.title}</div>
            <div className="text-slate-500 pt-2">
              Posted On{" "}
              {new Date(blog.createdAt)
                .toLocaleString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })
                .replace(",", " at")}
            </div>
            <div className="pt-4">{blog.content}</div>
            <img className="mt-8 w-11/12 h-2/6 object-cover" src={blog.thumbnail} />
          </div>
          <div className="col-span-4 ">
            <div className="text-slate-600 text-lg pl-2">Author</div>
            <div className="flex w-full">
              <div className="pr-4 flex flex-col justify-center">
                <AvatarPic name={blog.author.name || "Anonymous"} />
              </div>
              <div>
                <div className="text-xl font-bold">
                  {blog.author.name || "Anonymous"}
                </div>
                <div className="pt-2 text-slate-500">Gossip King 👽</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogContent;
