export interface LoginInfoType {
    username: string;
    password: string;
}

export interface SignUpUserType extends LoginInfoType{
    confirmPassword: string;
    email: string;
    avatar?: File | null;
}