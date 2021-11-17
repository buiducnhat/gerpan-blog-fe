import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Box, IconButton, useColorMode, useClipboard } from '@chakra-ui/react';
import { MdAssignment as CopyIcon, MdAssignmentTurnedIn as CopiedIcon } from 'react-icons/md';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import remarkSlug from 'remark-slug';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
  defaultStyle as lightCodeTheme,
  gradientDark as darkCodeTheme
} from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import html from 'react-syntax-highlighter/dist/cjs/languages/hljs/htmlbars';
import css from 'react-syntax-highlighter/dist/cjs/languages/hljs/css';
import js from 'react-syntax-highlighter/dist/cjs/languages/hljs/javascript';
import ts from 'react-syntax-highlighter/dist/cjs/languages/hljs/typescript';
import c from 'react-syntax-highlighter/dist/cjs/languages/hljs/c';
import cpp from 'react-syntax-highlighter/dist/cjs/languages/hljs/cpp';
import java from 'react-syntax-highlighter/dist/cjs/languages/hljs/java';
import cs from 'react-syntax-highlighter/dist/cjs/languages/hljs/csharp';
import py from 'react-syntax-highlighter/dist/cjs/languages/hljs/python';
import dart from 'react-syntax-highlighter/dist/cjs/languages/hljs/dart';
import php from 'react-syntax-highlighter/dist/cjs/languages/hljs/php';
import go from 'react-syntax-highlighter/dist/cjs/languages/hljs/go';
import ruby from 'react-syntax-highlighter/dist/cjs/languages/hljs/ruby';
import sql from 'react-syntax-highlighter/dist/cjs/languages/hljs/sql';
import bash from 'react-syntax-highlighter/dist/cjs/languages/hljs/bash';
import dockerfile from 'react-syntax-highlighter/dist/cjs/languages/hljs/dockerfile';
import yaml from 'react-syntax-highlighter/dist/cjs/languages/hljs/yaml';
import md from 'react-syntax-highlighter/dist/cjs/languages/hljs/markdown';

SyntaxHighlighter.registerLanguage('html', html);
SyntaxHighlighter.registerLanguage('css', css);
SyntaxHighlighter.registerLanguage('js', js);
SyntaxHighlighter.registerLanguage('javascript', js);
SyntaxHighlighter.registerLanguage('ts', ts);
SyntaxHighlighter.registerLanguage('typescript', ts);
SyntaxHighlighter.registerLanguage('c', c);
SyntaxHighlighter.registerLanguage('cpp', cpp);
SyntaxHighlighter.registerLanguage('java', java);
SyntaxHighlighter.registerLanguage('cs', cs);
SyntaxHighlighter.registerLanguage('csharp', cs);
SyntaxHighlighter.registerLanguage('py', py);
SyntaxHighlighter.registerLanguage('dart', dart);
SyntaxHighlighter.registerLanguage('php', php);
SyntaxHighlighter.registerLanguage('go', go);
SyntaxHighlighter.registerLanguage('ruby', ruby);
SyntaxHighlighter.registerLanguage('sql', sql);
SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('dockerfile', dockerfile);
SyntaxHighlighter.registerLanguage('yaml', yaml);
SyntaxHighlighter.registerLanguage('md', md);

interface IMarkdownProps {
  content: string;
}

const ButtonCopy = (props: { content: string }) => {
  const { hasCopied, onCopy } = useClipboard(props.content);
  return (
    <IconButton
      aria-label="copy-code"
      icon={hasCopied ? <CopiedIcon /> : <CopyIcon />}
      onClick={onCopy}
      sx={{
        fontSize: '1.5em',
        color: 'var(--chakra-colors-gray-500)',
        position: 'absolute',
        top: '1rem',
        right: '1rem'
      }}
    />
  );
};

export default function Markdown({ content }: IMarkdownProps) {
  const { colorMode } = useColorMode();

  useEffect(() => {
    const blocks = document.querySelectorAll('pre');

    blocks.forEach((block, index) => {
      block.className = 'code-block';
      block.style.position = 'relative';

      const buttonWrapper = document.createElement('div');
      buttonWrapper.className = `copy-code-button`;
      buttonWrapper.id = `copy-code-${index}`;
      block.appendChild(buttonWrapper);
      ReactDOM.render(
        <ButtonCopy content={block.innerText} />,
        document.getElementById(buttonWrapper.id)
      );
    });
  }, []);

  return (
    <Box
      sx={{
        h2: {
          margin: '0.75rem 0',
          fontWeight: 700,
          fontSize: '1.5em',
          scrollMarginTop: 'var(--chakra-space-16)'
        },
        h3: {
          margin: '0.75rem 0',
          fontWeight: 700,
          fontSize: '1.25em',
          scrollMarginTop: 'var(--chakra-space-16)'
        },
        h4: {
          margin: '0.75rem 0',
          fontWeight: 500,
          fontSize: '1.25em',
          scrollMarginTop: 'var(--chakra-space-16)'
        },
        p: {
          fontSize: '1.25rem',
          margin: '0 0 1.25rem 0'
        },
        a: {
          fontsize: '1.25rem',
          color: 'blue.400'
        },
        ol: {
          marginBlockEnd: '0.75rem',
          paddingInlineStart: '2.5rem'
        },
        ul: {
          marginBlockEnd: '0.75rem',
          paddingInlineStart: '2.5rem'
        },
        li: {
          fontSize: '1.25rem'
        },
        pre: {
          fontSize: '1em',
          margin: '1rem 0'
        }
      }}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkSlug]}
        rehypePlugins={[rehypeRaw]}
        components={{
          code({ inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighlighter
                style={colorMode === 'light' ? lightCodeTheme : darkCodeTheme}
                language={match[1]}
                customStyle={{
                  background:
                    colorMode === 'light'
                      ? 'var(--chakra-colors-gray-100)'
                      : 'var(--chakra-colors-gray-800)',
                  borderRadius: 'var(--chakra-radii-xl)',
                  padding: 'var(--chakra-space-5)'
                }}
                PreTag="div"
                CodeTag="code"
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </Box>
  );
}
