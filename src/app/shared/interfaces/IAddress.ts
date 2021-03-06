/**
 * IAddress
 */
export interface IAddress {
  id: number;
  userId: number;
  firstName: string;
  lastName: string;
  company: string;
  phone: string;
  address1: string;
  address2: string;
  city: string;
  country: string;
  zipCode: string;
  isDefault: boolean;
}

/**
 * Get IAddress
 * @returns IAddress
 */
export function getIAddress(): IAddress {
    return {
      id: 0,
      userId: 0,
      firstName: '',
      lastName: '',
      company: '',
      phone: '',
      address1: '',
      address2: '',
      city: '',
      country: '',
      zipCode: '',
      isDefault: false
    };
}
