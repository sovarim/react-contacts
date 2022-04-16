import { ReactNode } from 'react';
import { Container, Paper } from '@mui/material';

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <Container
      component={Paper}
      maxWidth="md"
      sx={{
        p: 2,
        my: { xs: 0, md: 1 },
        minHeight: (theme) => ({
          xs: '100vh',
          md: `calc(100vh - ${theme.spacing(2)})`,
        }),
      }}
    >
      {children}
    </Container>
  );
};

export default MainLayout;
