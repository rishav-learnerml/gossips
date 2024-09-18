import BlogContent from "@/components/BlogContent";
import { useBlog } from "@/hooks";
import Shimmer from "@/utils/Shimmer";
import { useParams } from "react-router-dom";

const Blog = () => {
  const { id } = useParams();
  const { blog } = useBlog({
    id: id || "",
  });
  if (!blog) return <Shimmer />;
  return (
    <div>
      <BlogContent blog={blog} />
    </div>
  );
};

export default Blog;
