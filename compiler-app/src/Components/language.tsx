// Define the type for each language's code snippet
export interface CodeSnippets {
  javascript: string;
  typescript: string;
  python: string;
  java: string;
  csharp: string;
  php: string;
}

// Code Snippets for Different Languages
export const CODE_SNIPPETS: CodeSnippets = {
  javascript: `
function greet(name) {
  console.log("Hello, " + name + "!");
}

greet("Alex");
`,

  typescript: `
type Params = {
  name: string;
};

function greet(data: Params): void {
  console.log("Hello");
}

greet({ name: "Alex" });
`,

  python: `
def greet(name):
    print("Hello, " + name + "!")

greet("Alex")
`,

  java: `
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}
`,

  csharp: `
using System;

namespace HelloWorld {
    class Hello { 
        static void Main(string[] args) {
            Console.WriteLine("Hello World in C#");
        }
    }
}
`,

  php: `
<?php
$name = 'Alex'; 
echo "Hello, " . $name . "!";
?>
`
};

export interface LanguageVersions {
  [key: string]: string; // Allows indexing with a string, but the values must be strings
}

const language: LanguageVersions = {
  javascript: "18.15.0",
  typescript: "5.0.3",
  python: "3.10.0",
  java: "15.0.2",
  csharp: "6.12.0",
  php: "8.2.3",
};

export default language;