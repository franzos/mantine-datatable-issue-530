import { Login } from './Login';

export default {
  title: 'Login',
};

const getChallenge = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return 'challenge';
};

const submitChallengeResponse = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
};

const generateNewAccount = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
};

export const Usage = () => (
  <Login
    getChallenge={getChallenge}
    submitChallengeResponse={submitChallengeResponse}
    generateNewAccount={generateNewAccount}
  />
);
