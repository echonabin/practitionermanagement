/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request, Response, NextFunction } from 'express';
import { RequestValidationError } from '../errors/request-validation-error';
import { Practitioner } from '../models/practitioner';
import { PractitionerValidator } from '../validators/practitioner-validation';

// Create Practitioner
export const createPractitioner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = PractitionerValidator.create_practitioner(req.body);
  if (error) {
    next(new RequestValidationError(error));
  }
  const {
    fullname,
    email,
    contact,
    dob,
    workingDays,
    startTime,
    endTime,
    address,
  } = req.body;
  const practitioner = await Practitioner.findOne({ email, deletedBy: null });
  if (practitioner) {
    return res.status(400).send({
      errors: [{ message: 'Practitioner Email already exists' }],
    });
  }

  const account = await Practitioner.build({
    fullname,
    email,
    contact,
    dob,
    workingDays,
    startTime,
    endTime,
    address,
    // @ts-ignore
    createdBy: req.auth.account._id,
    // @ts-ignore
    profileImage: req.file.location as string,
  });
  await account.save();

  res.status(200).json({
    message: 'Practitioner created successfully',
  });
};

// Update Practitioner
export const updatePractitioner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = PractitionerValidator.update_practitioner(req.body);
  if (error) {
    next(new RequestValidationError(error));
  }
  const { id } = req.params;
  const practitioner = await Practitioner.findOne({ _id: id, deletedBy: null });
  if (!practitioner) {
    return res.status(400).send({
      errors: [{ message: 'Practitioner does not exist' }],
    });
  }
  let account;
  !req.file
    ? (account = await Practitioner.updateOne({ _id: id }, req.body))
    : (account = await Practitioner.updateOne(
        { _id: id },
        // @ts-ignore
        { ...req.body, profileImage: req.file.location as string }
      ));

  account &&
    res.status(200).json({
      message: 'Practitioner updated successfully',
    });
};

// Delete Practitioner
export const deletePractitioner = async (req: Request, res: Response) => {
  const { id } = req.params;
  const practitioner = await Practitioner.findOne({ _id: id, deletedBy: null });
  if (!practitioner) {
    return res.status(400).send({
      errors: [{ message: 'Practitioner does not exist' }],
    });
  }
  const account = await Practitioner.updateOne(
    { _id: id },
    // @ts-ignore
    { deletedBy: req.auth.account._id }
  );

  account &&
    res.status(200).json({
      message: 'Practitioner deleted successfully',
    });
};

// Get Practitioner
export const getPractitioner = async (req: Request, res: Response) => {
  const { id } = req.params;
  const practitioner = await Practitioner.findOne({ _id: id, deletedBy: null });
  if (!practitioner) {
    return res.status(400).send({
      errors: [{ message: 'Practitioner does not exist' }],
    });
  }
  res.status(200).json({
    message: 'Practitioner fetched successfully',
    practitioner,
  });
};

// Get Practitioners
export const getPractitioners = async (req: Request, res: Response) => {
  const practitioners = await Practitioner.find({ deletedBy: null });
  res.status(200).json({
    message: 'Practitioners fetched successfully',
    practitioners,
  });
};

// Hard Delete Practitioner
export const hardDeletePractitioner = async (req: Request, res: Response) => {
  const { id } = req.params;
  const practitioner = await Practitioner.findOne({ _id: id });
  if (!practitioner) {
    return res.status(400).send({
      errors: [{ message: 'Practitioner does not exist' }],
    });
  }
  const account = await Practitioner.deleteOne({ _id: id });

  account &&
    res.status(200).json({
      message: 'Practitioner deleted successfully',
    });
};
