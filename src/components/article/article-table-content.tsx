import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
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
  const router = useRouter();

  const { colorMode } = useColorMode();

  let isHighlighted = false;
  if (router.asPath.split('#').length) {
    isHighlighted = router.asPath.split('#')[1] === id;
  }

  // useEffect(() => {
  //   document.getElementById(id)?.scrollIntoView({
  //     behavior: 'smooth'
  //   });
  // }, [id]);

  return (
    <Link href={`#${id}`} passHref>
      <Text
        as="a"
        cursor="pointer"
        color={
          isHighlighted
            ? colorMode === 'light'
              ? 'purple.500'
              : 'purple.200'
            : colorMode === 'light'
            ? 'blue.500'
            : 'blue.200'
        }
        fontWeight={isHighlighted ? 'bold' : 'normal'}
        _hover={{ color: colorMode === 'light' ? 'purple.500' : 'purple.200' }}
        // onClick={(e) => {
        //   e.preventDefault();
        //   router.push({ hash: `#${id}` });
        //   document.getElementById(id)?.scrollIntoView({
        //     behavior: 'smooth'
        //   });
        // }}
      >
        {title}
      </Text>
    </Link>
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
              <HeadingLink title={h2Heading.title} id={h2Heading.id} />
              <List marginStart="5" spacing="1">
                {h2Heading.children?.map((h3Heading) => (
                  <ListItem key={h3Heading.id}>
                    <HeadingLink title={h3Heading.title} id={h3Heading.id} />
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
