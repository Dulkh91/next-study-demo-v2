'use client'
import { useState ,useEffect} from "react"
const random = (count: number)=>{
    return Math.floor(Math.random()*count )
}

const RamdomHandle = () => {
    const [count, setCount] = useState<number>(0)
    const handleClick = ()=>{
        setCount(random(3))
    }
    useEffect(()=>{
        if(count ===1){
            throw new Error("View is Loading...")
        }

    },[count])

    return (<div>
        <h1>Handle Error with ramdom count</h1>
        <p>{count}</p>
        <button className="border p-1 px-3"
            onClick={handleClick}
        >Random</button>
    </div>);
}
 
export default RamdomHandle;