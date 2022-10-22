import { Request, Response, NextFunction } from 'express';
import { RequestValidationError } from '../errors/request-validation-error';
import { User } from '../models/user';
import { RefreshToken } from '../models/refreshtoken';
import { AuthValidator } from '../validators/auth-validation';
import * as bcrypt from 'bcryptjs';
// utils
import {
  hash,
  generateJwtToken,
  generateRefreshToken,
  basicDetails,
} from '../utils/auth-utils';

// Register User
export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = AuthValidator.register_user(req.body);
  if (error) {
    next(new RequestValidationError(error));
  }
  const { firstname, lastname, email, password, profileUrl } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).send({
      errors: [{ message: 'Email already exists' }],
    });
  }

  const account = await User.build({
    firstname,
    lastname,
    email,
    password,
  });
  // hash password
  account.password = hash(password);
  // [TODO] - Add profileUrl (with s3 bucket)
  await account.save();

  res.status(200).json({
    message: 'User created successfully',
  });
};

// Login User
export const loginUser = async (req, res, next) => {
  const { error } = AuthValidator.login_user(req.body);
  if (error) {
    next(new RequestValidationError(error));
  }
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const isPasswordValid =
    user && (await bcrypt.compare(password, user.password));

  if (!user || !isPasswordValid) {
    return res.status(400).send({
      errors: [{ message: 'Email or password is incorrect' }],
    });
  } else {
    // Auth success so generate a jwt token and refresh token
    const jwtToken = generateJwtToken(user);
    const refreshToken = await generateRefreshToken(user);
    const { token, expires, isActive } = refreshToken;
    // return data
    res.status(200).json({
      ...basicDetails(user),
      jwtToken,
      refreshToken: {
        token,
        expires,
        isActive,
      },
    });
  }
};

// Refresh Token
export const refreshToken = async (req, res, next) => {
  const { token } = req.query;
  const r_token = await RefreshToken.findOne({
    where: {
      token: token,
    },
  }).select('-_id -__v');
  if (!r_token || !r_token.isActive || r_token.expires < new Date()) {
    return res.status(400).send({
      errors: [{ message: 'Invalid token' }],
    });
  }
  res.status(200).json({ r_token });
};
