import Image from 'next/image';
import Link from 'next/link';
import { Box } from '@chakra-ui/react';

export default function Logo({ ...props }) {
  return (
    <Link href="/" passHref>
      <Box cursor="pointer" {...props}>
        <Image src="/logo.svg" alt="logo" width="36" height="36" />
      </Box>
    </Link>
  );
}
