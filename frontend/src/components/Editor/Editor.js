import AceEditor from 'react-ace'
import classes from './editor.module.css'

import "ace-builds/webpack-resolver"
import "ace-builds/src-noconflict/theme-dracula"
import "ace-builds/src-noconflict/mode-javascript"

import modelist from "ace-builds/src-noconflict/ext-modelist"

const Editor = props => {
  const { name, text, onChange } = props
  const mode = name && modelist.getModeForPath(name)

  return (
    <div className={classes.container}>
      {name ?
        <AceEditor
          value={text}
          onChange={onChange}
          mode={mode && mode.name}
          theme="dracula"
          name="aceeidtor"
          editorProps={{ $blockScrolling: true }}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true
          }}
          width="100%"
          height="100%"
        /> :
        <h2 className={classes.placeholder}>Open a file to edit</h2>
      }
  </div>
  )
}

export default Editor