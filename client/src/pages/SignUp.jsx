import { Link, useNavigate } from "react-router-dom";
import useUserContext from "../hooks/useUserContext";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { storeInSession } from "../utils/session";
import { http } from "../http";
import toast from "react-hot-toast";
import Input from "../components/Input";
import { handleApiError } from "../utils/handleApiError";
import { AxiosError } from "axios";
import { getLocation } from "../utils/getLocation";

const SignUp = () => {
  const navigate = useNavigate();
  const { userAuth, setUserAuth } = useUserContext();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (userAuth && userAuth.access_token) {
      navigate("/");
    }
  }, [userAuth, navigate]);

  const { handleSubmit, control } = useForm();

  const onSubmit = async (values) => {
    const location = await getLocation();
    const responseBody = {
      ...values,
      location: location.country,
    };

    setIsLoading(true);
    try {
      const { data } = await http.post("/user/signup", responseBody);
      storeInSession("user", JSON.stringify(data));
      setUserAuth(data);
      toast.success("User signned up successfully");
      navigate("/");
    } catch (error) {
      let message;

      if (error instanceof AxiosError) {
        message = handleApiError(error);
      } else {
        message = "An unexpected error occurred.";
      }
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section className="h-cover flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[80%] max-w-[400px] mx-auto"
      >
        <h1 className={`text-4xl font-gelasio capitalize text-center mb-24`}>
          Join us today
        </h1>

        <Controller
          defaultValue=""
          name="fullname"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Input
              id="fullname"
              name="fullname"
              placeholder="Full Name"
              value={value}
              onChange={(text) => onChange(text)}
              icon="fi-rr-user"
            />
          )}
        />

        <Controller
          defaultValue=""
          name="email"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={value}
              onChange={(text) => onChange(text)}
              icon="fi-sr-at"
            />
          )}
        />

        <Controller
          defaultValue=""
          name="password"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={value}
              onChange={(text) => onChange(text)}
              icon="fi-sr-key"
            />
          )}
        />

        <button
          type="submit"
          disabled={isLoading}
          className="btn-dark center mt-14"
        >
          Sign Up
        </button>
        <p className="mt-6 text-dark-grey text-xl text-center">
          Already a member?
          <Link
            to="/signin"
            className="underline cursor-pointer text-black tetx-xl ml-1"
          >
            Sign in here.
          </Link>
        </p>
      </form>
    </section>
  );
};

export default SignUp;
