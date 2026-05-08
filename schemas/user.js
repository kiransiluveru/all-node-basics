import mongoose from "mongoose";
import Joi from "joi";
import jsonwebtoken from "jsonwebtoken";
import config from "config";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 256,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 256,
    validate: {
      validator: function (v) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(v);
      },
      message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)",
    },
  },
});

userSchema.methods.generateJwtToken = function () {
  const payload = {
    _id: this._id,
    name: this.name,
    email: this.email,
  };
  return jsonwebtoken.sign(payload, config.get("jwt_secret_key"), { expiresIn: "1h" });
};

const User = mongoose.model("User", userSchema);

export function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(3).max(256).email().required(),
    password: Joi.string()
      .min(8)
      .max(30)
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
      .required()
      .messages({
        "string.pattern.base": "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)",
      }),
    age: Joi.number().optional(),
  });

  return schema.validate(user);
}

export function validateLogin(credentials) {
  const schema = Joi.object({
    email: Joi.string().min(3).max(256).email().required(),
    password: Joi.string()
      .min(8)
      .max(30)
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
      .required()
      .messages({
        "string.pattern.base": "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)",
      }),
  });

  return schema.validate(credentials, { stripUnknown: true });
}

export default User;
