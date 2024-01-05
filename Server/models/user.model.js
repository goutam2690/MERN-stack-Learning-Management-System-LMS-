import { Schema, model } from "mongoose";
import crypto from "crypto";
// import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    fullName: {
      type: "String",
      required: true,
      minLength: 3,
      maxLength: 20,
      trim: true,
      lowercase: true,
    },

    email: {
      type: "String",
      required: true,
      trim: true,
      unique: true,
      match: [
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
        "Please Enter a valid email address",
      ],
    },

    password: {
      type: "String",
      required: true,
      trim: true,
      minLength: 5,
      selecct: false,
    },

    avatar: {
      public_id: {
        type: "String",
      },
      secure_url: {
        type: "String",
      },
    },

    role: {
      type: "String",
      enum: ["USER", "ADMIN"],
      default: "USER",
    },

    forgotPasswordToken : String,
    forgotPasswordExpiry : Date,
    subscription : {
      id : String,
      status : String
    }
  },
  {
    timestamps: true,
  }
);


// const error = userSchema.validateSync();
// assert.equal(error.errors['fullName'].message,"Name is required","Name should must be atleast 3 characters","Name should must be less than 20 characters");
// assert.equal(error.errors['email'].message,"Email is required","Please Enter a valid email address");
// assert.equal(error.errors['password'].message,"Password is required","Password should must be atleast 5 characters");


//before saving data into database call this function using pre
// userSchema.pre("save", async (next) => {
//   if (!this.isModified("password")) {
//     return next(); //if no changes in the model then return to save method of mongoose
//   }

//   password = await bcrypt.hash(this.password, 10);
// });

// userSchema.methods = {
//   generateJWTtoken: async() => {
//     return await jwt.sign(
//       {
//         id: this._id,
//         email: this.email,
//         subscription: this.subscription,
//         role: this.role,
//       },
//       process.env.JWT_SECRET,
//       {
//         expiresIn: "24h",
//       }
//     );
//   },
// };

userSchema.methods = {
  generatePasswordResetToken: async () => {
    const resetToken = crypto.randomBytes(20).toString("hex");

    // to encrypt token and update into database
    User.forgotPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    //expiry time of token
    User.forgotPasswordExpiry = Date.now() + 15 * 60 * 1000; //15 mins from now

    return resetToken;
  }
};

const User = model("User", userSchema);

export default User;
