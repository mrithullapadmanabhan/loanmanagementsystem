import axios from 'axios'
const URL = 'http://localhost:8081'


export async function addUser(data: any) {
    try {
      const res = await axios.post(`${URL}/addUser`, {
        ...data,
      })
      saveToSession('user',res.data)
      return { success: true }
    } catch (error: any) {
      if (error.response) {
        return { success: false, message: error.response.data.error }
      } else {
        return {
          success: false,
          message: 'Error occurred while sending the request',
        }
      }
    }
  }


  
export async function login(data: any) {
  try {
    const res = await axios.post(`${URL}/checkLogin`, {
      ...data,
    })
    console.log(res.data)
    if(res.data.success === true){
      saveToSession('user',res.data.user)
    }
    return res.data
  } catch (error: any) {
    if (error.response) {
      return { success: false, message: error.response.data.error }
    } else {
      return {
        success: false,
        message: 'Error occurred while sending the request',
      }
    }
  }
}

export async function getItemsApi(){
  try {
    const res = await axios.get(`${URL}/getAllItems`)
    console.log(res.data)
    return {success: true,data: res.data}
  } catch (error: any) {
    if (error.response) {
      return { success: false, message: error.response.data.error }
    } else {
      return {
        success: false,
        message: 'Error occurred while getting the request',
      }
    }
  }

}

export function getUserByToken(){
  const storedUser= getFromSession('user')
  if(storedUser){
    return storedUser
  }
  else{
    return null
  }

}

function saveToSession(key: string,value: any){
  window.sessionStorage.setItem(key,JSON.stringify(value))
}

function getFromSession(key: string){
  const itemStr=window.sessionStorage.getItem(key)
  console.log("user data",itemStr)
  if(!itemStr){
    return null
  }
  const item=JSON.parse(itemStr);
  return item
}