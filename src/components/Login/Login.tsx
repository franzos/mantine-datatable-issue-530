import { TextInput, Stepper, rem, Button, Group, Box, Text, SegmentedControl } from '@mantine/core';
import { IconCircleX } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { LOGIN_METHOD } from '@/lib/login';

export interface LoginProps {
  getChallenge: (publicKey: string, loginMethod: LOGIN_METHOD) => Promise<string>;
  submitChallengeResponse: (response: string, loginMethod: LOGIN_METHOD) => Promise<void>;
  generateNewAccount: () => Promise<void>;
}

export function Login(props: LoginProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [loginMethod, setLoginMethod] = useState<LOGIN_METHOD>(LOGIN_METHOD.MANUAL); // ['MANUAL', 'NOSTR'
  const [isBusy, setIsBusy] = useState(false);
  const [hasError, setHasError] = useState<string | null>(null);
  // challenge from API
  const [challenge, setChallenge] = useState<string | null>(null);
  // challenge response from user
  const [challengeResponse, setChallengeResponse] = useState<string | null>(null);

  const iSetLoginMethod = (loginMethod: string) => {
    setHasError(null);
    if (loginMethod === 'MANUAL') {
      setLoginMethod(LOGIN_METHOD.MANUAL);
    } else if (loginMethod === 'NOSTR') {
      setLoginMethod(LOGIN_METHOD.NOSTR);
    }
  };

  const formRequest = useForm({
    initialValues: {
      publicKey: '',
    },

    validate: {
      publicKey: (value) => (value ? null : 'Public key is required'),
    },
  });

  const formResponse = useForm({
    initialValues: {
      challengeResponse: '',
    },

    // validate: {
    //   challengeResponse: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    // },
  });

  const generateNewAccount = async () => {
    setIsBusy(true);
    try {
      await props.generateNewAccount();
    } catch (e) {
      setHasError(`Error: ${e}`);
      console.error(e);
    } finally {
      setIsBusy(false);
    }
  };

  const requestChallenge = async () => {
    setIsBusy(true);
    try {
      const challenge = await props.getChallenge(formRequest.values.publicKey, loginMethod);
      console.log('challenge', challenge);
      setChallenge(challenge);
      setActiveStep(1);
    } catch (e) {
      setHasError(`Error: ${e}`);
      console.error(e);
    } finally {
      setIsBusy(false);
    }
  };

  const submitChallengeResponse = async () => {
    await props.submitChallengeResponse(formResponse.values.challengeResponse, loginMethod);
  };

  const getNostrPublicKey = async () => {
    try {
      const publicKey = await window.nostr.getPublicKey();
      formRequest.setValues({ publicKey });
    } catch (e) {
      setHasError(`Error: ${e}`);
      console.error(e);
    }
  };

  const solveChallengeWithNostr = async () => {
    // TODO
    // const event = async window.nostr.signEvent(event)
    setChallengeResponse('challengeResponse');
  };

  const NostrPublicKeyReq = () => (
    <Button type="button" onClick={getNostrPublicKey} mb="md">
      Get public key from extention
    </Button>
  );

  const ErrorMessage = () => (
    <Text color="red" mb="md">
      {hasError}
    </Text>
  );

  return (
    <Stepper active={activeStep}>
      <Stepper.Step label="Step 1" description="Enter key">
        <Box maw={340} mx="auto">
          <SegmentedControl
            mb="md"
            value={loginMethod}
            onChange={iSetLoginMethod}
            data={[
              { label: 'Manual', value: LOGIN_METHOD.MANUAL },
              { label: 'Nostr', value: LOGIN_METHOD.NOSTR },
            ]}
          />
          {hasError && <ErrorMessage />}
          <form onSubmit={formRequest.onSubmit((values) => requestChallenge())}>
            {loginMethod === LOGIN_METHOD.NOSTR ? (
              <NostrPublicKeyReq />
            ) : (
              <>
                <TextInput
                  withAsterisk
                  label="Enter your public key"
                  placeholder="abc"
                  {...formRequest.getInputProps('publicKey')}
                />

                <Group justify="flex-end" mt="md">
                  <Button
                    type="submit"
                    variant="outline"
                    onClick={generateNewAccount}
                    loading={isBusy}
                  >
                    New Account
                  </Button>
                  <Button type="submit" loading={isBusy}>
                    Submit
                  </Button>
                </Group>
              </>
            )}
          </form>
        </Box>
      </Stepper.Step>
      <Stepper.Step
        label="Step 2"
        description="Authenticate"
        completedIcon={<IconCircleX style={{ width: rem(20), height: rem(20) }} />}
      >
        <Box maw={340} mx="auto">
          {hasError && <ErrorMessage />}
          <form onSubmit={formResponse.onSubmit(() => submitChallengeResponse())}>
            {loginMethod === LOGIN_METHOD.MANUAL ? (
              <>
                <Text>
                  Challenge: <code>{challenge}</code>
                </Text>
                <TextInput
                  withAsterisk
                  label="Enter your challenge response"
                  placeholder="abc"
                  {...formResponse.getInputProps('challengeResponse')}
                />
                <Text></Text>
                <Group justify="flex-end" mt="md">
                  <Button type="button" variant="outline" onClick={() => setActiveStep(0)}>
                    back
                  </Button>
                  <Button type="submit" loading={isBusy}>
                    Submit
                  </Button>
                </Group>
              </>
            ) : (
              <>
                <Group mb="md">
                  <Button type="button" variant="outline" onClick={() => setActiveStep(0)}>
                    back
                  </Button>
                  <Button type="button" onClick={solveChallengeWithNostr}>
                    Login with extention
                  </Button>
                </Group>
                <Text>Your Nostr extention will prompt you to sign the challenge proof.</Text>
              </>
            )}
          </form>
        </Box>
      </Stepper.Step>
    </Stepper>
  );
}
