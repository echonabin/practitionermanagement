import mongoose from 'mongoose';

// Interface that describes the properties that are required to create a new User
interface UserAttrs {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  profileUrl?: string;
}

//  Interface that describes what a single user has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  profileUrl?: string;
}

// Interface that describes the properties that a User Model has (build method)
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  profileUrl: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
