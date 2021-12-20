import { useEffect } from 'react'
import { Outlet, useParams, useNavigate } from 'react-router-dom'
import classes from './editorscreen.module.css'

import Directory from '../../components/Directory/Directory'
import Editor from '../../components/Editor/Editor'
import LinkMatch from '../../components/LinkMatch/LinkMatch'

import MenuButton from '../../components/MenuButton/MenuButton'

import PlusIcon from '../../icons/PlusIcon'

import { useDocument, useStatus } from '../../contexts/DocumentContext'
import Exception, { FILE_NOT_FOUND } from '../../exceptions'
import { useNotification } from '../../contexts/NotificationContext'

export const Layout = (props) => {
  const status = useStatus()
  const [_, actions] = useDocument('')

  const handleCreate = async () => {
    const filename = prompt('Enter file name')
    const text = prompt('Enter text')
    try {
      await actions.createDocument(filename, text)
    } catch (err) {
      console.error(err)
    }
  }
  
  return (
    <div className={classes.container}>
      <Directory actions={
        <MenuButton
          style={{
            marginTop: "auto",
            marginBottom: 0,
            alignSelf: "center"
          }}
          onClick={handleCreate}
          label={"Create New File"} 
          iconcomponent={PlusIcon}
          data-variant="secondary"/>
      }>
        {Object.entries(status).map(([name, dirty]) =>
          <LinkMatch key={name} to={`/edit/${name}`}>
            {match =>
              <Directory.Item 
                label={name} 
                active={!!match}
                dirty={dirty} />
            }
          </LinkMatch>
        )}
      </Directory>
      <div className={classes['editor-container']}>
        <Outlet />
      </div>
    </div>
  )
}

export const EditorWrapper = (props) => {
  const { name } = useParams()
  const navigate = useNavigate()
  const [_, notificationActions] = useNotification()
  const [doc, documentActions] = useDocument(name)

  useEffect(() => {
    (async function () {
      try {
        if (doc.remoteText === null)
          await documentActions.fetchDocument(name)
      } catch (err) {
        if (err instanceof Exception) {
          if (err.code === FILE_NOT_FOUND)
            navigate("/")
          notificationActions.notify(err.message, true) 
        } else throw err
      }
    })()
  }, [name, doc])

  if (doc.remoteText === null) {
    return <Placeholder>Loading...</Placeholder>
  }

  return (
    <Editor name={name} text={doc.text} onChange={(text) => documentActions.setText(name, text)} />
  )
}

export const Placeholder = ({ children }) => {
  return (
    <h2 className={classes['editor-placeholder']}>{children}</h2>
  )
}

export default {
  Layout,
  EditorWrapper,
  Placeholder
}