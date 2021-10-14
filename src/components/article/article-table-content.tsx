import Link from 'next/link';
import { useState, useEffect } from 'react';
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
import { FaCalendarAlt as CalendarIcon, FaBookmark as CategoryIcon } from 'react-icons/fa';

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
    item.id = index.toString();
    return item;
  });

  const nestedHeadings: IHeadingTableContent[] = [];

  headingElements.forEach((heading, index) => {
    let { innerHTML: title, id } = heading;
    id = CommonUtil.makeSlug(title, index.toString());

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
  const [nestedHeadings, setNestedHeadings] = useState<IHeadingTableContent[]>([]);

  useEffect(() => {
    const headingElements = Array.from(document.querySelectorAll('h2, h3'));

    const newNestedHeadings = getNestedHeadings(headingElements);
    setNestedHeadings(newNestedHeadings);
  }, []);

  return { nestedHeadings };
};

export const ArticleTableContent = () => {
  const { colorMode } = useColorMode();

  const { nestedHeadings } = useHeadingsData();

  return (
    <Box rounded="xl" overflow="hidden" bg={colorMode === 'light' ? 'white' : 'gray.700'}>
      {nestedHeadings.map((nestedHeading) => (
        <p key={nestedHeading.id} id={nestedHeading.id}>
          {nestedHeading.title}
        </p>
      ))}
    </Box>
  );
};
