import AceEditor from 'react-ace'

import "ace-builds/src-noconflict/theme-dracula"
import "ace-builds/src-noconflict/mode-javascript"

const Editor = props => {
  return (
    <AceEditor
      mode="javascript"
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
    />
  )
}

export default Editor