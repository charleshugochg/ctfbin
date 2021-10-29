import { useEffect, useState, useCallback, useRef } from 'react'
import { getDocuments, getDocument, postDocument } from '../api/documents'

export const useDocuments = () => {
  const [documents, setDocuments] = useState([])
  const [currentIndex, setCurrentIndex] = useState(null)
  const [dirty, setDirty] = useState(false)
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const textOrig = useRef('')

  const loadDocument = useCallback(async (index) => {
    try {
      const fileName = documents[index]
      const res = await getDocument(fileName)
      setText(res)
      textOrig.current = res
    } catch (err) {
      console.error(err)
      //TODO: handle error
    } finally {
      setLoading(false)
    }
  }, [documents])

  const fetchDocuments = async () => {
    try {
      const res = await getDocuments()
      setDocuments(res)
    } catch (err) {
      console.error(err)
    }
  }

  const saveDocument = async () => {
    if (dirty) {
      try {
        const fileName = documents[currentIndex]
        await postDocument(fileName, text)
      } catch (err) {
        console.error(err)
        //TODO: handle error
      }
    }
  }

  const changeDocument = (index) => {
    setCurrentIndex(index)
    loadDocument(index)
  }

  useEffect(() => {
    fetchDocuments()
  }, [])

  useEffect(() => {
    setDirty(textOrig.current !== text)
  }, [text])

  return {
    documents,
    currentIndex,
    text,
    loading,
    dirty,
    setText,
    changeDocument,
    saveDocument,
  }
}