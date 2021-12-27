import Joi from "joi";
import mongoose from 'mongoose';
import { MAX_AGE, MIN_AGE, SKIP_ZERO } from "../../lib/constants";
const { Types  } = mongoose;


const newSchema = Joi.object({
  name: Joi.string().min(2).max(33).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  age: Joi.number().integer().min(MIN_AGE).max(MAX_AGE).optional(),
  favorite:Joi.bool().optional(),
});

const updateSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().optional(),
  age: Joi.number().integer().min(MIN_AGE).max(MAX_AGE).optional(),
  favorite:Joi.bool().optional()
}).or("name", "email", "phone", "age");

const updateFavoriteSchema = Joi.object({
  favorite:Joi.bool().required(),
})
const regularLimit = '\\d+';
const querySchema = Joi.object({
 
  // eslint-disable-next-line prefer-regex-literals
  limit: Joi.string().pattern(new RegExp(regularLimit)).optional(),
  skip: Joi.number().min(SKIP_ZERO).optional(),
  sortBy: Joi.string().valid('name', 'age', 'email', 'phone', 'favorite'),
  sortByDesc: Joi.string().valid('name', 'age', 'email', 'phone', 'favorite'),  
  // eslint-disable-next-line prefer-regex-literals
  filter:Joi.string().pattern(new RegExp('(name|email|age)\\|?(name|email|age)+')).optional(),
})


export const validateCreation = async (req, res, next) => {
  try {
    await newSchema.validateAsync(req.body);
  } catch (err) {
    return res.status(400).json({ message: "missing fields" });
  }
  next();
};

export const validateUpdate = async (req, res, next) => {
  try {
  await updateSchema.validateAsync(req.body);
  } catch (err) {
    const [{ type }] = err.details;
    if (type === "object.missing") {
      return res.status(400).json({ message: 'missing fields' });
    }
    return res.status(400).json({ message: err.message });
  }
  next();
};

export const validateUpdateFavorite = async (req, res, next) => {
  try {
  await updateFavoriteSchema.validateAsync(req.body);
  } catch (err) {
    const [{ type }] = err.details;
    if (type === 'object.missing') {
      return res.status(400).json({ message: 'missing field favorite' });
    }
    return res.status(400).json({ message: err.message });
  }
  next();
}


export const validateId = async (req, res, next) => {
  if (!Types.ObjectId.isValid(req.params.is)) { 
    return res.status(400).json({ message:'Invalid ObjectId'})
  }
  next();
};


export const validateQuery = async (req, res, next) => {
  try {
    await querySchema.validateAsync(req.query);
  } catch (err) {
    return res.status(400)
      .json({ message: "missing fields" });
    //  .json({ message: ` Field ${err.message.replace(/"/g, '')}` });

  }
  next();
};
