import { Meta } from '@src/layouts/meta';
import { Admin as AdminTemplate } from '@src/templates/admin';
import { Container, Box } from '@chakra-ui/react';

export default function AdminPage() {
  return (
    <AdminTemplate meta={<Meta title="Home | Gerpan Blog" description="Blogs for Developers" />}>
      <Box w="100%" h="90vh">
        <Container maxW="container.xl">Hehe boice</Container>
      </Box>
    </AdminTemplate>
  );
}
