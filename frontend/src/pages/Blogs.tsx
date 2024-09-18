import Appbar from "@/components/Appbar";
import BlogCard from "./BlogCard";
import { useBlogs } from "@/hooks";
import Shimmer from "@/utils/Shimmer";

const Blogs = () => {
  const { loading, blogs } = useBlogs();
  if (loading) return <Shimmer />;

  return (
    <div>
      <Appbar />
      <div className="flex flex-col items-center justify-center">
        {blogs?.map((blog) => (
          <BlogCard
            title={blog.title}
            content={blog.content}
            authorName={blog.author.name || "Anonymous"}
            publishedDate="2nd Feb 2024"
            id={blog.id}
            key={blog.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Blogs;
