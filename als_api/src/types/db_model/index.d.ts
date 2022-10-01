interface UserAttributesType {
  userId?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  country?: string;
  citizenship?: string;
  dob?: date;
  phone?: string;
  isActive?: boolean;
}

interface TempEmailPhoneType {
  tempEmailPhoneId?: number;
  type?: string;
  value?: string;
  otp?: string;
  sentTime?: Date;
  token?: string;
  noOfAttempts?: number;
  isVerified?: boolean;
}
