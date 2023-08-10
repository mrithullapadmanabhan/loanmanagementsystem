import axios from 'axios'
const URL = 'http://localhost:8081'


export async function addUser(data: any) {
    try {
      const res = await axios.post(`${URL}/addEmployee`, {
        ...data,
      })
      const token = res.data.token
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


