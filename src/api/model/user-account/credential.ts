export enum CredentialType {
  EMAIL_AND_PASSWORD = 'EMAIL_AND_PASSWORD',
  FACEBOOK= 'FACEBOOK',
  GOOGLE= 'GOOGLE'
}

export interface Credential {
  type: CredentialType;
}

export interface EmailAndPasswordCredential extends Credential {
  type: CredentialType.EMAIL_AND_PASSWORD;
  email: string;
  password: string;
}

export interface FacebookCredential extends Credential {
  type: CredentialType.FACEBOOK;
  accessToken: string;
  userId: string;
}

export interface GoogleCredential extends Credential {
  type: CredentialType.GOOGLE;
  accessToken: string;
  userId: string;
}