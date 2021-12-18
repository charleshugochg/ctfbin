import axios from 'axios'
import Exception, { BAD_REQUEST, CONTENT_OUT_OF_DATE, FILE_NOT_FOUND, FORBIDDEN, SERVER_ERROR, UNAUTHORIZED } from '../exceptions'

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

export default axios