import { Editor } from "@monaco-editor/react";
import { Layout, Select, Button, Row, Col } from "antd";
import { useRef, useState } from "react";
import { CODE_SNIPPETS } from "./language";
import "../Components/Codeediter.css";
import Output from "./output";

const { Header } = Layout;

const codeSnip = Object.entries(CODE_SNIPPETS);

function CodeEditor({ langage, setLangage, code, setCode }) {
  const [editorValue, setEditorValue] = useState(CODE_SNIPPETS.python); 
  const editorRef = useRef(null);

  const [loading,setLoading] =  useState(false)

  
  const handleChange = (value) => {
    setLangage(value);
    setEditorValue(CODE_SNIPPETS[value]); 
  };

  // Handle editor content change
  const handleEditorChange = (value) => {
    setEditorValue(value); 
  };

  // Mount the editor
  const handleEditorMount = (editor) => {
    editorRef.current = editor;
  };

  // Run the code
  const CodeRun = () => {
    setCode(editorValue); 
    // console.log("Code passed to Output:", editorValue);
    setLoading(true)
    setTimeout(()=>{

      setLoading(false)

    },3000)

   
   
    // setCode(editorValue)

    // setCode(editorValue)

  };

  // Header style
  const HeaderStyle = {
    color: "white",
    textAlign: "center",
    fontSize: "24px",
    backgroundColor: "#1c2130",
    padding: "10px",
  };

  return (
    <>
      <Row style={{maxWidth:"1000px"}}>
        <Col span={6} style={{ backgroundColor: "#1c2130", padding: "20px" }}>
          <Header style={HeaderStyle}>Code Editor</Header>
          <Select
            style={{
              width: "100%",
              marginTop: "20px",
              backgroundColor: "gray",
              height: "50px",
            }}
            onChange={handleChange}
            defaultValue="javascript"
            options={codeSnip.map(([key]) => ({ value: key, label: key }))}
          />
          <Button
  type="primary"
  style={{
    marginTop: "20px",
    width: "100%",
    height: "50px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }}
  onClick={CodeRun}
  loading={loading}
  block
>
  {loading ? "Running..." : "Run Code"}
</Button>

        </Col>
        <Col span={18}>
          <Editor
            height="100vh"
            width="700px"
            language={langage}
            theme="vs-dark"
            defaultLanguage="javascript"
            value={editorValue} // Bind the editor content
            onChange={handleEditorChange}
            onMount={handleEditorMount}
          />
        </Col>
    
      </Row>
      <Output className="outputbox" code={code} langage={langage}></Output>
    </>
  );
}

export default CodeEditor;
