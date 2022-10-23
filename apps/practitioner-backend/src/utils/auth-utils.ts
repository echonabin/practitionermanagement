import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
import { RefreshToken } from '../models/refreshtoken';
import * as moment from 'moment';

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
  // remove old refresh tokens
  const prevRefreshToken = await RefreshToken.findOne(
    { user: account._id, isActive: true },
    {},
    { sort: { created_at: -1 } }
  );
  if (prevRefreshToken) {
    prevRefreshToken.isActive = false;
    await prevRefreshToken.save();
  }
  // create a refresh token that expires in 7 days
  return await RefreshToken.create({
    user: account._id,
    token: randomTokenString(),
    expires: moment(new Date()).add(1, 'h').toISOString(),
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
