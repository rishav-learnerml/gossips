import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  id: string;
  thumbnail: string;
  
}

const BlogCard = ({
  authorName,
  title,
  content,
  publishedDate,
  thumbnail,
  id,

}: BlogCardProps) => {
  return (
    <Link
      to={`/blog/${id}`}
      className="border-b-2 border-gray-200 p-4 w-screen max-w-screen-md cursor-pointer"
    >
      <div className="flex justify-between">
        <div>
          <div className="flex">
            <div className="flex justify-center flex-col">
              <AvatarPic name={authorName} />
            </div>
            <div className="flex item-center my-auto">
              <div className="font-extralight">{authorName}</div>
              <div className="px-2">&#9679;</div>
              <div className="font-thin text-slate-500">{publishedDate}</div>
            </div>
          </div>
          <div className="text-xl font-semibold pt-2">{title}</div>
          <div className="font-thin">
            {content.length > 100 ? content?.slice(0, 100) + "..." : content}
          </div>
          <div className="text-slate-500 text-sm pt-2">{`${Math.ceil(
            content.length / 100
          )} minute(s) red`}</div>
        </div>
        <img src={thumbnail} alt="thumbnail" className="w-32 max-w-28 h-20 rounded-lg object-cover" />
      </div>
    </Link>
  );
};

const getRandomColor = () => {
  const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  return randomColor;
};

export const AvatarPic = ({ name }: { name: string }) => {
  const backgroundColor = getRandomColor();
  const fontColor = getRandomColor();

  return (
    <Avatar className="font-semibold text-xs p-1">
      <AvatarImage
        src="https://xsgames.co/randomusers/avatar.php?g=pixel"
        className="rounded-full"
      />
      <AvatarFallback style={{ color: fontColor, backgroundColor }}>
        {name?.split(" ")?.[0]?.[0]} {name?.split(" ")?.[1]?.[0]}
      </AvatarFallback>
    </Avatar>
  );
};

export default BlogCard;
