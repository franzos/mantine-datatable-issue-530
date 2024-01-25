import { HttpNewForm, HttpNewFormsRecipient, HttpVerfiedEmail, VerifiedEmail } from '@/lib/models';
import { CreateFormsRecipient } from './CreateFormsRecipient';

export default {
  title: 'Components/CreateFormsRecipient',
};

const submitFormCallback = async (newForm: HttpNewFormsRecipient) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
};

const getVerifiedEmails = async (): Promise<HttpVerfiedEmail[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return [
    {
      id: 'id1',
      user_id: 'user_id1',
      email: 'some@one.com',
      is_verified: false,
      created_at: new Date(),
    },
    {
      id: 'id2',
      user_id: 'user_id2',
      email: 'some@two.com',
      is_verified: false,
      created_at: new Date(),
    },
  ];
};

export const Usage = () => (
  <CreateFormsRecipient
    submitFormCallback={submitFormCallback}
    getVerifiedEmails={getVerifiedEmails}
    form={{
      id: 'id1',
      title: 'title1',
      user_id: 'user_id1',
      filter_spam: false,
      redirect_url: 'redirect_url1',
      created_at: new Date(),
      updated_at: new Date(),
    }}
  />
);
