import { useEffect, useState } from 'react';

const snippets = [
  `function greet() {
  console.log("Hello, World!");
}`,
  `const sum = (a, b) => {
  return a + b;
}`,
  `class Developer {
  code() {
    return "Building the future";
  }
}`
];

export const CodeSnippet = () => {
  const [currentSnippet, setCurrentSnippet] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSnippet((prev) => (prev + 1) % snippets.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="floating bg-slate-800 rounded-lg p-4 shadow-xl">
      <pre className="text-sm md:text-base font-sourceCode text-white">
        <code>{snippets[currentSnippet]}</code>
      </pre>
    </div>
  );
};