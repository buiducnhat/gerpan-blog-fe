import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Box, Text, List, ListItem, UnorderedList, useColorMode } from '@chakra-ui/react';

import TitleHeading from '@src/components/title-heading';

export interface IArticleTableContentProps {
  content: string;
}

export interface IHeadingTableContentProps {
  id: string;
  title: string;
  children?: IHeadingTableContentProps[];
}

const makeNestedHeadings = (headingElements: Element[]) => {
  const nestedHeadings: IHeadingTableContentProps[] = [];

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
  const [nestedHeadings, setNestedHeadings] = useState<IHeadingTableContentProps[]>([]);

  useEffect(() => {
    const headingElements = Array.from(document.querySelectorAll('h2, h3')).filter(
      (heading) => heading.id !== 'table-of-contents'
    );
    setNestedHeadings(makeNestedHeadings(headingElements));
  }, []);

  return { nestedHeadings };
};

const HeadingLink = ({ title, id }: { title: string; id: string }) => {
  return (
    <Text
      cursor="pointer"
      _hover={{ color: 'primary.500' }}
      onClick={(e) => {
        e.preventDefault();
        document.getElementById(id)?.scrollIntoView({
          behavior: 'smooth'
        });
      }}
    >
      {title}
    </Text>
  );
};

export default function ArticleTableContent() {
  const { colorMode } = useColorMode();

  const { nestedHeadings } = useHeadingsData();

  return (
    <Box>
      <TitleHeading title={'Table of contents'} id={'table-of-contents'} />
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
                <HeadingLink title={h2Heading.title} id={h2Heading.id} />
              </Link>
              <List marginStart="5" spacing="1">
                {h2Heading.children?.map((h3Heading) => (
                  <ListItem key={h3Heading.id}>
                    <Link href={`#${h3Heading.id}`} passHref>
                      <HeadingLink title={h3Heading.title} id={h3Heading.id} />
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
