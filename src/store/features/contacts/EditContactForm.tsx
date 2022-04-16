import { useState } from 'react';
import { useAppSelector } from 'store';
import ContactForm, { ContactFormChangeEvent, ContactFormSubmitEvent } from './ContactForm';
import { ContactRequest, selectContactById, useUpdateContactMutation } from './contactsSlice';

type EditContactFormProps = {
  onAfterSubmit: () => void;
  id: number | undefined;
};

// eslint-disable-next-line no-unused-vars
const EditContactForm = ({ onAfterSubmit, id }: EditContactFormProps) => {
  const contact = useAppSelector((state) => selectContactById(state, id || -1));
  const [update, { isLoading, isError }] = useUpdateContactMutation();
  const [formData, setFormData] = useState<ContactRequest>({
    name: contact?.name ?? '',
    email: contact?.email ?? '',
    phone: contact?.phone ?? '',
  });

  const onChange: ContactFormChangeEvent = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit: ContactFormSubmitEvent = async (e) => {
    e.preventDefault();
    if (id) {
      await update({ id, ...formData }).unwrap();
    }
    if (onAfterSubmit) {
      onAfterSubmit();
    }
  };

  return (
    <ContactForm
      name={formData.name}
      email={formData.email}
      phone={formData.phone}
      onChange={onChange}
      onSubmit={onSubmit}
      isLoading={isLoading}
      isError={isError}
      submitLabel="Сохранить"
    />
  );
};

export default EditContactForm;
