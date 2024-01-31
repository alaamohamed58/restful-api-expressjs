import jwt from 'jsonwebtoken';
import config from 'config';

const jwtSecret = config.get<string>("jwtSecret")



export function signJwt(object: Object, options?: jwt.SignOptions | undefined) {

    return jwt.sign(object, jwtSecret as jwt.Secret)
}


export function verifyJwt(token: string) {

    try {
        const decoded = jwt.verify(token, jwtSecret as jwt.Secret)
        return {
            valid: true,
            expired: false,
            decoded
        }

    } catch (err: any) {
        return {
            valid: false,
            expired: err.message === 'jwt expired',
            decoded: null
        }
    }

}