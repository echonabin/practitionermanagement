/* eslint-disable @typescript-eslint/ban-ts-comment */
import { expressjwt as jwt } from 'express-jwt';
import { Request, Response, NextFunction } from 'express';
import { User } from '../models/user';
import { RefreshToken } from '../models/refreshtoken';

// const shouldMockReturn = process.env.NODE_ENV === "test";

export const authorize = () => {
  return [
    // authenticate JWT token and attach user to request object (req.auth)
    jwt({ secret: process.env.NX_JWT_SECRET!, algorithms: ['HS256'] }),
    async (req: any, res: Response, next: NextFunction) => {
      const user = req.auth.account;
      const account = await User.findById({ _id: user._id });

      const refreshTokens = await RefreshToken.findOne({
        user: user._id,
      });

      if (!account) {
        // account no longer exists or role not authorized
        return res.status(401).json({ message: 'Unauthorized', status: 401 });
      }

      //   authentication and authorization successful
      user.ownsToken = (token: string) =>
        // @ts-ignore
        !!refreshTokens.find((x: any) => x.token === token);
      next();
    },
  ];
};
