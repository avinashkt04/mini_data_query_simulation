import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET!;

const generateToken = (payload: string) => {
    return jwt.sign({payload}, SECRET, {expiresIn: '1h'});
}

const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, SECRET);
    } catch (error: any) {
        if(error.name === 'TokenExpiredError') {
            throw new Error('Token expired');
        }
        if(error.name === 'JsonWebTokenError') {
            throw new Error('Invalid token');
        }
        throw new Error('Token verification failed');
    }
}

export { generateToken, verifyToken };
