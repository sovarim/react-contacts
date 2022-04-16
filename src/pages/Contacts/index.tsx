import { Search } from '@mui/icons-material';
import {
  Box,
  Paper,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Button,
  Typography,
} from '@mui/material';
import ContactsList from 'store/features/contacts/ContactsList';
import AddContactForm from 'store/features/contacts/AddContactForm';
import { ChangeEventHandler, useCallback, useState } from 'react';
import { useAppDispatch } from 'store';
import { logout } from 'store/features/auth/authSlice';

const Contacts = () => {
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);
  const [filterText, setFilterText] = useState('');

  const closeDialog = useCallback(() => setOpen(false), []);
  const openDialog = useCallback(() => setOpen(true), []);
  const onFilterTextChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFilterText(e.target.value);
  };

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Typography component="h1" variant="h4" sx={{ mb: 2, flex: 1 }}>
          Контакты
        </Typography>
        <Button onClick={() => dispatch(logout())}>Выйти</Button>
      </Box>
      <Grid container sx={{ mb: 3 }} spacing={2}>
        <Grid item xs={12} sm={8}>
          <TextField
            fullWidth
            label="Поиск"
            InputProps={{ endAdornment: <Search /> }}
            onChange={onFilterTextChange}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={4}
          sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}
        >
          <Button onClick={openDialog}>Добавить контакт</Button>
        </Grid>
      </Grid>
      <Paper>
        <ContactsList filterText={filterText} />
      </Paper>
      <Dialog fullWidth open={open} maxWidth="sm" onClose={closeDialog}>
        <DialogTitle>Добавить контакт</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <AddContactForm onAfterSubmit={closeDialog} />
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Contacts;
