import Link from 'next/link';
import {
  Box,
  Image,
  Heading,
  Text,
  HStack,
  Button,
  Avatar,
  VStack,
  Divider,
  useColorMode
} from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkSlug from 'remark-slug';
import rehypeRaw from 'rehype-raw';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
  a11yLight as lightCodeTheme,
  a11yDark as darkCodeTheme
} from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import { FaCalendarAlt as CalendarIcon, FaBookmark as CategoryIcon } from 'react-icons/fa';
import { format as formatDate } from 'date-fns';

import { ArticleMetaKey, IArticleBasic } from '@src/models/article.model';
import { CommonUtil } from '@src/utils/common.util';

export interface IArticleProps {
  article: IArticleBasic;
}

export default function ArticleDetail(props: IArticleProps) {
  const { colorMode } = useColorMode();

  const { article } = props;

  return (
    <Box
      rounded="xl"
      overflow="hidden"
      bg={colorMode === 'light' ? 'white' : 'gray.700'}
      shadow="xl"
    >
      <Image
        src={article.metas?.find((meta) => meta.key === ArticleMetaKey.BANNER)?.content}
        alt="placeholder"
        w="100%"
        h="sm"
        objectFit="cover"
      />

      <Box p={{ base: 3, md: 5, lg: 8 }}>
        <Heading as="h1" mb="3">
          {article.title}
        </Heading>

        <HStack mb="5">
          {article.tags.map((tag) => (
            <Button key={tag.id} variant="outline" colorScheme="blue" size="xs">
              {tag.title}
            </Button>
          ))}
        </HStack>

        <HStack mb={5}>
          <Avatar src={article.author.avatar} size="md" />

          <VStack align="flex-start">
            <Text color="primary.500" fontWeight="black" fontSize="16">
              {CommonUtil.getFullName(article.author.firstName, article.author.lastName)}
            </Text>

            <HStack spacing="3">
              <HStack color="GrayText">
                <CalendarIcon fontSize="sm" />
                <Text>{formatDate(article.createdAt, 'MMM, dd yyyy')}</Text>
              </HStack>

              <Button colorScheme="green" variant="outline" size="xs" leftIcon={<CategoryIcon />}>
                {article.category.title}
              </Button>
            </HStack>
          </VStack>
        </HStack>

        <Divider mb="5" />

        <Box
          sx={{
            h2: {
              margin: '1.5em 0 .2em',
              fontWeight: 900,
              fontSize: '2xl',
              scrollMarginTop: 'var(--chakra-space-16)'
            },
            h3: {
              margin: '1em 0 .5em',
              fontWeight: 600,
              fontSize: 'xl',
              scrollMarginTop: 'var(--chakra-space-16)'
            },
            p: {
              fontsize: '1rem',
              margin: '0'
            },
            a: {
              fontsize: '1rem',
              color: 'blue.400'
            },
            ol: {
              marginBlockStart: '1rem',
              marginBlockEnd: '1rem',
              paddingInlineStart: '2em'
            },
            ul: {
              marginBlockStart: '1em',
              marginBlockEnd: '1em',
              paddingInlineStart: '2em'
            },
            pre: {
              margin: '1em 0'
            }
          }}
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={colorMode === 'light' ? lightCodeTheme : darkCodeTheme}
                    language={match[1]}
                    customStyle={{
                      background:
                        colorMode === 'light'
                          ? 'var(--chakra-colors-gray-100)'
                          : 'var(--chakra-colors-gray-800)'
                    }}
                    PreTag="div"
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
            {article.content}
          </ReactMarkdown>
        </Box>
      </Box>
    </Box>
  );
}
