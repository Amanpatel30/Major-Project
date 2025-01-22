import React, { useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor = ({ value, setEditorState, language, theme }) => {
  const editorRef = useRef(null);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;

    // Configure JavaScript suggestions
    monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: false,
    });

    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.Latest,
      allowNonTsExtensions: true,
      allowJs: true,
      checkJs: true,
    });

    // Add custom JavaScript snippets
    monaco.languages.registerCompletionItemProvider('javascript', {
      provideCompletionItems: () => ({
        suggestions: [
          {
            label: 'clg',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: 'console.log(${1});',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Console log'
          },
          {
            label: 'fn',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: [
              'function ${1:functionName}(${2:params}) {',
              '\t${3}',
              '}'
            ].join('\n'),
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Function declaration'
          },
          {
            label: 'afn',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: 'const ${1:functionName} = (${2:params}) => {\n\t${3}\n};',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Arrow function'
          },
          {
            label: 'iife',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: [
              '(function() {',
              '\t${1}',
              '})();'
            ].join('\n'),
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Immediately invoked function expression'
          },
          {
            label: 'fetch',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: [
              'fetch(\'${1:url}\')',
              '\t.then(response => response.json())',
              '\t.then(data => {',
              '\t\t${2}',
              '\t})',
              '\t.catch(error => console.error(\'Error:\', error));'
            ].join('\n'),
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Fetch API with error handling'
          }
        ]
      })
    });

    // Add custom HTML snippets
    monaco.languages.registerCompletionItemProvider('html', {
      triggerCharacters: ['<', '/', ' '],
      provideCompletionItems: (model, position) => {
        const textUntilPosition = model.getValueInRange({
          startLineNumber: position.lineNumber,
          startColumn: 1,
          endLineNumber: position.lineNumber,
          endColumn: position.column
        });

        const isStartingTag = textUntilPosition.trim().endsWith('<');
        const isClosingTag = textUntilPosition.trim().endsWith('</');

        const basicTags = [
          { label: 'h1', detail: '<h1>', documentation: 'Heading 1' },
          { label: 'h2', detail: '<h2>', documentation: 'Heading 2' },
          { label: 'h3', detail: '<h3>', documentation: 'Heading 3' },
          { label: 'p', detail: '<p>', documentation: 'Paragraph' },
          { label: 'div', detail: '<div>', documentation: 'Division' },
          { label: 'span', detail: '<span>', documentation: 'Span' },
          { label: 'ul', detail: '<ul>', documentation: 'Unordered List' },
          { label: 'ol', detail: '<ol>', documentation: 'Ordered List' },
          { label: 'li', detail: '<li>', documentation: 'List Item' },
          { label: 'a', detail: '<a>', documentation: 'Link' },
          { label: 'img', detail: '<img>', documentation: 'Image' },
          { label: 'button', detail: '<button>', documentation: 'Button' },
          { label: 'input', detail: '<input>', documentation: 'Input' },
          { label: 'form', detail: '<form>', documentation: 'Form' },
          { label: 'table', detail: '<table>', documentation: 'Table' },
          { label: 'section', detail: '<section>', documentation: 'Section' },
          { label: 'header', detail: '<header>', documentation: 'Header' },
          { label: 'footer', detail: '<footer>', documentation: 'Footer' },
          { label: 'nav', detail: '<nav>', documentation: 'Navigation' },
          { label: 'main', detail: '<main>', documentation: 'Main' }
        ];

        if (isStartingTag) {
          return {
            suggestions: basicTags.map(tag => ({
              label: tag.label,
              kind: monaco.languages.CompletionItemKind.Function,
              documentation: tag.documentation,
              insertText: `${tag.label}>${tag.label !== 'img' && tag.label !== 'input' ? `$1</${tag.label}>` : ''}$0`,
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              detail: tag.detail
            }))
          };
        }

        if (isClosingTag) {
          return {
            suggestions: basicTags.map(tag => ({
              label: tag.label,
              kind: monaco.languages.CompletionItemKind.Function,
              documentation: `Closing tag for ${tag.documentation}`,
              insertText: `${tag.label}>`,
              detail: `</${tag.label}>`
            }))
          };
        }

        // Keep your existing snippets for more complex completions
        return {
          suggestions: [
            {
              label: '!',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: [
                '<!DOCTYPE html>',
                '<html lang="en">',
                '<head>',
                '\t<meta charset="UTF-8">',
                '\t<meta name="viewport" content="width=device-width, initial-scale=1.0">',
                '\t<title>${1:Document}</title>',
                '</head>',
                '<body>',
                '\t${2}',
                '</body>',
                '</html>'
              ].join('\n'),
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'HTML5 template'
            },
            {
              label: 'link:css',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: '<link rel="stylesheet" href="${1:style.css}">',
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Link to CSS file'
            },
            {
              label: 'script:src',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: '<script src="${1:script.js}"></script>',
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Script tag with src attribute'
            },
            {
              label: 'div.class',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: '<div class="${1:className}">\n\t${2}\n</div>',
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Div with class'
            },
            {
              label: 'form',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: [
                '<form action="${1:#}" method="${2:post}">',
                '\t<label for="${3:input}">${4:Label}</label>',
                '\t<input type="text" id="${3:input}" name="${3:input}">',
                '\t<button type="submit">Submit</button>',
                '</form>'
              ].join('\n'),
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'HTML form template'
            },
            {
              label: 'h1',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: '<h1>${1}</h1>',
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Heading 1'
            },
            {
              label: 'h2',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: '<h2>${1}</h2>',
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Heading 2'
            },
            {
              label: 'h3',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: '<h3>${1}</h3>',
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Heading 3'
            },
            {
              label: 'p',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: '<p>${1}</p>',
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Paragraph'
            },
            {
              label: 'div',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: '<div>${1}</div>',
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Division'
            },
            {
              label: 'span',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: '<span>${1}</span>',
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Span'
            },
            {
              label: 'ul',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: '<ul>\n\t<li>${1}</li>\n</ul>',
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Unordered List'
            },
            {
              label: 'ol',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: '<ol>\n\t<li>${1}</li>\n</ol>',
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Ordered List'
            },
            {
              label: 'li',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: '<li>${1}</li>',
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'List Item'
            },
            {
              label: 'img',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: '<img src="${1}" alt="${2}">',
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Image'
            },
            {
              label: 'input',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: '<input type="${1:text}" id="${2}" name="${3}">',
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Input field'
            },
            {
              label: 'button',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: '<button type="${1:button}">${2}</button>',
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Button'
            },
            {
              label: 'section',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: '<section>\n\t${1}\n</section>',
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Section'
            },
            {
              label: 'article',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: '<article>\n\t${1}\n</article>',
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Article'
            },
            {
              label: 'nav',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: '<nav>\n\t${1}\n</nav>',
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Navigation'
            },
            {
              label: 'header',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: '<header>\n\t${1}\n</header>',
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Header'
            },
            {
              label: 'footer',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: '<footer>\n\t${1}\n</footer>',
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Footer'
            },
            {
              label: 'main',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: '<main>\n\t${1}\n</main>',
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Main content'
            },
            {
              label: 'table',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: [
                '<table>',
                '\t<thead>',
                '\t\t<tr>',
                '\t\t\t<th>${1}</th>',
                '\t\t</tr>',
                '\t</thead>',
                '\t<tbody>',
                '\t\t<tr>',
                '\t\t\t<td>${2}</td>',
                '\t\t</tr>',
                '\t</tbody>',
                '</table>'
              ].join('\n'),
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Table'
            }
          ]
        };
      }
    });

    // Add custom CSS snippets
    monaco.languages.registerCompletionItemProvider('css', {
      provideCompletionItems: () => ({
        suggestions: [
          {
            label: 'flex-center',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: [
              'display: flex;',
              'justify-content: center;',
              'align-items: center;'
            ].join('\n'),
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Flexbox center alignment'
          },
          {
            label: 'grid-responsive',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: [
              'display: grid;',
              'grid-template-columns: repeat(auto-fit, minmax(${1:250px}, 1fr));',
              'gap: ${2:1rem};'
            ].join('\n'),
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Responsive grid layout'
          },
          {
            label: 'reset',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: [
              '* {',
              '\tmargin: 0;',
              '\tpadding: 0;',
              '\tbox-sizing: border-box;',
              '}',
              '',
              'body {',
              '\tfont-family: Arial, sans-serif;',
              '\tline-height: 1.6;',
              '}'
            ].join('\n'),
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'CSS reset'
          },
          {
            label: 'media',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: [
              '@media (max-width: ${1:768px}) {',
              '\t${2}',
              '}'
            ].join('\n'),
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Media query'
          }
        ]
      })
    });
  };

  const handleEditorChange = (value) => {
    setEditorState(value);
  };

  // Store editor settings in localStorage
  const saveEditorSettings = (settings) => {
    localStorage.setItem('editorSettings', JSON.stringify(settings));
  };

  const loadEditorSettings = () => {
    const saved = localStorage.getItem('editorSettings');
    return saved ? JSON.parse(saved) : null;
  };

  // Use stored settings
  useEffect(() => {
    const savedSettings = loadEditorSettings();
    if (savedSettings) {
      editorRef.current?.updateOptions(savedSettings);
    }
  }, []);

  return (
    <Editor
      height="100%"
      defaultLanguage={language}
      value={value}
      onChange={handleEditorChange}
      onMount={handleEditorDidMount}
      theme={theme === 'light' ? 'vs-light' : 'vs-dark'}
      options={{
        fontSize: 14,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        wordWrap: 'on',
        tabSize: 2,
        renderLineHighlight: 'none',
        hideCursorInOverviewRuler: true,
        overviewRulerBorder: false,
        lineNumbers: 'on',
        glyphMargin: false,
        folding: true,
        lineDecorationsWidth: 0,
        automaticLayout: true,
        suggestOnTriggerCharacters: true,
        acceptSuggestionOnEnter: 'smart',
        quickSuggestions: {
          other: true,
          comments: true,
          strings: true
        },
        quickSuggestionsDelay: 10,
        snippetSuggestions: 'top',
        wordBasedSuggestions: true,
        suggestSelection: 'first',
        tabCompletion: 'on',
        suggest: {
          localityBonus: true,
          snippetsPreventQuickSuggestions: false,
          showIcons: true,
          maxVisibleSuggestions: 12,
          showMethods: true,
          showFunctions: true,
          showConstructors: true,
          showFields: true,
          showVariables: true,
          showClasses: true,
          showStructs: true,
          showInterfaces: true,
          showModules: true,
          showProperties: true,
          showEvents: true,
          showOperators: true,
          showUnits: true,
          showValues: true,
          showConstants: true,
          showEnums: true,
          showEnumMembers: true,
          showKeywords: true,
          showWords: true,
          showColors: true,
          showFiles: true,
          showReferences: true,
          showFolders: true,
          showTypeParameters: true,
          showSnippets: true,
        },
        extraEditorClassName: 'custom-editor',
        'editor.action.duplicateSelection': true,
        multiCursorModifier: 'alt',
        'editor.action.copyLinesDownAction': true,
        customEditorOptions: {
          duplicateLineAction: true
        },
        keybindings: [
          {
            command: 'editor.action.duplicateSelection',
            key: 'Ctrl+d',
            mac: 'Cmd+d'
          }
        ],
        actions: [
          {
            id: 'editor.action.duplicateSelection',
            label: 'Duplicate Selection',
            contextMenuGroupId: '9_cutcopypaste',
            run: (editor) => {
              editor.trigger('keyboard', 'editor.action.duplicateSelection', null);
            }
          }
        ]
      }}
    />
  );
};

export default CodeEditor;