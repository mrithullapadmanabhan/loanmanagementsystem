import axios from 'axios'
const URL = 'http://localhost:8081'


export async function addUser(data: any) {
    try {
      const res = await axios.post(`${URL}/addEmployee`, {
        ...data,
      })
      setWithExpiry('user',res.data,1800000)
      return { success: true }
    } catch (error: any) {
      if (error.response) {
        return { success: false, error: error.response.data.error }
      } else {
        return {
          success: false,
          error: 'Error occurred while sending the request',
        }
      }
    }
  }


  
export async function login(data: any) {
  try {
    const res = await axios.post(`${URL}/checkLogin`, {
      ...data,
    })
    console.log("data="+data)
    console.log("res="+res)
    // if (res.data)
    if (data['value'] === "Invalid user"){
      alert("Invalid User")
    }
    setWithExpiry('user',res.data,18000)
    return { success: true }
  } catch (error: any) {
    if (error.response) {
      return { success: false, error: error.response.data.error }
    } else {
      return {
        success: false,
        error: 'Error occurred while sending the request',
      }
    }
  }
}

export function getUserByToken(){
  const storedUser= getWithExpiry('user')
  if(storedUser){
    return storedUser
  }
  else{
    return null
  }

}

function setWithExpiry(key: string,value: any,ttl: number){
  const now=new Date()
  const item={
    value: value,
    expiry: now.getTime()+ttl
  }
  window.sessionStorage.setItem(key,JSON.stringify(item))
}

function getWithExpiry(key: string){
  const itemStr=window.sessionStorage.getItem(key)
  console.log("user data",itemStr)
  if(!itemStr){
    return null
  }
  const item=JSON.parse(itemStr);
  const now=new Date()
  if(now.getTime()>item.expiry){
    window.sessionStorage.removeItem(key)
  }
  return item.value
}