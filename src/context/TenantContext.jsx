import { createContext, use, useState } from "react";
import { axiosInstance } from "../utils/axiosInstance";
import { useAppContext } from "../hooks/useAppContext";


export const TenantContext = createContext();

const TenantProvider = ({ children }) => {
    const [isloading, setisloading] =  useState(true);
    const [properties, setproperties] = useState({});
    const [page, setpage] = useState(1);
    const [totalpages, setTotalPages] = useState(1);
    const {token} = useAppContext();

    // api call to fetch properties
    const fetchProperties = async () => {
        if (token){
        try {
            const  {data} = await axiosInstance.get(`/property/?page=${page}`,{
                headers:
                 {Authorization: `Bearer ${token}`,}
            })
            setproperties(data.properties);
            setpage(data.currentPage);
            setTotalPages(data.totalPages);
            setisloading(false)
        } catch (error) {
            console.error("error");
        
        }};
        useEffect(() => {
          if (token) {
            fetchProperties();
          }
        }, [page]);
    
    }

  

    return <TenantContext.Provider value={{
        isloading,
        properties,
        page,
        setpage,
        totalpages
    }}>
        {children}
    </TenantContext.Provider>
}
export default TenantProvider;