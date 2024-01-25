import { FormsTable } from './Table';
import { forms_placeholder } from '@/lib/story-data';

export default {
  title: 'Components/FormsTable',
};

let perPage = 2;

let pagination = {
  total: forms_placeholder.length,
  initial: 1,
  perPage: perPage,
};

const onChange = async (from: number, to: number) => {
  await new Promise((resolve) => setTimeout(resolve, 10000));
  return forms_placeholder.slice(from, to);
};

export const Usage = () => <FormsTable pagination={pagination} onChange={onChange} />;
