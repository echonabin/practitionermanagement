import { Request, Response, NextFunction } from 'express';
import { RequestValidationError } from '../errors/request-validation-error';
import { User } from '../models/user';
import { AuthValidator } from '../validators/auth-validation';
// utils
import { hash } from '../utils/auth-utils';

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
