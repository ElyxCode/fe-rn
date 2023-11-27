// Generated by https://quicktype.io

export interface User {
    token: string;
    user:  UserProfile;
}

export interface UserProfile {
    id?:            number;
    name?:          string;
    avatar?:        string;
    email?:         string;
    created_at?:    string;
    phone?:         string;
    dui?:           string;
    nit?:           null;
    iva?:           string;
    occupation?:    Occupation;
    birthday?:      string;
    notifications?: boolean;
    bill_type?:     string|null;
    bill_entity?:   string|null;
}

export interface SignupResponse {
    status:  string;
    message: string;
    errors: SignupErrors;
}

export interface SignupErrors {
    name: string[];
    email: string[];
    phone: string[];
    password: string[];
}

export interface Occupation {
    id?:         number;
    name?:       string;
    created_at?: string;
    updated_at?: string;
}

export interface ErrorMessageLogin {
    error?: string;
}
