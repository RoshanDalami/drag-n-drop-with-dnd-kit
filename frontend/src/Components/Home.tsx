
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
export default function Home() {
    const [data,setData] = useState([]);

    const fetchData = async()=>{
        const response = await fetch('http://localhost:8000/tasks')
        const data = await response.json();
        setData(data);
    }
    useEffect(()=>{
        fetchData()
    },[data])
  return (
    <div className='text-white'>
      {
        data?.map((item:any)=>{
            return(
                <Link key={item.taskId} to={`/board/${item.taskId}`}>
                <div  className="h-24 w-72 border rounded-md">
                       <p>{
                        item.taskTitle
                        }</p>
                </div>
                </Link>
            )
        })
      }
    </div>
  )
}
