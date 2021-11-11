import Image from 'next/image';
import Link from 'next/link';
import { Box } from '@chakra-ui/react';

export interface ILogoProps {
  width?: string;
  height?: string;
  rest?: any;
}

export default function Logo({ width, height, ...rest }: ILogoProps) {
  return (
    <Link href="/" passHref>
      <Box cursor="pointer" d="flex" alignItems="center" {...rest}>
        <Image src="/logo.svg" alt="logo" width={width || '32'} height={height || '32'} />
      </Box>
    </Link>
  );
}
