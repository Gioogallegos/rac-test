// src/app/models/user.model.ts
export interface Address { street: string; city: string; zipcode: string; }
export interface Company { name: string; }
export interface User {
  id: number;
  name: string;
  email: string;
  address: Address;
  company: Company;
}
