import { Form, HttpNewFormsRecipient, HttpVerfiedEmail } from '@/lib/models';
import { Button, ComboboxItem, Select, Text } from '@mantine/core';
import { useEffect, useState } from 'react';

export interface FormsRecipient {
  id: string;
  form_id: string;
  email_id: string;
  created_at: Date;
  updated_at: Date;
}

export interface CreateFormsRecipientProps {
  submitFormCallback: (newForm: HttpNewFormsRecipient) => Promise<void>;
  getVerifiedEmails: () => Promise<HttpVerfiedEmail[]>;
  form: Form;
}

export function CreateFormsRecipient(props: CreateFormsRecipientProps) {
  const [isBusy, setIsBusy] = useState(false);
  const [error, setError] = useState('');

  const [emails, setEmails] = useState<{ label: string; value: string }[]>([]);

  const [selectedEmail, setSelectedEmail] = useState<ComboboxItem | null>(null);

  useEffect(() => {
    const getVerifiedEmails = async () => {
      setIsBusy(true);
      try {
        const vemails = await props.getVerifiedEmails();
        setEmails(
          vemails.map((email) => {
            return { label: email.email, value: email.id };
          })
        );
      } catch (e) {
        setError(`Error: ${e}`);
        console.error(e);
      } finally {
        setIsBusy(false);
      }
    };
    getVerifiedEmails();
  }, []);

  const submitForm = async () => {
    if (!selectedEmail) {
      setError(`Error: No email selected`);
      return;
    }
    const newRecipient = {
      form_id: props.form.id,
      email_id: selectedEmail.label,
    };
    setIsBusy(true);
    try {
      await props.submitFormCallback(newRecipient);
    } catch (e) {
      setError(`Error: ${e}`);
      console.error(e);
    } finally {
      setIsBusy(false);
    }
  };

  return (
    <>
      <Text>Associating with {props.form.title}</Text>
      <Select
        data={emails}
        value={selectedEmail ? selectedEmail.value : null}
        onChange={(_value, option) => setSelectedEmail(option)}
        mb="md"
      />
      <Button type="submit" loading={isBusy}>
        Add
      </Button>
      {error && <Text color="red">{error}</Text>}
    </>
  );
}
