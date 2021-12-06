import axios from 'axios'
import config from '../config'
import Exception, { BAD_REQUEST, CONTENT_OUT_OF_DATE, FILE_NOT_FOUND, FORBIDDEN, SERVER_ERROR, UNAUTHORIZED } from '../exceptions'

const { BASE_API_URL } = config

const endpoint = `${BASE_API_URL}/documents`

axios.interceptors.response.use(function (res) { return res }, function (error) {
  if (error.response) {
    let code
    switch (error.response.status) {
      case 400: {
        if (error.response.data.includes('update'))
          code = CONTENT_OUT_OF_DATE
        else
          code = BAD_REQUEST
        break;
      }
      case 401: {
        code = UNAUTHORIZED
        break
      }
      case 403: {
        code = FORBIDDEN
        break
      }
      case 404: {
        code = FILE_NOT_FOUND
        break
      }
      case 500: {
        code = SERVER_ERROR
        break
      }
    }
    return Promise.reject(new Exception(code, error.response.data))
  }
  return Promise.reject(error)
})

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
      'content-type': 'application/x-www-form-urlencoded'
    },
    withCredentials: true
  }
  const res = await axios.post(url, formData, config)
  return res.data
}