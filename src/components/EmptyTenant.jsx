import React from "react";
import tenantF from "../assets/tenant.png"

const EmptyTenant = () => {
    return (
        <div className="flex  items-center justify-center h-[500px]">
            <div className="max-w-[356px] p-1.5 text-center">
                     <img src={tenantF} alt="im"  className="mx-auto block"/>
                <h1 className="font-medium text-xl my-2.5">
                     No matches found
                </h1>
                <p className="text-[#666] font-medium text-[16px] mb-6">
                    we could not find any matches for your  request
                </p>
            </div>

        </div>
    )
}
export default EmptyTenant;
