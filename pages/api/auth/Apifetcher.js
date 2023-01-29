export const  fetcher = async (email,password)=>{
    const res = await fetch("http://127.0.0.1:8000/auth/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email,password }),

    });
    const status = res.status
    if (status === 200){
        const data = await res.json()
        return data
    }
    else{
        return {error:"password does not match"}
    }

      
  }

export const datafetcher = async(token)=>{
  const res = await fetch("http://127.0.0.1:8000/auth/api/refresh",{
    method:"POST",
    headers:{
      "Content-Type": "application/json", 
    },
    body:JSON.stringify({refresh:token})
  })
  if (res.status === 200){
    const data = await res.json()
    return data
  }
  else{
    return {error:"Token not valid"}
  }

}