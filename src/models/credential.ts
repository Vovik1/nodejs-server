export interface Credential {
    email: string,
    password: string
}
export interface ISignUp extends Credential{
    name: string
}

