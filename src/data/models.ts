export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  admin: boolean;
};

export interface Address {
  id?: number;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
};

export interface Participant {
  id?: number;
  userId: number;
  dob: Date;
  gender: "m" | "f";
  addressId: number;
};
