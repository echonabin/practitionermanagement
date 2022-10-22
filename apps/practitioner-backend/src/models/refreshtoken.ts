import mongoose from 'mongoose';

// Interface that describes the properties that are required to create a new User
interface RefreshTokenAttrs {
  user: string;
  token: string;
  expires: Date;
  isActive: boolean;
}

//  Interface that describes what a single user has
interface RefreshTokenDoc extends mongoose.Document {
  user: string;
  token: string;
  expires: Date;
  isActive: boolean;
}

// Interface that describes the properties that a User Model has (build method)
interface RefreshTokenModel extends mongoose.Model<RefreshTokenDoc> {
  build(attrs: RefreshTokenAttrs): RefreshTokenDoc;
}

const RefreshTokenSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
  token: {
    type: String,
    required: true,
  },
  expires: {
    type: Date,
    default: Date.now() + 7 * 24 * 60 * 60 * 1000,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

RefreshTokenSchema.statics.build = (attrs: RefreshTokenAttrs) => {
  return new RefreshToken(attrs);
};

const RefreshToken = mongoose.model<RefreshTokenDoc, RefreshTokenModel>(
  'RefreshToken',
  RefreshTokenSchema
);

export { RefreshToken };
