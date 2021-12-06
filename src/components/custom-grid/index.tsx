import { ReactNode } from 'react';
import { Box, Flex, BoxProps, FlexProps } from '@chakra-ui/react';

export interface ICustomColumnProps extends BoxProps {
  base?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  children?: ReactNode;
}

export const CustomColumn = ({ base, sm, md, lg, xl, children, ...rest }: ICustomColumnProps) => {
  const percentsString = [base, sm, md, lg, xl].map((breakPoint) => {
    if (!breakPoint) {
      return null;
    }
    return `${((breakPoint / 12) * 100).toString()}%`;
  });
  percentsString[0] = percentsString[0] || '100%';

  const width = {
    base: percentsString[0],
    sm: percentsString[1] || percentsString[0],
    md: percentsString[2] || percentsString[1] || percentsString[0],
    lg: percentsString[3] || percentsString[2] || percentsString[1] || percentsString[0],
    xl:
      percentsString[4] ||
      percentsString[3] ||
      percentsString[2] ||
      percentsString[1] ||
      percentsString[0]
  };

  return (
    <Box width={width} {...rest}>
      {children}
    </Box>
  );
};

export const CustomRow = (props: FlexProps) => {
  const { children, ...rest } = props;

  return (
    <Flex wrap="wrap" {...rest}>
      {children}
    </Flex>
  );
};
