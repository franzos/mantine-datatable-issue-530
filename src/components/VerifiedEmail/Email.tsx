import { Text, Badge } from '@mantine/core';
import { VerifiedEmail } from '@/lib/models';

export interface VerifiedEmailProps {
  verifiedEmail: VerifiedEmail;
}

export function VerifiedEmail(props: VerifiedEmailProps) {
  return (
    <div>
      <Text>{props.verifiedEmail.email}</Text>
      <Badge>{props.verifiedEmail.is_verified ? 'verified' : 'not verified'}</Badge>
    </div>
  );
}
