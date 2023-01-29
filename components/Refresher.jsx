import React, { useEffect, useState } from 'react'
import { getSession,signIn } from 'next-auth/react'
import {authActions} from "../store/auth"
import { useSelector,useDispatch } from 'react-redux'

export default function Refresher({setisloading}) {
  const {sessionloading} = useSelector((state=>state.auth))
  const [count,setCount] = useState(0)
  console.log(sessionloading)
  const dispatch = useDispatch()
  useEffect(()=>{
    console.log(count)
    const dataf = async()=>{
      console.log("refresher here")
      let timer;
      const session = await getSession()
      if (!session){
        console.log("Unauthenticated") 
        setisloading(false)
        dispatch(authActions.setSession(false))
        clearTimeout(timer)
        return
      }
      const currentTime = Math.floor(Date.now()/1000)
      const expired = session.user.email.info.exp
      const timeDif = expired-currentTime
      console.log(timeDif)
      const refresher = async ()=>{
        console.log("Calleddd")
        const response = await signIn("credentials",{
          redirect:false,refresh:session.user.email.refresh
      })
      console.log(response)
      }
      if (timeDif < 0){
        console.log("after")
        await refresher()
        setCount((prev=>prev+1))
      }
      else{
        timer = setTimeout(async ()=>{
          console.log("before")
          await refresher()
          setCount((prev=>prev+1))
        },(timeDif -10)*1000)
      }
      console.log(session)
      setisloading(false)
      authActions.setSession(false)
    }
    dataf()
  },[sessionloading,count])
  return null
}
