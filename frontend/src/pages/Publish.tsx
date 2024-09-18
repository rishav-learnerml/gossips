import { BACKEND_URL, CREATE_BLOG } from "@/common/config";
import Appbar from "@/components/Appbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { createPostType } from "@rishav_dev/gossips-types";
import axios from "axios";
import { FormEvent } from "react";
import { Link } from "react-router-dom";

const Publish = () => {
  const publishBlog = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget); // Create FormData from the form
    const blogTitle = formData.get("title") as string; // Retrieve title
    const blogDesc = formData.get("detail") as string; // Retrieve detail

    // Add logic for publishing the blog here (e.g., API call)
    console.log("Title:", blogTitle);
    console.log("Description:", blogDesc);

    if (!blogTitle || !blogDesc) {
      return;
    }

    const body: createPostType = {
      title: blogTitle,
      content: blogDesc,
      thumbnail: "",
      authorId: "",
    };

    try {
      const res = await axios.post(`${BACKEND_URL}${CREATE_BLOG}`, body, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("result: ", res);
      toast({
        variant: "default",
        title: "Succesfully Created Gossip!",
        description: "View Gossip to check!",
        action: (
          <ToastAction altText="View Gossips">
            <Link to={"/blogs/" + res.data.id}>View Gossip</Link>
          </ToastAction>
        ),
      });
    } catch (error) {
      console.error("Error: ", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem while sending your request.",
      });
    }
  };
  return (
    <div>
      <Appbar />
      <form
        className="flex flex-col justify-center items-center mt-8 px-2"
        onSubmit={publishBlog}
      >
        <div className="grid w-full max-w-screen-lg items-center gap-1.5">
          <Label htmlFor="text" className="pb-2">
            Title
          </Label>
          <Input
            type="text"
            id="text"
            placeholder="Title of Gossip"
            className="border-gray-400"
            name="title"
          />
          <TextEditor />
        </div>
        <div className="md:w-8/12 ">
          <Button type="submit">Publish</Button>
        </div>
      </form>
    </div>
  );
};

const TextEditor = () => {
  return (
    <div className="grid w-full gap-1.5 my-4">
      <Label htmlFor="message">Your Gossip</Label>

      <Textarea
        placeholder="Express your Gossip here."
        id="message"
        className="border-gray-400 h-40"
        name="detail"
      />
    </div>
  );
};

export default Publish;
