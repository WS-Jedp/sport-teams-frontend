import { ROLES } from '../roles'
export type UserInformation = {
    name: string,
    lastName: string,
    biography: string,
    photoUrl?: string,
    phoneNumber: string,
    birthdate: Date,
    role: ROLES,
    teamId?: string,
    email: string
}
