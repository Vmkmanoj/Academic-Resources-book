
import {Flex} from "antd"; 

import Codeediter from "./Components/Codeediter";

import "../src/App.css"

import Output from "./Components/output";
import { useState } from "react";

export const App=()=> {

  const [langage,setLangage] = useState("javascript");

  const[code,setCode] = useState("")

  // console.log(code)
  // console.log(langage)





  return (
    <>

   <Flex gap="middle" className="fullbox">

        <Codeediter langage={langage} setLangage={setLangage} code={code} setCode={setCode}></Codeediter>
        {/* <Output className="outputbox"  code={code} langage={langage}></Output> */}
   
   </Flex>




    </>
  )
}

