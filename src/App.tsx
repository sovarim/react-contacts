import MainLayout from 'layouts/MainLayout';
import Auth from 'pages/Auth';
import Contacts from 'pages/Contacts';
import { Navigate, Route, Routes } from 'react-router-dom';

import { useAuth } from 'store/features/auth/hooks';

const App = () => {
  const { isAuth } = useAuth();

  return (
    <MainLayout>
      {isAuth ? (
        <Routes>
          <Route path="/contacts" element={<Contacts />} />
          <Route path="*" element={<Navigate to="/contacts" />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="*" element={<Navigate to="/auth" />} />
        </Routes>
      )}
    </MainLayout>
  );
};

export default App;
