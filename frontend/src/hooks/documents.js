import { useEffect, useState, useCallback } from 'react'
import { getDocuments, getDocument, postDocument } from '../api/documents'

export const useDocuments = () => {
  const [documents, setDocuments] = useState([])

  const loadText = useCallback(async doc => {
    const data = await getDocument(doc.name)
    const newDocuments = documents.map(d => d === doc ? ({
      ...doc,
      remoteText: data,
      text: data
    }) : d)
    setDocuments(newDocuments)
  }, [documents])

  const getText = doc => {
    if (doc.remoteText === null)
      loadText(doc)
    return doc.text
  }

  const setText = useCallback(async (doc, text) => {
    const newDocuments = documents.map(d => d === doc ? ({
      ...doc,
      dirty: d.remoteText !== text,
      text
    }) : d)
    setDocuments(newDocuments)
  }, [documents])

  const save = useCallback(async doc => {
    await postDocument(doc.name, doc.text)
  }, [])

  const initDocuments = async () => {
    const res = await getDocuments()
    const newDocuments = res.map(name => ({
      name,
      dirty: false,
      text: null,
      remoteText: null
    }))
    setDocuments(newDocuments)
  }

  useEffect(() => {
    initDocuments()
  }, [])

  return documents.map(({ name, dirty, text })=> {
    const doc = documents.find(d => d.name === name)
    return {
      name,
      dirty,
      text,
      getText: () => getText(doc),
      setText: (text) => setText(doc, text),
      save: () => save(doc)
    }
  })
}