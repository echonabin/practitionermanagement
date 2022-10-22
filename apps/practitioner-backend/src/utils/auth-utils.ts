import jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
import { AuthValidator } from '../validators/auth-validation';
import { User } from '../models/user';
import { Types } from 'mongoose';
import { RefreshToken } from '../models/refreshtoken';

type userType = typeof User.build & {
  _id: Types.ObjectId;
};

// // Auth portion when logining in
// export const authenticate = async ({
//   email,
//   password,
// }: {
//   email: string;
//   password: string;
// }) => {
//   const { error } = AuthValidator.login_user({ email, password });
//   if (error) throw new Error(error.details[0].message);
//   const user = await User.findOne({ email });
//   const isPasswordValid =
//     user && (await bcrypt.compare(password, user.password));
//   if (!user || !isPasswordValid) {
//     throw new Error('Email or password is incorrect');
//   } else {
//     // Auth success so generate a jwt token and refresh token
//     const jwtToken = generateJwtToken(user as unknown as userType);
//     const refreshToken = await generateRefreshToken(
//       user as unknown as userType
//     );

//     // return data
//     return {
//       ...basicDetails(user as unknown as userType),
//       jwtToken,
//       refreshToken,
//     };
//   }
// };

// // refetching refresh token
// export const refreshToken = async ({ token }: { token: string }) => {
//   const refreshToken = await getRefreshToken(token);
//   const { user } = refreshToken;

//   // replace old refresh token with a new one and save
//   const newRefreshToken = await generateRefreshToken(user);
//   refreshToken.revoked = Date.now();
//   refreshToken.replacedByToken = newRefreshToken.token;
//   await refreshToken.save();
//   await newRefreshToken.save();

//   // generate new jwt
//   const jwtToken = generateJwtToken(user);

//   // return basic details and tokens
//   return {
//     ...basicDetails(user),
//     jwtToken,
//     refreshToken: newRefreshToken.token,
//   };
// };

// // Create a new user
// export const register = async (params: any, origin: string) => {
//   const { error } = AuthValidator.register_user(params);
//   if (error) {
//     throw new Error(error.details[0].message);
//   }

//   // validate
//   if (await User.findOne({ where: { email: params.email } })) {
//     // send already registered error in email to prevent account enumeration
//     return await sendAlreadyRegisteredEmail(params.email, origin);
//   }

//   // create account object
//   const account = await User.create(params);

//   // hash password
//   account.password = hash(params.password);

//   // save account
//   await account.save();
// };

// // small functions
// const generateJwtToken = (account: userType) => {
//   // create a jwt token containing the account id that expires in 15 minutes
//   return jwt.sign({ account }, process.env.JWT_SECRET!, {
//     expiresIn: '1d',
//   });
// };

// function randomTokenString() {
//   return crypto.randomBytes(40).toString('hex');
// }

// const generateRefreshToken = async (account: userType) => {
//   // create a refresh token that expires in 7 days
//   return await RefreshToken.create({
//     userId: account._id,
//     token: randomTokenString(),
//     expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
//     isActive: true,
//   });
// };

// const basicDetails = (account: userType) => {
//   return {
//     id: account._id,
//   };
// };

// const getRefreshToken = async (token: string) => {
//   const refreshToken = await RefreshToken.findOne({
//     where: {
//       token: token,
//     },
//   });
//   if (!refreshToken || !refreshToken.isActive) throw new Error('Invalid token');
//   return refreshToken;
// };

// const sendAlreadyRegisteredEmail = async (email: string, origin: string) => {
//   let message;
//   if (origin) {
//     message = `<p>If you don't know your password please visit the <a href="${origin}/account/forgot-password">forgot password</a> page.</p>`;
//   } else {
//     message = `<p>If you don't know your password you can reset it via the <code>/account/forgot-password</code> api route.</p>`;
//   }

//   await sendEmail({
//     to: email,
//     subject: 'Sign-up Verification API - Email Already Registered',
//     html: `<h4>Email Already Registered</h4>
//                <p>Your email <strong>${email}</strong> is already registered.</p>
//                ${message}`,
//   });
// };

// const sendVerificationEmail = async (account: any, origin: string) => {
//   let message;
//   if (origin) {
//     const verifyUrl = `${origin}/account/verify-email?token=${account.verificationToken}`;
//     message = `<p>Please click the below link to verify your email address:</p>
//                    <p><a href="${verifyUrl}">${verifyUrl}</a></p>`;
//   } else {
//     message = `<p>Please use the below token to verify your email address with the <code>/account/verify-email</code> api route:</p>
//                    <p><code>${account.verificationToken}</code></p>`;
//   }

//   await sendEmail({
//     to: account.email,
//     subject: 'Sign-up Verification API - Verify Email',
//     html: `<h4>Verify Email</h4>
//                <p>Thanks for registering!</p>
//                ${message}`,
//   });
// };

// Hash password
export const hash = (password: string) => {
  return bcrypt.hashSync(password, 10);
};
