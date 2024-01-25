import { HttpNewForm } from '@/lib/models';
import { CreateForm } from './CreateForm';

export default {
  title: 'Components/CreateForm',
};

const submitFormCallback = async (newForm: HttpNewForm) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
};

export const Usage = () => <CreateForm submitFormCallback={submitFormCallback} />;
