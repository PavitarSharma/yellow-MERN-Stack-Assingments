import React from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { createContact } from "../redux/slices/contactSlice";

const validate = Yup.object({
  username: Yup.string().required("Username is required!"),
  email: Yup.string().email("Email is Invalid").required("Email is required!"),
  phone: Yup.string()
    .max(15, "Must be 15 chracters or less")
    .required("Mobile number is required!"),
  message: Yup.string().required("Message is required!"),
});

const Contact = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validate) });

  const handleFormSubmit = (data) => {
    dispatch(createContact(data));
    setTimeout(() => {
      document.location.reload();
    }, 2000)
    // reset();
  };

  return (
    <div className="px-4">
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="max-w-[800px] w-full mx-auto shadow-xl py-8 px-5 mt-20 mb-24"
      >
        <div className="flex md:flex-row flex-col md:justify-between md:items-center md:gap-6 gap-1 w-full">
          <div className="flex flex-col items-start">
            <div className="text-center">
              <p className="text-3xl font-bold">Contact</p>
            </div>

            <div className="flex flex-col my-4">
              <label htmlFor="username">Username</label>
              <div>
                <input
                  type="text"
                  id="username"
                  name="username"
                  {...register("username")}
                  placeholder="John Doe"
                  className="outline-none border border-gray-600 px-4 mt-1 w-full rounded-md  py-2"
                />
                <small className="text-red-500 ml-1">
                  {errors?.username && errors.username.message}
                </small>
              </div>
            </div>

            <div className="flex flex-col my-4">
              <label htmlFor="email">Email</label>
              <div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  {...register("email")}
                  placeholder="john@example.com"
                  className="outline-none border border-gray-600 px-4 mt-1 w-full rounded-md  py-2"
                />
                <small className="text-red-500 ml-1">
                  {errors?.email && errors.email.message}
                </small>
              </div>
            </div>

            <div className="flex flex-col my-4">
              <label htmlFor="phone">Phone Number</label>
              <div>
                <input
                  type="phone"
                  id="phone"
                  name="phone"
                  {...register("phone")}
                  placeholder="+915879564235"
                  className="outline-none border border-gray-600 px-4 mt-1 w-full rounded-md  py-2"
                />
                <small className="text-red-500 ml-1">
                  {errors?.phone && errors.phone.message}
                </small>
              </div>
            </div>
          </div>

          <div>
            <div className="flex flex-col my-4">
              <label htmlFor="message">Messages</label>
              <div>
                <textarea
                  type="message"
                  id="message"
                  rows="5"
                  name="message"
                  {...register("message")}
                  placeholder="Write message here...."
                  className="outline-none border border-gray-600 px-4 mt-1 w-full rounded-md  py-2"
                />
                <small className="text-red-500 ml-1">
                  {errors?.message && errors.message.message}
                </small>
              </div>
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white w-full cursor-pointer py-2 rounded-md mt-4"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Contact;
