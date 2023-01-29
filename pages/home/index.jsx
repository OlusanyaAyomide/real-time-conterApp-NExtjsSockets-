import React, { useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import {setcount,reducecount} from "../../store/counterSlice"
import {signIn,useSession,getSession, signOut} from "next-auth/react"
import { authActions } from '@/store/auth'

export default function index() {
    const dispatch = useDispatch()
    const {count} = useSelector((state=>state.counter))
    const {sessionloading} = useSelector((state=>state.auth))
    const [email,setEmail] = useState("")
    const [password,setpassword] = useState("")
    const {data:sessionn} = useSession()
    console.log(sessionloading)
    console.log("hereee")

    const handler = async (e)=>{
        e.preventDefault()
        const response = await signIn("credentials",{
            redirect:false,email,password
        })
        console.log(response)
        if (response.error){
            console.log("Errorrr")
        }
        else{
            dispatch(authActions.setSession(true))
        }
        
    }
  return (
    <div>
        <div>
        <div className='h-[50px] flex items-center justify-center font-extrabold text-2xl'> 
            {count}    
        </div>
        </div>
        <div>
        <button className="border mx-2" onClick={()=>{
        dispatch(setcount())
      }}>Add Number</button>
        <button className="border mx-2" onClick={()=>{dispatch(reducecount())}}>Reduce Number</button>
        </div>
        <div className='mt-4'>
            <form className='py-y  w-11/12 md:w-8/12 mx-auto lg:w-7/12 rounded-lg bg-slate-50 text-sm t px-4' onSubmit={handler}>
                <div className='flex py-2'>
                    <label htmlFor="email" className='w-3/12 '>Email</label>
                    <input type="email" id="email" className='rounded-lg w-9/12 outline-none border px-2 py-1 text-gray-800 ' value={email} onChange={(e)=>setEmail(e.target.value)} />
                </div>
                <div className='flex py-2'>
                    <label htmlFor="password" className='w-3/12 '>Password</label>
                    <input type="password" id="password" className='w-9/12 rounded-lg outline-none border px-2 py-1 text-gray-800 ' value={password} onChange={(e)=>{setpassword(e.target.value)}} />
                </div>
                <button className='block mx-auto px-2 py-1 rounded-lg border'>Submit</button>
            </form>
        </div>
        {  sessionn &&  <button onClick = {()=>{signOut()}}>Sign Out</button>}

        
    </div>
  )
}

// export async function getServerSideProps(context){
//     const session = await getSession({req:context.req})
//     console.log(session)
//     return ({
//         props:{
//             session
//         }
//     })

// }
