import { Address, Participant, User } from "src/data";

export const testUser: User = {
  id: null,
  firstName: "Jonathan",
  lastName: "Payne",
  email: "payne.jonathan777@gmail.com",
  admin: false
};

export const testAddress: Address = {
  id: null,
  addressLine1: "123 Magic Rd",
  city: "Orlando",
  state: "FL"
}

export const testParticipant: Participant = {
  dob: new Date(2006, 7, 19),
  gender: "m",
  addressId: null,
  userId: null,
}
