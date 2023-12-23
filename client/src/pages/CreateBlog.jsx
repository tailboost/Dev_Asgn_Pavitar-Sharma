import { useState } from "react";
import { http } from "../http";
import toast from "react-hot-toast";
import useUserContext from "../hooks/useUserContext";
import { handleApiError } from "../utils/handleApiError";
import { AxiosError } from "axios";
import { getLocation } from "../utils/getLocation";
import { Navigate, useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const navigate = useNavigate();
  const [banner, setBanner] = useState("");
  const [title, setTitle] = useState("");
  const [des, setDes] = useState("");
  const { userAuth } = useUserContext();

  const uploadImage = async (event) => {
    const file = event.target.files ? event.target.files[0] : null;

    const formdata = new FormData();
    formdata.append("banner", file);

    const loadingToast = toast.loading("Uploading...");

    try {
      const response = await http.post("/blog/get-upload-url", formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setBanner(response.data?.uploadURL);
      toast.dismiss(loadingToast);
      toast.success("Uploaded 👍");
    } catch (error) {
      console.error(error);
      toast.dismiss(loadingToast);
    }
  };

  const handleTitleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  const handleTitleChange = (event) => {
    const input = event.target;

    input.style.height = "auto";
    input.style.height = input.scrollHeight + "px";

    setTitle(input.value);
  };

  const handleImageError = (e) => {
    const img = e.target;

    img.src = "/imgs/blog-banner.png";
  };

  const handleBlogPublish = async (event) => {
    event.preventDefault();
    const button = event.currentTarget;

    if (button.className.includes("disabled")) {
      return;
    }

    if (!title.length) {
      return toast.error("Write blog title before publishing");
    }

    if (!des.length) {
      return toast.error("Write blog description before publishing");
    }

    const location = await getLocation();

    const responseBody = {
      banner,
      title,
      des,
      country: location.country,
    };

    button.classList.add("disabled");

    const loadingToast = toast.loading("Publishing....");
    try {
      await http.post("/blog/create-blog", responseBody, {
        headers: {
          Authorization: `Bearer ${userAuth?.access_token}`,
        },
      });
      button.classList.remove("disabled");
      toast.dismiss(loadingToast);
      toast.success("Published 👍");

      setTimeout(() => {
        navigate("/");
      }, 500);
    } catch (error) {
      console.log(error);
      button.classList.remove("disabled");
      toast.dismiss(loadingToast);

      let message;

      if (error instanceof AxiosError) {
        message = handleApiError(error);
      } else {
        message = "An unexpected error occurred.";
      }
      toast.error(message);
    }
  };

  return (
    <>
      {userAuth?.access_token === null ? (
        <Navigate to="/signin" />
      ) : (
        <section>
          <form className="mx-auto max-w-[900px] w-full">
            <div className="relative aspect-video bg-white border-4 border-grey hover:opacity-80">
              <label htmlFor="uploadBanner" className="">
                <img
                  src={banner}
                  alt="blog-banner"
                  className="z-20"
                  onError={handleImageError}
                />
                <input
                  id="uploadBanner"
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  hidden
                  name="banner"
                  onChange={uploadImage}
                />
              </label>
            </div>

            <textarea
              defaultValue={title}
              placeholder="Blog Title"
              className="text-4xl font-medium w-full h-20 outline-none resize-none mt-10 leading-tight placeholder:opacity-40"
              onKeyDown={handleTitleKeyDown}
              onChange={handleTitleChange}
            />

            <hr className="w-full opacity-10 my-5" />

            <textarea
              name="des"
              id="des"
              cols="30"
              rows="10"
              value={des}
              placeholder="Write blog description"
              className="input-box placeholder:text-dark-grey placeholder:text-xl"
              onChange={(e) => setDes(e.target.value)}
            ></textarea>

            <button
              className="btn-dark !py-2 my-4"
              onClick={handleBlogPublish}
              type="submit"
            >
              Publish
            </button>
          </form>
        </section>
      )}
    </>
  );
};

export default CreateBlog;
