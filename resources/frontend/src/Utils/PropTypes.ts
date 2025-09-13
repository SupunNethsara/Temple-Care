import {CancelToken} from "axios";

export interface RegistrationFormProps {
    onClose: () => void;
    onSwitchToLogin: () => void;
}
export interface LoginFormProps {
    onClose: () => void;
    onSwitchToRegister: () => void;
    onLoginSuccess:(user, token: CancelToken) => void;
}
export  interface NavbarProps {
    onOpenLogin: () => void;
    onOpenRegister: () => void;
}
export interface RegistrationFormData {
    name: string;
    phone: string;
    email: string;
    password: string;
    password_confirmation: string;
    role: 'user' | 'admin' | 'student';
}
