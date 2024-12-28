import { useState } from "react";
import { Flex } from "antd";
// import Output from "./Components/output"; // Uncomment when needed
import React from "react";
import { CodeEditor } from "./Components/CodeEditer";

export const CompilerApp = () => {
  const [langage, setLangage] = useState("javascript");
  const [code, setCode] = useState("");
  console.log("hello world");

  return (
    <Flex gap="middle" className="fullbox">
      <CodeEditor
        langage={langage}
        setLangage={setLangage}
        code={code}
        setCode={setCode}
      />
      {/* <Output className="outputbox" code={code} langage={langage} /> */}
    </Flex>
  );
};
