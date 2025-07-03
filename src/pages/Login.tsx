import * as yup from "yup";
import { useAuth } from "../context/auth-context";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import InfoIcon from "../assets/icons8-info.svg";
import LoginImage from "../assets/login.avif";
import { message } from "antd";

interface LoginForm {
  username: string;
  password: string;
}

const schema = yup
  .object({
    username: yup.string().trim().required("Username is required"),
    password: yup.string().trim().required("Password is required"),
  })
  .required();

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginForm>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      await login(data.username, data.password);
    } catch (error) {
      message.error("Login failed. Please check your credentials.");
      console.error("Login failed", error);
      reset();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="flex w-full max-w-md md:max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        {/* Shared Image Section */}
        <div className="hidden md:block w-1/2  p-6">
          <img
            src={LoginImage}
            alt="Sign in"
            className="w-full h-full object-contain"
            loading="lazy"
          />
        </div>

        {/* Form Section */}
        <div className="w-full max-w-md md:w-1/2 p-8">
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-2">
            Sign in to your account
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-green-600 font-medium hover:underline"
            >
              Get started
            </Link>
          </p>

          <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-6 text-sm">
            <div className="flex items-center flex-wrap">
              <img src={InfoIcon} alt="Info" className="w-5 h-5 mr-2" />
              Use <strong className="mx-1"> emilys</strong> with password
              <strong className="ml-1">emilyspass</strong>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                {...register("username")}
                className={`mt-1 w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                  errors.username ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.username && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div>
              <div className="flex justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <Link
                  to="/login"
                  onClick={() => {
                    message.info("Password recovery is not implemented");
                    console.log("Password recovery is not implemented");
                  }}
                  className="text-sm text-green-600 hover:underline mb-1"
                >
                  Forgot password?
                </Link>
              </div>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                {...register("password")}
                className={`mt-1 w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
  