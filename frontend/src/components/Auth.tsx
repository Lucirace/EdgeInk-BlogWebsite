import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignupInput } from "@lucirace/medium-common";
import { BACKEND_URL } from "../config";
import axios from "axios";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<SignupInput>({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });

  async function sendRequest() {
    if (!postInputs.email || !postInputs.password) {
      setAlert({
        show: true,
        message: "Please fill in all fields",
        type: "error",
      });
      setTimeout(() => setAlert({ show: false, message: "", type: "" }), 3000);
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user${
          type === "signup" ? "/signup" : "/signin"
        }`,
        postInputs
      );

      const jwt = response.data;
      localStorage.setItem("token", jwt);
      
      setAlert({
        show: true,
        message: "Success! Redirecting you...",
        type: "success",
      });
      
      setTimeout(() => {
        navigate("/blogs");
      }, 1000);
    } catch (e) {
      setAlert({
        show: true,
        message: "Error while signing in. Please try again.",
        type: "error",
      });
      setTimeout(() => setAlert({ show: false, message: "", type: "" }), 3000);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-sm border border-gray-100">
        {/* Logo */}
        <div className="flex justify-center">
          <svg width="60" height="40" viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-900">
            <path
              d="M20 40H26.0723L24.3045 38.2322C23.8357 37.7634 23.1998 37.5 22.5368 37.5H20C10.335 37.5 2.5 29.665 2.5 20C2.5 10.335 10.335 2.50001 20 2.5L40 2.5C49.665 2.5 57.5 10.335 57.5 20C57.5 29.665 49.665 37.5 40 37.5H32.5184C31.5238 37.5 30.57 37.1049 29.8667 36.4017L27.7957 34.3306C26.6236 33.1585 25.0338 32.5 23.3762 32.5H20C13.0964 32.5 7.5 26.9036 7.5 20C7.5 13.0964 13.0964 7.5 20 7.5L40 7.5C46.9036 7.5 52.5 13.0964 52.5 20C52.5 26.9036 46.9036 32.5 40 32.5H35.1961C34.2015 32.5 33.2477 32.1049 32.5444 31.4017L30.4733 29.3306C29.3012 28.1585 27.7115 27.5 26.0539 27.5H20C15.8579 27.5 12.5 24.1421 12.5 20C12.5 15.8579 15.8579 12.5 20 12.5L40 12.5C44.1421 12.5 47.5 15.8579 47.5 20C47.5 24.0916 44.2235 27.418 40.1512 27.4985L40.1504 27.5H38.3211C37.3265 27.5 36.3727 27.1049 35.6694 26.4017L33.5983 24.3306C32.6366 23.3688 31.3937 22.7529 30.0628 22.5628L30 22.5L20 22.5C18.6193 22.5 17.5 21.3807 17.5 20C17.5 18.6193 18.6193 17.5 20 17.5L40 17.5C41.3807 17.5 42.5 18.6193 42.5 20C42.5 21.3807 41.3807 22.5 40 22.5H35L36.7678 24.2678C37.2366 24.7366 37.8725 25 38.5355 25H40C42.7614 25 45 22.7614 45 20C45 17.2386 42.7614 15 40 15L20 15C17.2386 15 15 17.2386 15 20C15 22.7614 17.2386 25 20 25L29.1789 25C30.1735 25 31.1273 25.3951 31.8306 26.0983L33.9017 28.1694C35.0738 29.3415 36.6635 30 38.3211 30H40.625V29.9808C45.8567 29.6582 50 25.3129 50 20C50 14.4772 45.5228 10 40 10L20 10C14.4772 10 10 14.4772 10 20C10 25.5229 14.4772 30 20 30H26.0539C27.0485 30 28.0023 30.3951 28.7056 31.0983L30.7767 33.1694C31.9488 34.3415 33.5385 35 35.1961 35H40C48.2843 35 55 28.2843 55 20C55 11.7157 48.2843 5 40 5L20 5C11.7157 5 5 11.7157 5 20C5 28.2843 11.7157 35 20 35H23.3762C24.3708 35 25.3246 35.3951 26.0279 36.0983L28.099 38.1694C29.2711 39.3415 30.8608 40 32.5184 40H40C51.0457 40 60 31.0457 60 20C60 8.9543 51.0457 -9.65645e-07 40 0L20 4.13264e-06C8.9543 5.09829e-06 -9.65645e-07 8.95431 0 20C9.65645e-07 31.0457 8.95431 40 20 40Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
        
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            {type === "signup" ? "Create your account" : "Welcome back"}
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            {type === "signin" ? "Don't have an account?" : "Already have an account?"}
            <Link
              className="ml-1 font-medium text-emerald-600 hover:text-emerald-500 transition-colors duration-200"
              to={type === "signin" ? "/Signup" : "/Signin"}
            >
              {type === "signin" ? "Sign up" : "Sign in"}
            </Link>
          </p>
        </div>

        {/* Alert Component */}
        {alert.show && (
          <div 
            className={`rounded-md p-4 ${
              alert.type === "error" 
                ? "bg-red-50 text-red-800 border border-red-200" 
                : "bg-green-50 text-green-800 border border-green-200"
            } transition-all duration-300 ease-in-out`}
          >
            <div className="flex">
              <div className="flex-shrink-0">
                {alert.type === "error" ? (
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">{alert.message}</p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 space-y-6">
          <div className="space-y-4">
            <LabelledInput
              label="Email"
              placeholder="Enter your email"
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  email: e.target.value,
                });
              }}
            />
            <LabelledInput
              label="Password"
              type="password"
              placeholder={type === "signup" ? "Create a password" : "Enter your password"}
              onChange={(e) => {
                setPostInputs({ ...postInputs, password: e.target.value });
              }}
            />
          </div>

          {type === "signin" && (
            <div className="flex items-center justify-end">
              <div className="text-sm">
                <Link to="/signup" className="font-medium text-emerald-600 hover:text-emerald-500 transition-colors duration-200">
                  Forgot your password?
                </Link>
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={sendRequest}
            disabled={isLoading}
            className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
              isLoading ? "bg-gray-600" : "bg-emerald-600 hover:bg-emerald-700"
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-200`}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              type === "signup" ? "Create account" : "Sign in"
            )}
          </button>
            
          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                By continuing, you agree to our Terms of Service
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface LabelledInputType {
  label: string;
  placeholder: string;
  type?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function LabelledInput({ label, placeholder, onChange, type }: LabelledInputType) {
  return (
    <div className="group">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative rounded-md">
        <input
          onChange={onChange}
          type={type || "text"}
          className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 
          focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200
          hover:border-gray-400"
          placeholder={placeholder}
          required
        />
      </div>
    </div>
  );
}