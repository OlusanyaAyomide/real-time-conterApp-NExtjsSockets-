import React,{useState,useEffect,Fragment} from 'react'
import { demoRooms,testerMessage } from '@/store/constants'
import { useSession } from 'next-auth/react'
import { io } from 'socket.io-client'

let socket  = io()

// let socket

export default function Index() {
    const [rooms,setrooms] = useState([])
    const [message,setMesage] =  useState(testerMessage)
    const [isLoading,setIsLoading] = useState(true)
    const [input,setInput] = useState("")
    const {data:session} = useSession()
    console.log(session)
    const submitHandler =()=>{
        socket.emit("create",{room:input,email:"testermail01"})
        setrooms(prev=>[...prev,input])
        setInput("")
    }
    const joinChat = (room)=>{
        socket.emit("join",{room,email:"testermail92.com"})
    }
    useEffect(()=>{
        const initializer = async ()=>{
            await fetch("api/rooms")
            // socket = io()
            socket.on("connect",()=>{
              console.log("connected")
            })
            socket.on("new-room",room=>{
              setrooms((prev=>{
                console.log(room)
                return([...prev,room])
              }))
            })
            socket.on("created",(msg)=>{
                console.log(message)
            })
            socket.on("disconnect",()=>{
                console.log("disconecting")
                socket.close()
            })
            socket.on("created",(msg)=>{
                console.log(msg)
            })
            socket.on("new-user",(msg)=>{
                console.log(msg)
            })

          }
          initializer()
        setIsLoading(false)
        // return (()=>{
        //     console.log("heree")
        //     socket.close()})
    },[])
    const RoomList = rooms.map((item,key)=>{
        return(
            <li  key={key}><button onClick={()=>{
                joinChat(item)
            }} className='block w-full text-left py-4'>{item}</button></li>

        )
    })
    const MessageList = message.map((item,key)=>{
        return(
            <div className='py-4 ' key ={key}>
                <p>{item.text}</p>
                <p className='text-xs py-1'>{item.email}</p>
            </div>
        )
    })
  return (
    <Fragment>
    {!isLoading && <div className='w-full px-4 flex text-sm text-gray-900'>
        <div className='w-[350px]'>
            <ul className='py-2'>
                {RoomList}
            </ul>
            <div className='py-2'>
                <h1>Create/Join Room Room</h1>
                <div>
                    <input type="text" className='w-10/12 mx-auto px-2 py-2 outline-none border rounded-lg block bg-gray-50' value={input} onChange={(e)=>{setInput(e.target.value)}}/>
                    <button className='block mx-auto mt-2' onClick={submitHandler}>Submit</button>
                </div>
            </div>
        </div>
        <div className='w-full '>
            <h1 className='text-lg text-center font-semibold pt-2 pb-6'>Room1</h1>
            <div>
                {MessageList}
            </div>
        </div>
    </div>}
    </Fragment>

  )
}
