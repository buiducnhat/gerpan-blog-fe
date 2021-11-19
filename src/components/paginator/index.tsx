import { useRouter } from 'next/router';
import { Button, HStack, Center, IconButton } from '@chakra-ui/react';
import { FaAngleLeft as LeftIcon, FaAngleRight as RightIcon } from 'react-icons/fa';

export interface IPaginatorProps {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export default function Paginator({ page, limit, total, totalPages }: IPaginatorProps) {
  const router = useRouter();

  const routerToPage = (newPage: number) => {
    router.push({ query: { ...router.query, page: newPage } });
  };

  if (total) {
    const validTotalPages = Math.ceil(total / limit);
    if (validTotalPages !== totalPages) {
      throw Error('Invalid props');
    }
  }
  const countPages = new Array(totalPages).fill(0);

  return (
    <Center>
      <HStack>
        <IconButton
          aria-label="previous-page"
          icon={<LeftIcon />}
          disabled={page === 1}
          onClick={() => routerToPage(Math.max(page - 1, 1))}
        />

        {countPages.map((e, index) => {
          const curPage = index + 1;
          return (
            <Button
              key={curPage}
              variant={page === curPage ? 'solid' : 'outline'}
              colorScheme={page === curPage ? 'purple' : 'gray'}
              onClick={() => routerToPage(curPage)}
            >
              {curPage}
            </Button>
          );
        })}

        <IconButton
          aria-label="next-page"
          icon={<RightIcon />}
          disabled={page === totalPages}
          onClick={() => routerToPage(Math.min(page + 1, totalPages))}
        />
      </HStack>
    </Center>
  );
}
