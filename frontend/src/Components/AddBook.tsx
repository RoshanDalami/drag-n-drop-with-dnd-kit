// import React from 'react'
import { useForm } from 'react-hook-form'
import { nanoid } from 'nanoid';

export default function AddBook() {

    const {register , handleSubmit} = useForm();
    const addBook = async (data:any)=>{
        const body = {
         
             taskTitle: data.title,
             taskId : nanoid()
        }
        // console.log(data)
       
        try{
            const response = await fetch('http://localhost:8000/tasks/addTask',{
                method:'post',
                headers:{
                    "Content-Type":"application/json"
                },
                // mode:'cors',
                body:JSON.stringify(body)
            })
            if(response.ok === true){

                console.log(response)
    
                console.log(body)
            }else{
                console.log('error',)
            }
        }catch(error){
            console.log(error)
        }
    }
  return (
    <div>
      <form action="" onSubmit={handleSubmit((data)=>addBook(data))}  >
        <div className=''>
            <label htmlFor="">Title</label>
            <input type="text" {...register('title')}  className='text-black px-4 py-1' />
        </div>
        <button type='submit' > Add Task </button>
      </form>
    </div>
  )
}
