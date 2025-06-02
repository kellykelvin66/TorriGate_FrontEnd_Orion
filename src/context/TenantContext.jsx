import { createContext, use, useState } from "react";
import { axiosInstance } from "../utils/axiosInstance";
import { useAppContext } from "../hooks/useAppContext";


export const TenantContext = createContext();

const TenantProvider = ({ children }) => {
    const [isloading, setisloading] =  useState(true);
    const [properties, setproperties] = useState({});
    const [page, setpage] = useState(1);
    const [totalpages, setTotalPages] = useState(1);
    const [total, setTotal] = useState(1)
    const {token} = useAppContext();
    const {locValue, setLocValue} = useState("");
    const {budget, setBudget} = useState("");
    const {type, setType} = useState("");

    // api call to fetch properties
    const fetchProperties = async () => {
        if (token){
        try {
            setisloading(true);
            const  {data} = await axiosInstance.get(`/property/?page=${page}&location=${locValue}&budget=${budget}`,{
                headers:
                 {Authorization: `Bearer ${token}`},
            })
            setproperties(data.properties);
            setpage(data.currentPage);
            setTotalPages(data.totalPages);
            setTotal(data.totalProperties)
            setisloading(false);
        } catch (error) {
            console.error("error");
        
        }};
        useEffect(() => {
          if (token) {
            fetchProperties();
          }
        }, [page,token, locValue, budget, type]);
    
    }
    const resetFilters =() =>{
        setpage(1)
        setLocValue("");
        setBudget("");
        setType("");
    }

  

    return <TenantContext.Provider value={{
        isloading,
        properties,
        page,
        setpage,
        totalpages,
        total,
        setLocValue,
        resetFilters,
        setBudget,
        setType
        
    }}>
        {children}
    </TenantContext.Provider>
}
export default TenantProvider;