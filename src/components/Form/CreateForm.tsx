import { HttpNewForm } from '@/lib/models';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { FormFields } from './Common';

export interface CreateFormProps {
  submitFormCallback: (newForm: HttpNewForm) => Promise<void>;
}

export function CreateForm(props: CreateFormProps) {
  const [isBusy, setIsBusy] = useState(false);
  const [error, setError] = useState('');

  const form = useForm({
    initialValues: {
      title: '',
      filter_spam: false,
      redirect_url: '',
    },
    validate: {
      title: (value) => (value ? null : 'Title is required'),
      redirect_url: (value) => (/^(http|https):\/\/[^ "]+$/.test(value) ? null : 'Invalid URL'),
    },
  });

  const submitForm = async () => {
    const newForm = {
      title: form.values.title,
      filter_spam: form.values.filter_spam,
      redirect_url: form.values.redirect_url,
    };
    setIsBusy(true);
    try {
      await props.submitFormCallback(newForm);
    } catch (e) {
      setError(`Error: ${e}`);
      console.error(e);
    } finally {
      setIsBusy(false);
    }
  };

  return (
    <FormFields
      isEditing={false}
      isBusy={isBusy}
      hasError={error}
      submitCb={submitForm}
      form={form}
    />
  );
}
