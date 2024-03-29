import axios from './gateway'
import config from '../config'

const { BASE_API_URL } = config

const endpoint = `${BASE_API_URL}/auth`

export const check = async () => {
  const url = `${endpoint}/protected`
  await axios.get(url, {
    withCredentials: true
  })
}

export const login = async (password) => {
  const url = `${endpoint}/login`
  await axios.post(url, {
    password
  })
}