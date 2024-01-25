import { UpdateForm } from '@/lib/models';
import { EditForm } from './EditForm';
import { forms_placeholder } from '@/lib/story-data';

export default {
  title: 'Components/EditForm',
};

const submitFormCallback = async (newForm: UpdateForm) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
};

export const Usage = () => (
  <EditForm submitFormCallback={submitFormCallback} form={forms_placeholder[0]} />
);
