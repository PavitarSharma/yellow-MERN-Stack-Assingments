import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getSingleContact, updateContact } from "../redux/slices/contactSlice";

const Contact = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { contact } = useSelector((state) => state.contacts);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    message: "",
  });
  const { id } = useParams();

  useEffect(() => {
    if (contact) {
      setFormData({
        username: contact?.username,
        email: contact?.email,
        phone: contact?.phone,
        message: contact?.message,
      });
    }
  }, [contact]);

  useEffect(() => {
    dispatch(getSingleContact(id));
  }, [dispatch, id]);

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(updateContact({ id, formData }));
    navigate("/");
  };

  const handleOnChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
      <Navbar />
      <div className="px-4">
        <form
          onSubmit={handleSubmit}
          className="max-w-[800px] w-full mx-auto shadow-xl py-8 px-5 mt-20 mb-24"
        >
          <div className="flex md:flex-row flex-col md:justify-between md:items-center md:gap-6 gap-1 w-full">
            <div className="flex flex-col items-start">
              <div className="text-center">
                <p className="text-3xl font-bold">Edit Contact</p>
              </div>

              <div className="flex flex-col my-4">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleOnChange}
                  placeholder="John Doe"
                  className="outline-none border border-gray-600 px-4 mt-1 w-full rounded-md  py-2"
                />
              </div>

              <div className="flex flex-col my-4">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleOnChange}
                  placeholder="john@example.com"
                  className="outline-none border border-gray-600 px-4 mt-1 w-full rounded-md  py-2"
                />
              </div>

              <div className="flex flex-col my-4">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="phone"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleOnChange}
                  placeholder="+915879564235"
                  className="outline-none border border-gray-600 px-4 mt-1 w-full rounded-md  py-2"
                />
              </div>
            </div>

            <div>
              <div className="flex flex-col my-4">
                <label htmlFor="message">Messages</label>
                <textarea
                  type="message"
                  id="message"
                  rows="5"
                  name="message"
                  value={formData.message}
                  onChange={handleOnChange}
                  placeholder="Write message here...."
                  className="outline-none border border-gray-600 px-4 mt-1 w-full rounded-md  py-2"
                />
              </div>

              <button
                type="submit"
                className="bg-blue-500 text-white w-full cursor-pointer py-2 rounded-md mt-4"
              >
                Submit
              </button>

              <div className="text-center mt-4">
                <Link to="/home" className="text-orange-500 cursor-pointer">
                  Go to Home page
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Contact;
