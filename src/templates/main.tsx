import { ReactNode, useState } from 'react';

import MainHeader from '@src/components/header/header-main';
import { Footer } from '@src/components/footer';
import { Container } from '@chakra-ui/react';

interface IMainProps {
  meta: ReactNode;
  children: ReactNode;
}

const Main = (props: IMainProps) => {
  const { meta, children } = props;

  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <>
      {meta}
      <MainHeader setOpenDrawer={setOpenDrawer} />
      <Container maxW="container.xl" py={5}>
        {children}
      </Container>
      <Footer />
    </>
  );
};

export { Main };
