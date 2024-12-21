import { Button, Col, Flex, Row } from "antd";
import excuteCode from "./Api";
import { useState, useEffect } from "react";

function Output({ code, langage }) {
  const [output, setOutput] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const runCode = async () => {
      if (!code || !langage) return;

      setError(null);
      setOutput("Running...");
      setOutput("")

      try {
        const result = await excuteCode(code, langage);
        console.log("Execution result:", result);

        console.log(result.run.output);

        if (result.run.output) {
          setOutput(result.run.output); // Display output
        } else if (result.run.stderr) {
          setOutput(`Error: ${result.run.stderr}`); // Display error
        } else {
          setOutput("No output received.");
        }
      } catch (err) {
        console.error("Execution error:", err);
        setError("An error occurred while executing the code.");
      }
    };

    runCode();
    setOutput("")
  }, [code, langage]); // Re-run when `code` or `langage` changes

  const ConsoleClear = () =>{

    
    setOutput("")


  }

  return (
    <>
    <Flex style={{marginLeft:"50px" ,width:"600px"}} gap="middle">

      <Flex style={{}}>
      <div style={{ padding: "",width:"20px", backgroundColor: "#1c2130", color: "white" }}>
      <h3 style={{marginLeft:"70px"}}>Output:</h3>
      <div style={{marginLeft:"60px", marginTop:"30px", maxWidth:"100px"}}>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {output && <pre style={{ color: "#00ff00" }}>{output}</pre>}
      </div>
     
    </div>
    </Flex>

    <Flex style={{marginLeft:"500px"}}>

    <Button type="primary" onClick={ConsoleClear}>clear</Button>
    
    
    
    </Flex>
   


    </Flex>
   
    
    
    </>
    
  );
}

export default Output;
