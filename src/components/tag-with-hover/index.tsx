import { Tag, TagProps } from '@chakra-ui/react';

export interface ITagWithHoverProps extends TagProps {
  hoverBackground?: string;
  hoverColor?: string;
}

export default function TagWithHover({
  onClick,
  hoverBackground,
  hoverColor,
  children,
  ...rest
}: ITagWithHoverProps) {
  return (
    <Tag
      rounded="xl"
      cursor="pointer"
      _hover={{ backgroundColor: hoverBackground || 'primary.500', color: hoverColor || 'white' }}
      transition="ease-in-out .15s"
      onClick={onClick}
      {...rest}
    >
      {children}
    </Tag>
  );
}
