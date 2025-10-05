export interface ISecurePassword {

    validatePassword(passWord: string, ogPassWord: string): Promise<boolean>;
    secure(passWord: string): Promise<string>;
}