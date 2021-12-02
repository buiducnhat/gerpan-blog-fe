import { Key } from 'react';
import { Tag, TagProps } from '@chakra-ui/react';

export interface ITagWithHoverProps extends TagProps {
  key?: Key | string | number;
  hoverBackground?: string;
  hoverColor?: string;
}

export default function TagWithHover({
  key,
  onClick,
  hoverBackground,
  hoverColor,
  children,
  ...rest
}: ITagWithHoverProps) {
  return (
    <Tag
      key={key || null}
      cursor="pointer"
      _hover={{ backgroundColor: hoverBackground || 'pink.500', color: hoverColor || 'white' }}
      transition="ease-in-out .15s"
      onClick={onClick}
      {...rest}
    >
      {children}
    </Tag>
  );
}
