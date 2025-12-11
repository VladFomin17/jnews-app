import type {RcFile} from "antd/es/upload";

export interface LoginInfoType {
    username: string;
    password: string;
}

export interface SignUpUserType extends LoginInfoType{
    confirmPassword: string;
    email: string;
    avatar: RcFile | null;
    role?: RoleType;
}

export interface UserDataType {
    id: number;
    username: string;
    email: string;
    role: RoleType;
    avatar?: string;
    visitsCount: number;
    password?: string;
}

export type RoleType = 'VISITOR' | 'MODERATOR' | 'ADMIN';

export interface NewsType {
    id: number;
    title: string;
    description: string;
    imageSrc: string;
}

export interface NewsFormType {
    title: string;
    description: string;
    image: RcFile | null;
}