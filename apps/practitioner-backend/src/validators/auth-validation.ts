import * as Joi from 'joi';

export const AuthValidator = {
  login_user: (data: any) => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });
    return schema.validate(data);
  },
  register_user: (data: any) => {
    const schema = Joi.object({
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string()
        .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
        .required()
        .min(8)
        .max(20),
      profileUrl: Joi.string(),
    });
    return schema.validate(data);
  },
};
