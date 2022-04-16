import { useState } from 'react';
import { useCreateContactMutation, ContactRequest } from './contactsSlice';
import ContactForm, { ContactFormChangeEvent, ContactFormSubmitEvent } from './ContactForm';

type AddContactFormProps = {
  onAfterSubmit?: () => void;
};

const initialFormData: ContactRequest = {
  name: '',
  phone: '',
  email: '',
};

const AddContactForm = ({ onAfterSubmit }: AddContactFormProps) => {
  const [create, { isLoading, isError }] = useCreateContactMutation();
  const [formData, setFormData] = useState<ContactRequest>(initialFormData);

  const onChange: ContactFormChangeEvent = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit: ContactFormSubmitEvent = async (e) => {
    e.preventDefault();
    await create(formData).unwrap();
    if (onAfterSubmit) {
      onAfterSubmit();
    }
  };

  return (
    <ContactForm
      onSubmit={onSubmit}
      onChange={onChange}
      name={formData.name}
      email={formData.email}
      phone={formData.phone}
      isLoading={isLoading}
      isError={isError}
      submitLabel="Добавить"
    />
  );
};

export default AddContactForm;
