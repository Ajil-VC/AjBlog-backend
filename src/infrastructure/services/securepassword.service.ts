import bcrypt from 'bcrypt';
import { ISecurePassword } from '../../domain/services/securepassword.interface';

export class SecurePasswordImp implements ISecurePassword {

    async validatePassword(passWord: string, ogPassWord: string): Promise<boolean> {

        const isPassWordValid = await bcrypt.compare(passWord, ogPassWord);
        if (isPassWordValid) return true;

        return false;
    }

    async secure(passWord: string): Promise<string> {

        try {

            const hashedP = await bcrypt.hash(passWord, 10);
            return hashedP;

        } catch (err) {
            throw new Error('Something went wrong while securing password.');
        }
    }
}