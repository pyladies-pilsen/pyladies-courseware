import React from 'react'
import { UnControlled as CodeMirror } from 'react-codemirror2'

const inBrowser = typeof window !== 'undefined' && window.navigator;
if (inBrowser) {
  require('codemirror/mode/xml/xml');
  require('codemirror/mode/javascript/javascript');
  require('codemirror/mode/python/python');
}

const codeEditorStyle = {
  fontSize: 13,
};

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showEditor: false,
    };
  }

  componentDidMount() {
    this.setState({ showEditor: true });
  }

  render() {
    return (
      <div className='CodeEditor' style={codeEditorStyle}>

        {!this.state.showEditor ? (
          <pre>{this.props.value}</pre>
        ) : (
          <CodeMirror
            value={this.props.value}
            options={{
              mode: 'python',
              theme: 'neo',
              lineNumbers: true,
              lineWrapping: true,
              autoFocus: true,
              viewportMargin: Infinity,
              scrollbarStyle: 'null',
            }}
            onSet={(editor, value) => {
              console.log('set', {value});
            }}
            onChange={(editor, metadata, value) => {
              console.log('change', {value});
            }}
          />
        )}

      </div>
    );
  }

}
