import { Button, Flex } from "antd";
import { useState, useEffect } from "react";
import excuteCode from "./Api";
import React from "react";

// Define the types for the props
interface OutputProps {
  className?: string;  // Allowing className as optional
  code: string;
  langage: string;
}

const Output: React.FC<OutputProps> = ({ className, code, langage }) => {
  const [output, setOutput] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const runCode = async () => {
      if (!code || !langage) return;

      setError(null);
      setOutput("Running...");
      setOutput("");

      try {
        const result = await excuteCode(code, langage);
        console.log("Execution result:", result);

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
    setOutput("");
  }, [code, langage]); // Re-run when `code` or `langage` changes

  const ConsoleClear = () => {
    setOutput("");
  };

  return (
    <>
      <Flex className={className} style={{ marginLeft: "50px", width: "600px" }} gap="middle">
        <Flex>
          <div
            style={{
              padding: "",
              width: "20px",
              backgroundColor: "#1c2130",
              color: "white",
            }}
          >
            <h3 style={{ marginLeft: "70px" }}>Output:</h3>
            <div style={{ marginLeft: "60px", marginTop: "30px", maxWidth: "100px" }}>
              {error && <p style={{ color: "red" }}>{error}</p>}
              {output && <pre style={{ color: "#00ff00" }}>{output}</pre>}
            </div>
          </div>
        </Flex>

        <Flex style={{ marginLeft: "500px" }}>
          <Button type="primary" onClick={ConsoleClear}>
            Clear
          </Button>
        </Flex>
      </Flex>
    </>
  );
};

export default Output;
