import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
import { RefreshToken } from '../models/refreshtoken';
import { ONE_HOUR } from '../configs/auth-config';

// // small functions
export const generateJwtToken = (account: any) => {
  // create a jwt token containing the account id that expires in 15 minutes
  return jwt.sign({ account }, process.env.NX_JWT_SECRET, {
    expiresIn: '1m',
  });
};

function randomTokenString() {
  return crypto.randomBytes(40).toString('hex');
}

export const generateRefreshToken = async (account: any) => {
  // create a refresh token that expires in 7 days
  return await RefreshToken.create({
    userId: account._id,
    token: randomTokenString(),
    expires: new Date(Date.now() + ONE_HOUR).toISOString(),
    isActive: true,
  });
};

export const basicDetails = (account: any) => {
  return {
    id: account._id,
    firstname: account.firstname,
    lastname: account.lastname,
    email: account.email,
    profileUrl: account.profileUrl,
  };
};

// Hash password
export const hash = (password: string) => {
  return bcrypt.hashSync(password, 10);
};
