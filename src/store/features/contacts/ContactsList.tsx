import { Delete, Edit } from '@mui/icons-material';
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
} from '@mui/material';
import { memo, useMemo, useRef, useState } from 'react';
import {
  selectAllContactsFromResultData,
  useGetContactsQuery,
  initialState as contactsInitialState,
  useDeleteContactMutation,
} from './contactsSlice';
import EditContactForm from './EditContactForm';

type ContactsListProps = {
  filterText?: string;
};

const ContactsList = ({ filterText = '' }: ContactsListProps) => {
  const { data: contacts, isLoading } = useGetContactsQuery(undefined, {
    selectFromResult: (result) => ({
      ...result,
      data: selectAllContactsFromResultData(result.data ?? contactsInitialState),
    }),
  });
  const [deleteContact] = useDeleteContactMutation();
  const filteredContacts = useMemo(() => {
    if (!filterText) return contacts;
    return contacts.filter((contact) => {
      const loweredFilterText = filterText.toLowerCase();
      const includeName = contact.name.toLowerCase().includes(loweredFilterText);
      const includeEmail = contact.email?.toLowerCase().includes(loweredFilterText);
      const includePhone = contact.phone.toLowerCase().includes(loweredFilterText);

      return includeName || includeEmail || includePhone;
    });
  }, [filterText, contacts]);

  const selectContactId = useRef<number>();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };
  const closeEditDialog = () => {
    setEditDialogOpen(false);
  };

  const onDeleteClick = (id: number) => {
    setDeleteDialogOpen(true);
    selectContactId.current = id;
  };

  const onEditClick = (id: number) => {
    setEditDialogOpen(true);
    selectContactId.current = id;
  };

  const onDelete = () => {
    if (selectContactId.current !== undefined) {
      deleteContact(selectContactId.current);
    }
    closeDeleteDialog();
  };

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>????????????????</TableCell>
              <TableCell>?????????? ??????E????????</TableCell>
              <TableCell>EMAIL</TableCell>
              <TableCell align="right">????????????????</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredContacts.map((contact) => (
              <TableRow key={contact.id} role="checkbox">
                <TableCell>{contact.name}</TableCell>
                <TableCell>{contact.phone}</TableCell>
                <TableCell>{contact.email}</TableCell>
                <TableCell align="right" padding="checkbox" sx={{ pr: 1 }}>
                  <IconButton color="primary" onClick={() => onEditClick(contact.id)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => onDeleteClick(contact.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      )}
      <Dialog open={deleteDialogOpen} onClose={closeDeleteDialog}>
        <DialogTitle>?????????????? ??????????????</DialogTitle>
        <DialogContent>
          <Typography>???? ?????????????????????????? ???????????? ?????????????? ???????????????</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog}>????????????</Button>
          <Button color="error" onClick={onDelete}>
            ??????????????
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog fullWidth maxWidth="sm" open={editDialogOpen} onClose={closeEditDialog}>
        <DialogTitle>???????????????? ??????????????</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <EditContactForm id={selectContactId.current} onAfterSubmit={closeEditDialog} />
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default memo(ContactsList);
