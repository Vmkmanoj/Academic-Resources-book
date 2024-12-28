import { Editor, OnMount } from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import { Layout, Select, Button, Row, Col } from "antd";
import { useRef, useState } from "react";
import { CODE_SNIPPETS, CodeSnippets } from "./language";
import Output from "./output";
import React from "react";

const { Header } = Layout;

interface CodeEditorProps {
  langage: string;
  setLangage: (value: string) => void;
  code: string;
  setCode: (value: string) => void;
}
console.log("hello");

const codeSnip = Object.entries(CODE_SNIPPETS);

export const CodeEditor: React.FC<CodeEditorProps> = ({ langage, setLangage, code, setCode }) => {
  const [editorValue, setEditorValue] = useState<string>(CODE_SNIPPETS.python);
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Handle language change
  const handleLanguageChange = (value: keyof CodeSnippets) => {
    setLangage(value);
    setEditorValue(CODE_SNIPPETS[value]); // Type-safe
  };

  // Handle editor content change
  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setEditorValue(value);
    }
  };

  // Mount the editor
  const handleEditorMount: OnMount = (editor) => {
    editorRef.current = editor;
  };

  // Run the code
  const CodeRun = () => {
    setCode(editorValue);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  // Header style
  const HeaderStyle: React.CSSProperties = {
    color: "white",
    textAlign: "center",
    fontSize: "24px",
    backgroundColor: "#1c2130",
    padding: "10px",
  };

  return (
    <>
      <Row style={{ maxWidth: "1000px" }}>
        <Col span={6} style={{ backgroundColor: "#1c2130", padding: "20px" }}>
          <Header style={HeaderStyle}>Code Editor</Header>
          <Select
            style={{
              width: "100%",
              marginTop: "20px",
              backgroundColor: "gray",
              height: "50px",
            }}
            onChange={handleLanguageChange}
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
};

