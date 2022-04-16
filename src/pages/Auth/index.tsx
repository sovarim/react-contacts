import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { Button, Container, IconButton, Stack, TextField, Typography } from '@mui/material';
import { LoginRequest } from 'store/features/api/types';
import { useLoginMutation } from 'store/features/api/apiSlice';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Auth = () => {
  const [login, { isLoading }] = useLoginMutation();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<LoginRequest>({
    username: '',
    password: '',
  });

  const onChange: ChangeEventHandler<HTMLFormElement> = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    login(formData);
  };

  const onShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" align="center" sx={{ mb: 1 }}>
        Авторизация
      </Typography>
      <Stack spacing={1.5} component="form" onChange={onChange} onSubmit={onSubmit}>
        <TextField fullWidth name="username" label="Имя пользователя" value={formData.username} />
        <TextField
          fullWidth
          name="password"
          label="Пароль"
          type={showPassword ? 'test' : 'password'}
          InputProps={{
            endAdornment: (
              <IconButton onClick={onShowPassword}>
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            ),
          }}
          value={formData.password}
        />
        <Button variant="contained" type="submit" disabled={isLoading}>
          Войти
        </Button>
      </Stack>
    </Container>
  );
};

export default Auth;
