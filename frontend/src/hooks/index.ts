import { BACKEND_URL, GET_ALL_BLOGS } from "@/common/config";
import axios from "axios";
import { useEffect, useState } from "react";

interface BlogType {
  content: string;
  title: string;
  id: string;
  author: {
    name: string;
  };
}
export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<BlogType[]>([]);

  useEffect(() => {
    (async () => {
      const res = await axios.get(`${BACKEND_URL}${GET_ALL_BLOGS}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setBlogs(res.data.blogs);
      setLoading(false);
    })(); //IIFE
  }, []);

  return {
    loading,
    blogs,
  };
};
