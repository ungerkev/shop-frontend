/**
 * IUser
 */
export interface IUser {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    isAdmin: boolean;
}

/**
 * Get IUser
 * @returns IUser
 */
export function getIUser(): IUser {
    return {
        id: 0,
        email: '',
        firstName: '',
        lastName: '',
        isAdmin: false,
    };
}

