import Joi from "joi";
import UserCreateType from "../types/user.type";

export const registerValidation = (data: UserCreateType) => {
    const schema = Joi.object({
        fullname: Joi.string().min(6).required(),
        username: Joi.string().required(),
        password: Joi.string().min(6).required(),
        phone: Joi.string().min(6).required(),
    });

    return schema.validate(data, { abortEarly: false });
}