import React from "react";
import { properties } from "../data";
import { IoTrendingUp } from "react-icons/io5";
import AdminPropertyCard from "../components/AdminPropertyCard";
import { Link } from "react-router-dom";
import { MdOutlineAddHome } from "react-icons/md";
import AdminPagination from "../components/AdminPagination";
import { axiosInstance } from "../utils/axiosInstance";
import { useState, useEffect } from "react";
import { useAppContext } from "../hooks/useAppContext";
import SuspenseLoader from "../components/SuspenseLoader";
import EmptyLandlord from "../components/EmptyLandlord";
const AdminProperty = () => {
  const [isloading, setisloading] = useState(true);
  const [page, setpage] = useState(1);
  const [totalpages, setTotalPages] = useState(0);
  const [properties, setproperties] = {};
  const [total, setTotal] = useState(0);
  const { token } = useAppContext();
  const fecthProperties = async () => {
    try {
      setpage(data.properties);
      const { data } = axiosInstance.get(`/property/landlord?page=${page}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setproperties(data.properties);
      setpage(data.currentPage);
      setTotalPages(data.tptalpages);
      setTotal(data.total);
      setisloading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fecthProperties();
  }, [page]);

  if (isloading) {
    return <SuspenseLoader />;
  }
  if (!isloading && total === 0) {
    return <EmptyLandlord />;
  }
  return (
    <div>
      <div className="flex items-center justify-between my-5">
        <div>
          <h1 className="w-full font-[500] font-[mona Sans] text-[22px] text-black capitalize mb-2">
            Dashboard
          </h1>
          <div className="flex items-center  gap-2 capitalize text-[14px]">
            <h4 className="text-[#666666]">dashboard</h4>
            <h3 className="text-[#666666]">.</h3>
            <h4 className="text-black ">overview</h4>
          </div>
        </div>
        <div>
          <Link
            to="/dashboard/create"
            className="flex gap-3 items-center rounded-lg bg-black text-white px-3 py-4"
          >
            <span className="hidden md:block text-[16px] font-semibold">
              Create New Property
            </span>
            <MdOutlineAddHome size={25} />
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-3.5 lg:flex-row items-center mt-6 mb-10">
        <div className="w-full lg:w-[274.25px] ">
          <h2 className="pl-3.5 mb-3 font-medium text-[16px] text-[#666]">
            Total Property
          </h2>
          <div className="w-full bg-white rounded-lg flex items-center h-[80px] pl-3.5">
            <h1 className="font-semibold text-2xl">05</h1>
          </div>
        </div>
        <div className="w-full lg:w-[274.25px] ">
          <h2 className="pl-3.5 mb-3 font-medium text-[16px] text-[#666]">
            Available Property
          </h2>
          <div className="w-full bg-white rounded-lg flex items-center h-[80px] pl-3.5">
            <h1 className="font-semibold text-2xl">03</h1>
          </div>
        </div>
        <div className="w-full lg:w-[274.25px] ">
          <h2 className="pl-3.5 mb-3 font-medium text-[16px] text-[#666]">
            Rented Property
          </h2>
          <div className="w-full bg-white rounded-lg flex items-center h-[80px] pl-3.5">
            <h1 className="font-semibold text-2xl">02</h1>
          </div>
        </div>
        <div className="w-full lg:w-[274.25px]">
          <h2 className="pl-3.5 mb-3 font-medium text-[16px] text-[#666]">
            Profile View
          </h2>
          <div className="w-full bg-white rounded-lg flex items-center h-[80px] px-3.5 justify-between ">
            <h1 className="font-semibold text-2xl">14</h1>
            <div className="flex items-center gap-2">
              <p className="bg-[#EEFCEC] rounded-md text-[#24D50B] w-20 p-1 flex items-center gap-2">
                <IoTrendingUp color="#24D50B" />
                +30%
              </p>
              <p className="text-[#666666] text-[16px]">vs last month </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {properties.map((property) => {
          return <AdminPropertyCard key={property._id} {...property} />;
        })}
      </div>
      <div>
        {totalpages > 1 && (
          <AdminPagination
            page={page}
            totalPages={totalpages}
            setPage={setpage}
          />
        )}
      </div>
    </div>
  );
};

export default AdminProperty;
