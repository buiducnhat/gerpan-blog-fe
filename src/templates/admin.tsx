import { ReactNode, useState } from 'react';

import { AdminHeader } from '@src/components/header/header-admin';
import { Footer } from '@src/components/footer';
import AdminSidebar from '@src/components/sidebar/admin-sidebar';
import { Box } from '@chakra-ui/react';

interface IMainProps {
  meta: ReactNode;
  children: ReactNode;
}

const Admin = (props: IMainProps) => {
  const { meta, children } = props;

  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <>
      {meta}
      <AdminHeader setOpenDrawer={setOpenDrawer} />
      <Box d="flex" flexDirection="row">
        <AdminSidebar openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
        {children}
      </Box>
      <Footer />
    </>
  );
};

export { Admin };
