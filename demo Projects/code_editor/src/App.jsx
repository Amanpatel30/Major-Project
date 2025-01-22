import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import Editor from './components/Editor';
import { debounce } from 'lodash';

function App() {
  const defaultHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Code Editor</title>
</head>
<body>
    <!-- Write your HTML here -->
    <h1>Welcome to Code Editor</h1>
    
</body>
</html>`;


  const defaultCSS = `/* Write your CSS here */
body {
    margin: 0;
    padding: 20px;
    font-family: Arial, sans-serif;
}

h1 {
    color: #333;
    text-align: center;
}`;

  const defaultJS = `// Write your JavaScript here
document.addEventListener('DOMContentLoaded', () => {
    // Your code here
    
});`;

  const [html, setHtml] = useState(defaultHTML);
  const [css, setCss] = useState(defaultCSS);
  const [js, setJs] = useState(defaultJS);

  const [activeTab, setActiveTab] = useState('html');
  const [theme, setTheme] = useState('dark');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Function to find line and column number from code and error position
  const findErrorLocation = (code, errorPos) => {
    if (!errorPos) return { line: 1, column: 1 };
    const lines = code.split('\n');
    let currentPos = 0;
    
    for (let i = 0; i < lines.length; i++) {
      const lineLength = lines[i].length + 1; // +1 for newline
      if (currentPos + lineLength > errorPos) {
        return {
          line: i + 1,
          column: errorPos - currentPos + 1
        };
      }
      currentPos += lineLength;
    }
    return { line: lines.length, column: lines[lines.length - 1].length + 1 };
  };

  // Check for errors in code
  const checkCode = useCallback((code, language) => {
    try {
      if (language === 'html') {
        const parser = new DOMParser();
        const doc = parser.parseFromString(code, 'text/html');
        const parseErrors = doc.getElementsByTagName('parsererror');
        
        if (parseErrors.length > 0) {
          // Find the line where the error occurs
          const lines = code.split('\n');
          let errorLine = 1;
          let errorMsg = parseErrors[0].textContent;
          
          // Try to extract line number from error message
          const lineMatch = errorMsg.match(/line (\d+)/i);
          if (lineMatch) {
            errorLine = parseInt(lineMatch[1]);
          } else {
            // Scan through the code to find potential error location
            for (let i = 0; i < lines.length; i++) {
              if (lines[i].includes('>') && !lines[i].match(/<[^>]+>/)) {
                errorLine = i + 1;
                break;
              }
            }
          }
          
          throw new Error(`HTML Parse Error at line ${errorLine}:\n${errorMsg}`);
        }

        // Check for unclosed and mismatched tags
        const lines = code.split('\n');
        const openTags = [];
        const selfClosingTags = ['img', 'br', 'hr', 'input', 'meta', 'link'];
        
        for (let lineNum = 0; lineNum < lines.length; lineNum++) {
          const line = lines[lineNum];
          let pos = 0;
          const tagPattern = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi;
          let match;
          
          while ((match = tagPattern.exec(line)) !== null) {
            const tagName = match[1].toLowerCase();
            const fullTag = match[0];
            const column = match.index + 1;
            
            if (!fullTag.includes('/>') && !selfClosingTags.includes(tagName)) {
              if (fullTag.startsWith('</')) {
                const lastOpenTag = openTags.pop();
                if (!lastOpenTag) {
                  throw new Error(`Extra closing tag </${tagName}> at line ${lineNum + 1}, column ${column}`);
                }
                if (lastOpenTag.name !== tagName) {
                  throw new Error(
                    `Mismatched tags: <${lastOpenTag.name}> (opened at line ${lastOpenTag.line}, column ${lastOpenTag.column}) ` +
                    `is closed by </${tagName}> at line ${lineNum + 1}, column ${column}`
                  );
                }
              } else {
                openTags.push({
                  name: tagName,
                  line: lineNum + 1,
                  column: column
                });
              }
            }
          }
        }
        
        if (openTags.length > 0) {
          const unclosedTags = openTags.map(tag => 
            `<${tag.name}> at line ${tag.line}, column ${tag.column}`
          ).join('\n');
          throw new Error(`Unclosed tags found:\n${unclosedTags}`);
        }

      } else if (language === 'css') {
        const lines = code.split('\n');
        let openBraces = 0;
        let lastOpenBrace = { line: 0, column: 0 };
        
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          let inComment = false;
          let inString = false;
          let stringChar = '';
          
          for (let j = 0; j < line.length; j++) {
            const char = line[j];
            const nextChar = line[j + 1];
            
            // Handle comments and strings
            if (!inComment && !inString) {
              if (char === '/' && nextChar === '*') {
                inComment = true;
                j++;
                continue;
              }
              if (char === '"' || char === "'") {
                inString = true;
                stringChar = char;
                continue;
              }
            } else if (inComment && char === '*' && nextChar === '/') {
              inComment = false;
              j++;
              continue;
            } else if (inString && char === stringChar && line[j - 1] !== '\\') {
              inString = false;
              continue;
            }
            
            // Skip if in comment or string
            if (inComment || inString) continue;
            
            // Check braces
            if (char === '{') {
              openBraces++;
              lastOpenBrace = { line: i + 1, column: j + 1 };
            } else if (char === '}') {
              openBraces--;
              if (openBraces < 0) {
                throw new Error(`Extra closing brace '}' at line ${i + 1}, column ${j + 1}`);
              }
            }
            
            // Check for missing semicolons
            if (char === ':') {
              let k = j + 1;
              let foundSemicolon = false;
              let foundCloseBrace = false;
              
              while (k < line.length) {
                if (line[k] === ';') {
                  foundSemicolon = true;
                  break;
                }
                if (line[k] === '}') {
                  foundCloseBrace = true;
                  break;
                }
                k++;
              }
              
              if (!foundSemicolon && !foundCloseBrace) {
                throw new Error(`Missing semicolon at line ${i + 1}, column ${k + 1}`);
              }
            }
          }
        }
        
        if (openBraces > 0) {
          throw new Error(
            `Unclosed CSS block starting at line ${lastOpenBrace.line}, column ${lastOpenBrace.column}.\n` +
            `Missing ${openBraces} closing brace(s)`
          );
        }

        } else if (language === 'js') {
          try {
          new Function(code);
          } catch (error) {
          return `JavaScript Error: ${error.message}`;
          }

      }
      return null;
    } catch (err) {
      return err.message;
    }
  }, []);

  // Helper function to get code context around error
  const getCodeContext = (code, errorLine, contextLines = 2) => {
    const lines = code.split('\n');
    const start = Math.max(0, errorLine - contextLines - 1);
    const end = Math.min(lines.length, errorLine + contextLines);
    
    return lines
      .slice(start, end)
      .map((line, i) => {
        const lineNumber = start + i + 1;
        const marker = lineNumber === errorLine ? '> ' : '  ';
        return `${marker}${lineNumber}: ${line}`;
      })
      .join('\n');
  };

  // Update preview with error handling
  const updatePreview = useCallback(
    debounce(() => {
      setIsLoading(true);
      try {
        const htmlError = checkCode(html, 'html');
        const cssError = checkCode(css, 'css');
        const jsError = checkCode(js, 'js');
        
        const error = htmlError || cssError || jsError;
        
        if (error) {
          const iframe = document.querySelector('iframe');
          if (iframe) {
            iframe.srcdoc = `
              <html>
                <head>
                  <style>
                    body {
                      font-family: Arial, sans-serif;
                      padding: 20px;
                      margin: 0;
                      height: 100vh;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      background: #fef2f2;
                      color: #ef4444;
                    }
                    .error {
                      background: white;
                      padding: 20px 30px;
                      border-radius: 8px;
                      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                      border: 1px solid #fecaca;
                      text-align: left;
                      max-width: 90%;
                      font-family: 'Consolas', 'Monaco', monospace;
                    }
                    .error-icon {
                      font-size: 28px;
                      margin-bottom: 15px;
                      text-align: center;
                    }
                    .error-message {
                      font-size: 14px;
                      line-height: 1.6;
                      white-space: pre-wrap;
                    }
                  </style>
                </head>
                <body>
                  <div class="error">
                    <div class="error-icon">⚠️</div>
                    <div class="error-message">${error}</div>
                  </div>
                </body>
              </html>
            `;
          }
          setIsLoading(false);
          return;
        }

        const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
        const bodyContent = bodyMatch ? bodyMatch[1] : html;

        const outputDoc = `
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <style>${css}</style>
            </head>
            <body>
              ${bodyContent}
              <script>${js}</script>
            </body>
          </html>
        `;

        const iframe = document.querySelector('iframe');
        if (iframe) {
          iframe.srcdoc = outputDoc;
        }
      } catch (error) {
        console.error('Preview generation error:', error);
        setError('Failed to generate preview');
      } finally {
        setIsLoading(false);
      }
    }, 1000),
    [html, css, js, checkCode]
  );


      useEffect(() => {
      updatePreview();
      }, [html, css, js, updatePreview]);

      const toggleTheme = () => {
      const newTheme = theme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
      document.documentElement.setAttribute('data-theme', newTheme);
      };

        return (
          <div className={`app ${theme}`}>
            <nav className="navbar">
              <div className="logo">Code Editor</div>
              <button
                className="theme-btn"
                onClick={toggleTheme}
              >
                {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
              </button>
            </nav>

            <div className="main-container">
              <div className="editor-section">
                <div className="button-container">
                  <button
                    className={`tab-btn ${activeTab === 'html' ? 'active' : ''}`}
                    onClick={() => setActiveTab('html')}
                  >
                    <span className="icon">📄</span> HTML
                  </button>
                  <button
                    className={`tab-btn ${activeTab === 'css' ? 'active' : ''}`}
                    onClick={() => setActiveTab('css')}
                  >
                    <span className="icon">🎨</span> CSS
                  </button>
                  <button
                    className={`tab-btn ${activeTab === 'js' ? 'active' : ''}`}
                    onClick={() => setActiveTab('js')}
                  >
                    <span className="icon">⚡</span> JS
                  </button>
                </div>
                <div className="editor-container">
                  {activeTab === 'html' && (
                    <Editor 
                      value={html} 
                      setEditorState={setHtml} 
                      language="html" 
                      theme={theme} 
                    />
                  )}
                  {activeTab === 'css' && (
                    <Editor 
                      value={css} 
                      setEditorState={setCss} 
                      language="css" 
                      theme={theme} 
                    />
                  )}
                  {activeTab === 'js' && (
                    <Editor 
                      value={js} 
                      setEditorState={setJs} 
                      language="javascript" 
                      theme={theme} 
                    />
                  )}
                </div>
              </div>
              <div className="output-section">
                <div className="output-header">Output Preview</div>
                <div className="output-container">
                  {isLoading ? (
                    <div className="loading">
                      <div className="loading-spinner"></div>
                      Updating preview...
                    </div>
                  ) : (
                    <iframe
                      title="output"
                      sandbox="allow-scripts allow-modals allow-popups allow-same-origin allow-forms allow-popups-to-escape-sandbox"
                      className="preview-iframe"
                      frameBorder="0"
                      width="100%"
                      height="100%"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      }

      export default App;



