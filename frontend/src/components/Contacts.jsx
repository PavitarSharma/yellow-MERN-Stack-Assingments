import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteContact, getAllContacts } from "../redux/slices/contactSlice";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { Navigate, useNavigate } from "react-router-dom";

const Contacts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isError, contacts } = useSelector(
    (state) => state.contacts
  );

  useEffect(() => {
    dispatch(getAllContacts()).unwrap();
  }, [dispatch]);

  if (isLoading) {
    return <div className="text-center">Loding...</div>;
  }

  return (
    <>
      {contacts.length > 0 && (
        <div className="table__body">
          <table className="border border-gray-500 w-full mx-auto overflow-x-scroll relative">
            <thead className="">
              <tr className="uppercase bg-[#d5d1defe]">
                <th className="border-collapse p-4 text-left">Username</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Message</th>
                <th></th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {contacts &&
                contacts?.map((contact) => {
                  return (
                    <tr
                      key={contact?._id}
                      className="border-b-gray-500 border-b-[1px] w-full transition-all duration-500 ease-in-out hover:bg-[#f8f4f4] cursor-pointer"
                    >
                      <td className="px-5 py-3">{contact?.username}</td>
                      <td className="px-5 py-3">{contact?.email}</td>
                      <td className="px-5 py-3">{contact?.phone}</td>
                      <td className="px-5 py-3">{contact?.message}</td>
                      <td className="px-2 py-3">
                        <AiFillEdit
                          onClick={() => navigate(`/contact/${contact?._id}`)}
                        />
                      </td>
                      <td className="px-2 py-3">
                        <AiFillDelete
                          onClick={() => {
                            dispatch(deleteContact(contact?._id));
                            setTimeout(() => {
                              document.location.reload();
                            }, 2000)
                          }}
                          className="text-red-700"
                        />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Contacts;
