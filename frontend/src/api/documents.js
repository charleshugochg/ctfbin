import axios from './gateway'
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

export const createDocument = async (fileName, text) => {
  const file = new File([text], fileName, { type: 'text/plain' })
  const formData = new FormData()
  formData.append('file', file)
  const config = {
    headers: {
      'content-type': 'multipart/form-data'
    },
    withCredentials: true
  }
  const res = await axios.post(endpoint, formData, config)
  return res.data
}

export const patchDocument = async (filename, hash, patchText) => {
  const url = `${endpoint}/${filename}`
  const formData = new FormData()
  formData.append('hash', hash)
  formData.append('patchText', new Blob([patchText], {type: 'text/plain'}))
  const config = {
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    withCredentials: true
  }
  const res = await axios.post(url, formData, config)
  return res.data
}

export const renameDocument = async (filename, newname) => {
  const url = `${endpoint}/${filename}`
  const formData = new FormData()
  formData.append('name', newname)
  const config = {
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    withCredentials: true
  }
  const res = await axios.put(url, formData, config)
  return res.data
}

export const deleteDocument = async (filename) => {
  const url = `${endpoint}/${filename}`
  const res = await axios.delete(url, {
    withCredentials: true
  })
  return res.data
}