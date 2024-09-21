import { BACKEND_URL, GET_ALL_BLOGS, GET_BLOG_BY_ID } from "@/common/config";
import axios from "axios";
import { useEffect, useState } from "react";

export interface BlogType {
  content: string;
  title: string;
  id: string;
  thumbnail: string;
  createdAt:string;
  author: {
    name: string;
  };
}

export const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<BlogType>();

  useEffect(() => {
    (async () => {
      const res = await axios.get(`${BACKEND_URL}${GET_BLOG_BY_ID}/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setBlog(res.data.blog);
      setLoading(false);
    })(); //IIFE
  }, [id]);

  return {
    loading,
    blog,
  };
};

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
      setBlogs(res.data.blogs.reverse());
      setLoading(false);
    })(); //IIFE
  }, []);

  return {
    loading,
    blogs,
  };
};
