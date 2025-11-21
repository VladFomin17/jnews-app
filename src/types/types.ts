export interface LoginInfoType {
    username: string;
    password: string;
}

export interface SignUpUserType extends LoginInfoType{
    confirmPassword: string;
    email: string;
    avatar?: File | null;
}

export interface UserDataType {
    id: number;
    username: string;
    email: string;
    role: RoleType;
    avatar?: string;
    visitsCount: number;
}

export type RoleType = 'VISITOR' | 'MODERATOR' | 'ADMIN';