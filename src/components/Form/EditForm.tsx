import { Form, UpdateForm } from '@/lib/models';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { FormFields } from './Common';

export interface UpdateFormProps {
  submitFormCallback: (newForm: UpdateForm) => Promise<void>;
  form: Form;
}

export function EditForm(props: UpdateFormProps) {
  const [isBusy, setIsBusy] = useState(false);
  const [error, setError] = useState('');

  const form = useForm({
    initialValues: {
      title: props.form.title,
      filter_spam: props.form.filter_spam,
      redirect_url: props.form.redirect_url,
    },
    validate: {
      title: (value) => (value ? null : 'Title is required'),
      redirect_url: (value) => (/^(http|https):\/\/[^ "]+$/.test(value) ? null : 'Invalid URL'),
    },
  });

  const submitForm = async () => {
    const newForm = {
      id: props.form.id,
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

  return FormFields({
    isEditing: true,
    isBusy: isBusy,
    hasError: error,
    submitCb: submitForm,
    form: form,
  });
}
