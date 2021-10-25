import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Box, Text, List, ListItem, UnorderedList, useColorMode } from '@chakra-ui/react';

import TitleHeading from '@src/components/title-heading';
import { CommonUtil } from '@src/utils/common.util';

export interface IArticleTableContentProps {
  content: string;
}

export interface IHeadingTableContent {
  id: string;
  title: string;
  children?: IHeadingTableContent[];
}

const getNestedHeadings = (headingElements: Element[]) => {
  headingElements = headingElements.map((item, index) => {
    item.id = CommonUtil.makeSlug(item.innerHTML, index.toString());
    return item;
  });

  const nestedHeadings: IHeadingTableContent[] = [];

  headingElements.forEach((heading, index) => {
    let { innerHTML: title, id } = heading;

    if (heading.nodeName === 'H2' && index < headingElements.length - 2) {
      nestedHeadings.push({ id, title, children: [] });
    } else if (heading.nodeName === 'H3' && nestedHeadings.length > 0) {
      nestedHeadings[nestedHeadings.length - 1].children?.push({
        id,
        title
      });
    }
  });

  return nestedHeadings;
};

const useHeadingsData = () => {
  const [nestedHeadings, setNestedHeadings] = useState<IHeadingTableContent[]>([]);

  useEffect(() => {
    const headingElements = Array.from(document.querySelectorAll('h2, h3'));
    setNestedHeadings(getNestedHeadings(headingElements));
  }, []);

  return { nestedHeadings };
};

export default function ArticleTableContent() {
  const { colorMode } = useColorMode();

  const { nestedHeadings } = useHeadingsData();

  return (
    <Box>
      <TitleHeading title={'Table of contents'} />
      <Box
        rounded="xl"
        overflow="hidden"
        p="5"
        bg={colorMode === 'light' ? 'white' : 'gray.700'}
        shadow="xl"
      >
        <UnorderedList spacing="2">
          {nestedHeadings.map((h2Heading) => (
            <ListItem key={h2Heading.id}>
              <Link href={`#${h2Heading.id}`} passHref>
                <Text
                  cursor="pointer"
                  _hover={{ color: 'primary.500' }}
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector(`#${h2Heading.id}`)?.scrollIntoView({
                      behavior: 'smooth'
                    });
                  }}
                >
                  {h2Heading.title}
                </Text>
              </Link>
              <List marginStart="3" spacing="1">
                {h2Heading.children?.map((h3Heading) => (
                  <ListItem key={h3Heading.id}>
                    <Link href={`#${h3Heading.id}`} passHref>
                      <Text
                        cursor="pointer"
                        _hover={{ color: 'primary.500' }}
                        onClick={(e) => {
                          e.preventDefault();
                          document.querySelector(`#${h3Heading.id}`)?.scrollIntoView({
                            behavior: 'smooth'
                          });
                        }}
                      >
                        {h3Heading.title}
                      </Text>
                    </Link>
                  </ListItem>
                ))}
              </List>
            </ListItem>
          ))}
        </UnorderedList>
      </Box>
    </Box>
  );
}
