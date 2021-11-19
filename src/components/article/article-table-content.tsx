import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Box, Text, List, ListItem, UnorderedList, useColorMode } from '@chakra-ui/react';

import TitleHeading from '@src/components/title-heading';
import { useIntersectionObserver } from '@src/hooks/useIntersectionObserver';

export interface IHeadingTOC {
  id: string;
  title: string;
  children?: IHeadingTOC[];
}

const makeNestedHeadings = (headingElements: Element[]) => {
  const nestedHeadings: IHeadingTOC[] = [];

  headingElements.forEach((heading) => {
    let { innerHTML: title, id } = heading;

    if (heading.nodeName === 'H2') {
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
  const [nestedHeadings, setNestedHeadings] = useState<IHeadingTOC[]>([]);

  useEffect(() => {
    const headingElements = Array.from(document.querySelectorAll('h2, h3')).filter(
      (heading) => heading.id
    );
    setNestedHeadings(makeNestedHeadings(headingElements));
  }, []);

  return { nestedHeadings };
};

const HeadingLink = ({ title, id, isActive }: { title: string; id: string; isActive: boolean }) => {
  const { colorMode } = useColorMode();

  return (
    <Link href={`#${id}`} passHref>
      <Text
        as="a"
        cursor="pointer"
        color={
          isActive
            ? colorMode === 'light'
              ? 'purple.500'
              : 'purple.200'
            : colorMode === 'light'
            ? 'blue.500'
            : 'blue.200'
        }
        fontWeight={isActive ? 'bold' : 'normal'}
        _hover={{ color: colorMode === 'light' ? 'purple.500' : 'purple.200' }}
        onClick={(e) => {
          e.preventDefault();
          document.getElementById(id)?.scrollIntoView({
            behavior: 'smooth'
          });
        }}
      >
        {title}
      </Text>
    </Link>
  );
};

export default function ArticleTableContent() {
  const { colorMode } = useColorMode();

  const { nestedHeadings } = useHeadingsData();

  const [activeId, setActiveId] = useState<string>(nestedHeadings[0]?.id);
  useIntersectionObserver(setActiveId);

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
              <HeadingLink
                title={h2Heading.title}
                id={h2Heading.id}
                isActive={activeId === h2Heading.id}
              />
              <List marginStart="5" spacing="1">
                {h2Heading.children?.map((h3Heading) => (
                  <ListItem key={h3Heading.id}>
                    <HeadingLink
                      title={h3Heading.title}
                      id={h3Heading.id}
                      isActive={activeId === h3Heading.id}
                    />
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
