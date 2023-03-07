import React, { useEffect, useState } from "react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { BiShow, BiHide } from "react-icons/bi";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, Link} from "react-router-dom"
import { useDispatch  } from "react-redux"
import { signUp } from "../../redux/slices/authSlice";

const validate = Yup.object({
  username: Yup.string()
    .min(2, "Must be 2 chracters or more")
    .max(15, "Must be 15 chracters or less")
    .required("Username field is required!"),
  password: Yup.string()
    .required("Password is required.")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "password should contain minimum eight characters, at least one letter, one number and one special character"
    )
    .required("Passowrd field is required!"),
});

const SignUp = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validate) });
 


  const googleAuth = () => {
    window.open("http://localhost:3000/auth/google/callback", "_self")

  }
  const handleOnChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = (data) => {
    dispatch(signUp(data))
    .unwrap()
      .then(() => {
        navigate("/login");
        alert("User registerted successfully");
      })
      .catch(() => {
        alert("Something went wrong");
      });
    
  };

  return (
    <div className="px-4">
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="max-w-[500px] w-full mx-auto shadow-xl py-8 px-5 mt-20"
      >
        <div className="text-center">
          <p className="text-3xl font-bold">Sign Up</p>
          <p className="text-md text-gray-400 mt-2">
            Already have an account.{" "}
            <Link to="/login" className="text-blue-800 font-medium cursor-pointer">
              Login here
            </Link>
          </p>
        </div>
        <div className="flex flex-col">
          <label htmlFor="username">Username</label>
          <div className="flex items-center border border-gray-600 px-2 mt-1  rounded-md">
            <FaUserAlt />
            <input
              type="text"
              id="username"
              name="username"
              // value={formData.username}
              // onChange={handleOnChange}
              {...register("username")}
              placeholder="John Doe"
              className="outline-none w-full ml-4 py-2"
            />
          </div>
        </div>
        <small className="text-red-500 ml-1">
          {errors?.username && errors.username.message}
        </small>

        <div className="my-4">
          <div className="flex flex-col">
            <label htmlFor="password">Password</label>
            <div className="flex items-center border border-gray-600 px-2 mt-1  rounded-md">
              <FaLock />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                // value={formData.password}
                // onChange={handleOnChange}
                {...register("password")}
                placeholder="*********"
                className="outline-none w-full ml-4 py-2"
              />

              {!showPassword ? (
                <BiHide
                  onClick={() => setShowPassword((prevState) => !prevState)}
                  className="text-xl cursor-pointer"
                />
              ) : (
                <BiShow
                  onClick={() => setShowPassword(false)}
                  className="text-xl cursor-pointer"
                />
              )}
            </div>
          </div>
          <small className="text-red-500 ml-1">
            {errors?.password && errors.password.message}
          </small>
        </div>

        <button type="submit" className="bg-blue-500 text-white w-full cursor-pointer py-2 rounded-md">
          Sign Up
        </button>

        <div className="flex items-center gap-4 mt-5">
          <div className="h-[1px] bg-slate-200 w-full"></div>
          <p className="text-center">or</p>
          <div className="h-[1px] bg-slate-200 w-full"></div>
        </div>

        <button type="button" onClick={googleAuth} className="flex items-center justify-center gap-4 bg-slate-100 w-full py-2 rounded-md text-center mt-5 cursor-pointer">
          <img src="/images/google.png" alt="google" className="w-6" />
          Continue with Google
        </button>

        <button type="button" className="flex items-center justify-center gap-4 bg-slate-100 w-full py-2 rounded-md text-center mt-5 cursor-pointer">
          <img src="/images/facebook.png" alt="google" className="w-6" />
          <span className="text-md">Continue with Facebook</span>
        </button>
      </form>
    </div>
  );
};

export default SignUp;
