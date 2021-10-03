import { ReactNode, useState } from 'react';

import { AdminHeader } from '@src/components/header/header-admin';
import { Footer } from '@src/components/footer';
import { Box, Container } from '@chakra-ui/react';

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
      <AdminHeader setOpenDrawer={setOpenDrawer} />
      <Container maxW="container.xl" py={5}>
        {children}
      </Container>
      <Footer />
    </>
  );
};

export { Main };
