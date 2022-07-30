export enum GENDER {
  MALE = 'Male',
  FEMALE = 'Female',
  UNKNOWN = 'Unknown'
}

export enum ACCOUNT_TYPE {
  GOOGLE = 'Google',
  FACEBOOK = 'Facebook',
  REGULAR = 'Regular'
}

export enum ACCOUNT_STATUS {
  SUSPENDED = 'Suspended',
  PENDING = 'Pending',
  ACTIVE = 'Active'
}

export interface User {
  id: string;
  fullname: string;
  username: string;
  profilePicture: string;
  description: string;
  phoneNumber: string;
  email: string;
  gender: GENDER;
  birthPlace: string;
  birthDate: Date | string;
  city: string;
  hobby: string;
  password?: string;
  fcmToken: string;
  accountType: ACCOUNT_TYPE;
  thirdpartyAccountId: string;
  confirmationDate: Date;
  emailConfirmationCode: string;
  resetPwdVerificationCode: string;
  status: ACCOUNT_STATUS;
  lastLogin: Date;
  referralCode: string;
  refereeFrom: string;
  passwordAttemptsCount: number;
  lastPasswordAttemptsTry: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
