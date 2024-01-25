import { Button, Checkbox, TextInput, Text } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';

export interface FormFieldsProps {
  isEditing: boolean;
  isBusy: boolean;
  hasError: string;
  submitCb: () => Promise<void>;
  form: UseFormReturnType<{ title: string; filter_spam: boolean; redirect_url: string }>;
}

export function FormFields(props: FormFieldsProps) {
  return (
    <>
      <form
        onSubmit={props.form.onSubmit((values) => {
          console.log(values);
          props.submitCb();
        })}
      >
        <TextInput
          label="Title"
          placeholder="Title"
          value={props.form.values.title}
          onChange={(event) => props.form.setFieldValue('title', event.currentTarget.value)}
          error={props.form.errors.title && 'Title is required'}
          mb="md"
        />
        <TextInput
          label="Redirect URL"
          placeholder="Redirect URL"
          value={props.form.values.redirect_url}
          onChange={(event) => props.form.setFieldValue('redirect_url', event.currentTarget.value)}
          error={props.form.errors.redirect_url && 'Invalid URL'}
          mb="md"
        />
        <Checkbox
          label="Filter Spam"
          checked={props.form.values.filter_spam}
          onChange={(event) => props.form.setFieldValue('filter_spam', event.currentTarget.checked)}
          mb="md"
        />
        <Button type="submit" loading={props.isBusy} disabled={props.isBusy}>
          {props.isEditing ? 'Update' : 'Create'}
        </Button>
      </form>
      {props.hasError && <Text color="red">{props.hasError}</Text>}
    </>
  );
}
