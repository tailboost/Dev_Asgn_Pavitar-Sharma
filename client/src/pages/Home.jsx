import { useEffect, useState } from "react";
import { http } from "../http";
import BlogPostCard from "../components/BlogPostCard";
import NoDataMessage from "../components/NoDataMessage";
import Loader from "../components/Loader";
import useUserContext from "../hooks/useUserContext";
import { Navigate } from "react-router-dom";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const { userAuth } = useUserContext();

  const fetchLatestBlogs = async () => {
    setIsLoading(true);
    try {
      const { data } = await http.get(`/blog/latest-blogs?country=${userAuth?.location}`);
      setBlogs(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLatestBlogs();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAuth?.location]);

  return (
    <>
      {!userAuth?.access_token ? (
        <Navigate to="/signin" />
      ) : (
        <section className="h-cover flex justify-center gap-10 flex-col">
          {/* Latest Blogs */}
          <div className="flex items-center gap-4 ">
            <span className="text-2xl font-semibold text-dark-grey">Country:</span>
            <span className="text-2xl font-semibold text-dark-grey">{userAuth?.location}</span>
          </div>

          <hr className="text-dark-grey/50" />
          <div>
            {isLoading ? (
              <Loader />
            ) : blogs?.length === 0 ? (
              <NoDataMessage message="No blogs published" />
            ) : (
              blogs?.map((blog, i) => (
                <BlogPostCard key={i} content={blog} author={blog?.author} />
              ))
            )}

            {/* <div className="md:max-w-sm mx-auto">
        <LoadMoreDataBtn handleLoadMore={handleLoadMore} />
      </div> */}
          </div>
        </section>
      )}
    </>
  );
};

export default Home;
