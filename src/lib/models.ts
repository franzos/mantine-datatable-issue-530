export interface User {
  id: string;
  public_key: string;
  created_at: Date;
  updated_at: Date;
}

export interface VerifiedEmail {
  id: string;
  user_id: string;
  email: string;
  is_verified: boolean;
  last_requested_at: Date;
  request_count: number;
  created_at: Date;
  updated_at: Date;
}

export interface HttpVerfiedEmail {
  id: string;
  user_id: string;
  email: string;
  is_verified: boolean;
  created_at: Date;
}

export interface HttpNewVerifiedEmail {
  email: string;
}

export interface Form {
  id: string;
  title: string;
  user_id: string;
  filter_spam: boolean;
  redirect_url: string;
  created_at: Date;
  updated_at: Date;
}

export interface HttpNewForm {
  title: string;
}

export interface UpdateForm {
  title: string;
  filter_spam: boolean;
  redirect_url: string;
}

export interface FormsRecipient {
  id: string;
  form_id: string;
  email_id: string;
  created_at: Date;
  updated_at: Date;
}

// NewFormsRecipient
export interface HttpNewFormsRecipient {
  form_id: string;
  email_id: string;
}

export interface Message {
  id: string;
  form_id: string;
  data: any;
  is_spam: boolean;
  spam_score: number;
  user_marked_spam: boolean;
  src_ipv4: string;
  src_ipv6: string;
  src_agent: string;
  created_at: Date;
}

export interface Session {
  id: string;
  user_id: string;
  created_at: Date;
  expires_at: Date;
  logged_out_at: Date;
  updated_at: Date;
}
