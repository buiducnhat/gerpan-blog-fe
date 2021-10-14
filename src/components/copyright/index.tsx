import { Text, TextProps } from '@chakra-ui/layout';
import * as React from 'react';

export default function Copyright(props: TextProps) {
  return (
    <Text fontSize="sm" {...props}>
      &copy; {new Date().getFullYear()} Gerpan, Inc. All rights reserved.
    </Text>
  );
}
