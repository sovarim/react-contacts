import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { ChangeEventHandler, FormEventHandler } from 'react';

export type ContactFormSubmitEvent = FormEventHandler<HTMLFormElement>;
export type ContactFormChangeEvent = ChangeEventHandler<HTMLFormElement>;

type ContactFormProps = {
  onSubmit: ContactFormSubmitEvent;
  isError: boolean;
  onChange: ContactFormChangeEvent;
  name: string;
  phone: string;
  email: string;
  isLoading: boolean;
  submitLabel: string;
};

const ContactForm = ({
  onSubmit,
  isError,
  onChange,
  name,
  phone,
  email,
  isLoading,
  submitLabel,
}: ContactFormProps) => {
  return (
    <Stack component="form" spacing={1.5} onSubmit={onSubmit} onChange={onChange}>
      {isError && <Typography color="error">Ошибка!</Typography>}
      <TextField name="name" label="Название" value={name} />
      <TextField name="phone" label="Номер телефона" value={phone} />
      <TextField name="email" label="Email" value={email} />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end ' }}>
        <Button type="submit" disabled={isLoading}>
          {submitLabel}
        </Button>
      </Box>
    </Stack>
  );
};

export default ContactForm;
