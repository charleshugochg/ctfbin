export const BAD_REQUEST = 'BAD_REQUEST'
export const UNAUTHORIZED = 'UNAUTHORIZED'
export const FORBIDDEN = 'FORBIDDEN'
export const FILE_NOT_FOUND = 'FILE_NOT_FOUND'
export const CONTENT_OUT_OF_DATE = 'CONTENT_OUT_OF_DATE'
export const SERVER_ERROR = 'SERVER_ERROR'

export function Exception (code, message) {
  this.code = code
  this.message = message
  this.name = 'Custom Exception'
}

Exception.prototype.toString = function () {
  return `${this.code}: "${this.message}"`
}

export default Exception