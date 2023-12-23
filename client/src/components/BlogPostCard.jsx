import { Link } from "react-router-dom";
import { getDay } from "../utils/date";

const BlogPostCard = ({ content, author }) => {
  const { _id: id, title, des, banner, createdAt } = content;

  const { fullname } = author;

  return (
    <Link
      to={`/blog/${id}`}
      className="flex gap-8 items-center border-b border-b-grey mb-4 pb-5"
    >
      <div className="w-full">
        <div className="flex gap-2 items-center mb-7">
          <i className="fi fi-rr-circle-user"></i>
          <p className="line-clamp-1">{fullname}</p>
          <p className="min-w-fit">{getDay(createdAt)}</p>
        </div>

        <h1 className="blog-title">{title}</h1>
        <p className="my-3 text-xl font-gelasio leading-7 max-sm:hidden md:max-[1100px]:hidden line-clamp-2">
          {des}
        </p>
      </div>

      <div className="h-28 aspect-square bg-grey">
        <img
          src={banner}
          alt="banner"
          className="w-full h-full rounded object-cover aspect-square"
        />
      </div>
    </Link>
  );
};

export default BlogPostCard;
