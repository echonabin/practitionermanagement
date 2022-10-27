import mongoose from 'mongoose';

// Interface that describes the properties that are required to create a new Practitioner
interface PractitionerAttrs {
  fullname: string;
  email: string;
  contact: string;
  dob: string;
  workingDays: string;
  startTime: string;
  endTime: string;
  address: string;
  createdBy: string;
  deletedBy?: string;
  profileImage?: string;
  isIcu?: boolean;
}

//  Interface that describes what a single Practitioner has
interface PractitionerDoc extends mongoose.Document {
  fullname: string;
  email: string;
  contact: string;
  dob: string;
  workingDays: string;
  startTime: string;
  endTime: string;
  address: string;
  createdBy: string;
  deletedBy?: string;
  profileImage?: string;
  isIcu?: boolean;
}

// Interface that describes the properties that a Practitioner Model has (build method)
interface PractitionerModel extends mongoose.Model<PractitionerDoc> {
  build(attrs: PractitionerAttrs): PractitionerDoc;
}

const PractitionerSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    workingDays: {
      type: Number,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    isIcu: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    deletedBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    profileImage: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

PractitionerSchema.statics.build = (attrs: PractitionerAttrs) => {
  return new Practitioner(attrs);
};

const Practitioner = mongoose.model<PractitionerDoc, PractitionerModel>(
  'Practitioner',
  PractitionerSchema
);

export { Practitioner };
