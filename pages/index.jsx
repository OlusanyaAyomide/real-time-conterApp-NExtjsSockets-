import React,{useEffect,useState} from 'react'
import { io } from 'socket.io-client'

let socket

export default function index() {
  const [value,setValue] = useState("")
  const [counts,setCount] = useState(false)
  const [isloading,setIsloading] = useState(true)

  const onChangeHandler=(e)=>{
   setValue(e.target.value) 
   socket.emit("input-change",e.target.value)
  }
  const increaseHandler=(e)=>{
    socket.emit("increase")
  }
  const decreaseHandler = () =>{
    socket.emit("decrease")
  }
  useEffect(()=>{
    const fetcher = async()=>{
      const res = await fetch("http://127.0.0.1:8000/value")
      const {count} = await res.json()
      setCount(count)
      setIsloading(false)
    }


    const initializer = async ()=>{
      await fetch("api/sockets")
      socket = io()
      socket.on("connect",()=>{
        console.log("connected")
      })
      socket.on("update-input",msg=>{
        setValue(msg)
      })
      socket.on("new-count",msg=>{
        setCount(msg)
      })
    }
    fetcher()
    initializer()
    // return null
  },[])

  return (
    <div className='items-center h-[100px] pt-12 justify-center'>
      <div className ="w-full flex justify-center">
      <input type="text" className='px-2 border rounded-lg w-6/12 py-2 outline-none text-sm' value ={value} onChange={onChangeHandler} placeholder="Text"/>
      </div>
      {!isloading && <div className='my-4 flex flex-col items-center justify-center h-[50px]'>
        <div className=' justify-center mb-4'>
        <span className='text-2xl font-bold'>
          {counts}
        </span>

        </div>
 
      <div className='flex justify-center w-full'>
        <button className='border outline-none text-semibold rounded-lg px-4 py-1 bg-slate-300 mr-6' onClick={increaseHandler}>Increase</button>
        <button className='border outline-none text-semibold rounded-lg px-4 py-1 bg-slate-300 ml-6' onClick={decreaseHandler}>Decrease</button>
      </div>
      </div>}
    </div>
  )
}
