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
          <div className="flex flex-col sm:flex-row">
            <div className="flex sm:justify-center items-center">
              <AvatarPic name={authorName} />
              <div className="font-extralight my-auto">{authorName}</div>
            </div>
            <div className="flex flex-col sm:flex-row item-center my-auto">
              <div className="px-2 sm:flex hidden">&#9679;</div>
              <div className="font-thin text-slate-500">{publishedDate}</div>
            </div>
          </div>
          <div className="sm:text-xl font-semibold pt-2">{title}</div>
          <div className="font-thin">
            {content.length > 100 ? content?.slice(0, 100) + "..." : content}
          </div>
          <div className="text-slate-500 text-sm pt-2">{`${Math.ceil(
            content.length / 100
          )} minute(s) read`}</div>
        </div>
        <img
          src={thumbnail}
          alt="thumbnail"
          className="sm:max-w-36 sm:min-w-36 sm:h-28 max-w-24 min-w-24 h-20 rounded-lg object-cover my-auto"
        />
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
