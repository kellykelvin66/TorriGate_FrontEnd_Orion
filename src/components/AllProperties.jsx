import React from "react";
import { properties } from "../data";
import FeaturedPropertyCard from "./FeaturedPropertyCard";
import { useTenantContext } from "../hooks/useTenantContext";
import SuspenseLoader from "./SuspenseLoader";
import EmptyTenant from "./EmptyTenant";

const AllProperties = () => {
  const { isloading, properties } = useTenantContext();
  if (isloading) {
    return <SuspenseLoader />;
  }
  // If properties are loaded but empty, show a message
  // This is to handle the case where properties are fetched but none are available
  // It prevents showing an empty grid with no properties
  // This is useful for user experience, indicating that there are no properties available
  // instead of showing an empty grid
  if (!isloading && properties.length === 0) {
    return <h1 className="text-center text-2xl font-bold mt-10">No Properties Available</h1>;
  }
  return (
    <div className="layout py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-lg md:text-2xl lg:text-[35px] font-bold text-[#1e1e1e]">
          All Properties
        </h1>
        <div></div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {properties.map((property) => {
          return <FeaturedPropertyCard key={property._id} {...property} />;
        })}
      </div>
    </div>
  );
};

export default AllProperties;
