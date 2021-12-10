import { useEffect } from 'react'
import { Outlet, useParams, useNavigate } from 'react-router-dom'
import classes from './screendocuments.module.css'

import Directory from '../../components/Directory/Directory'
import Editor from '../../components/Editor/Editor'
import LinkMatch from '../../components/LinkMatch/LinkMatch'

import { useDocument, useStatus } from '../../contexts/DocumentContextV2'
import Exception, { FILE_NOT_FOUND } from '../../exceptions'
import { useNotification } from '../../contexts/NotificationContext'

export const Layout = (props) => {
  const status = useStatus()
  return (
    <div className={classes.container}>
      <Directory>
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
        if (!doc.text)
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

  if (!doc.text) {
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