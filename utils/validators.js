import Joi from "joi";

export const userInfoValidateSchema = Joi.object({ email: Joi.string().max(30).min(5).email().trim().lowercase() });
