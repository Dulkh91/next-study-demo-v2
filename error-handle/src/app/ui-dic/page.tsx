"use client";
import { debounce } from 'lodash';
import { useState,useEffect} from "react";

interface ApiDic{
    KOREA: string;
    KHMER: string;
    MEANING: string;
    EN: string
}

const Dictionary = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<ApiDic[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = debounce( async (e:string) => {
    if(!e.trim()){
      setData(null)
      setLoading(false)
      return
    }
    try {
      
      setLoading(true);
      const res = await fetch("api/dic", {
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Something went wrong.");
      }
      const dic = data.data.DATA.filter((d:ApiDic)=>d.KOREA.trim().includes(e.trim()))
      setData(dic);
      setLoading(false)
    } catch (err) {
      console.error("error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong, try again please."
      );
    } finally {
      setLoading(false);
    }
  } ,1000) 
  useEffect(()=>{
    return ()=>{
        handleChange.cancel()
    }
  },[])

  return (
    <div className=" contain w-4xl mx-auto mt-10">
      <div>
        <input
          type="text"
          placeholder="Type to find word"
          className=" w-full border p-3 rounded outline-0"
          onChange={(e)=>handleChange(e.target.value)}
        />
      </div>
      {error?<h1 className=' text-red-600 mt-3'>Error: {error}</h1>
      :<div>
        {loading?<div>Loading.....</div>:
         data && data.map((d,index)=>(
            <div key={index} className='mt-3 border-b-1'>
                <h1 className=' ml-1'>{d.KOREA}</h1>
                <span className='block mb-1 ml-1'>{d.KHMER}</span>
            </div>))
        }
      </div>}
    </div>
  );
};

export default Dictionary;

