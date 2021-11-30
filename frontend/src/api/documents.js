import axios from 'axios'
import config from '../config'

const { BASE_API_URL } = config

const endpoint = `${BASE_API_URL}/documents`

export const getDocuments = async () => {
  const res = await axios.get(endpoint)
  return res.data
}

export const getDocument = async (fileName) => {
  const url = `${endpoint}/${fileName}`
  const res = await axios.get(url)
  return res.data
}

export const postDocument = async (fileName, text) => {
  const formData = new FormData()
  formData.append('file', text, fileName)
  const config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  }
  const res = await axios.post(endpoint, formData, config)
  return res.data
}

export const patchDocument = async (filename, hash, patchText) => {
  const url = `${endpoint}/${filename}`
  const formData = new FormData()
  formData.append('hash', hash)
  formData.append('patchText', patchText)
  const config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  }
  const res = await axios.post(url, formData, config)
  return res.data
}