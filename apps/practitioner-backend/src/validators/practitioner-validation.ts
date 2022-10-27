import * as Joi from 'joi';

export const PractitionerValidator = {
  create_practitioner: (data: any) => {
    const schema = Joi.object({
      fullname: Joi.string().required(),
      email: Joi.string().email().required(),
      contact: Joi.string().required(),
      dob: Joi.date().required(),
      workingDays: Joi.number().required(),
      startTime: Joi.string().required(),
      endTime: Joi.string().required(),
      address: Joi.string().required(),
      isIcu: Joi.boolean().optional(),
      profileImage: Joi.string().optional(),
    });
    return schema.validate(data);
  },
  update_practitioner: (data: any) => {
    const schema = Joi.object({
      _id: Joi.number().forbidden(),
    })
      .min(1)
      .unknown(true);
    return schema.validate(data);
  },
};
