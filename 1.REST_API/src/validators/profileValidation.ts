import Joi from 'joi';
import { password } from './passwordValidation';
import { Gender } from '../utils/types';

const genderValidator = (value: any, helpers: Joi.CustomHelpers) => {
  const validGenders: Gender[] = ['Male', 'Female', 'Other'];
  if (!validGenders.includes(value)) {
    return helpers.message({
      custom: `Gender must be one of: ${validGenders.join(', ')}`,
    });
  }
  return value;
};

const createUserSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.base': 'Email must be a string',
    'string.email': 'Email must be a valid email address',
    'any.required': 'Email is required',
  }),
  password: Joi.string().required().custom(password).messages({
    'string.base': 'Password must be a string',
    'any.required': 'Password is required',
  }),
  name: Joi.string().min(3).required().messages({
    'string.base': 'Name must be a string',
    'string.min': 'Name must be at least 3 characters long',
    'any.required': 'Name is required',
  }),
  dob: Joi.date().iso().required().messages({
    'date.base': 'Date of birth must be a valid date',
    'any.required': 'Date of birth is required',
  }),
  gender: Joi.string().custom(genderValidator).required().messages({
    'string.base': 'Gender must be a string',
    'any.required': 'Gender is required',
  }),
  address: Joi.string().min(10).required().messages({
    'string.base': 'Address must be a string',
    'string.min': 'Address must be at least 10 characters long',
    'any.required': 'Address is required',
  }),
  isSubscribed: Joi.boolean().required().messages({
    'any.required': 'Subscription status is required',
  }),
});

const updateUserSchema = Joi.object({
  dob: Joi.date().iso().optional().messages({
    'date.base': 'Date of birth must be a valid date',
  }),
  gender: Joi.string().custom(genderValidator).optional().messages({
    'string.base': 'Gender must be a string',
    'any.only': 'Gender must be Male, Female, or Other',
  }),
  address: Joi.string().min(10).optional().messages({
    'string.base': 'Address must be a string',
    'string.min': 'Address must be at least 10 characters long',
  }),
  subscribe: Joi.boolean().optional().messages({
    'any.required': 'Subscription status is required',
  }),
});

const changePasswordSchema = Joi.object({
  oldPassword: Joi.string().required().messages({
    'string.base': 'Old password must be a string',
    'any.required': 'Old password is required',
  }),
  newPassword: Joi.string().required().custom(password).messages({
    'string.base': 'New password must be a string',
    'any.required': 'New password is required',
  }),
});

export { createUserSchema, updateUserSchema, changePasswordSchema };
