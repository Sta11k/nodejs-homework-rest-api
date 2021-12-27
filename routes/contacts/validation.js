import Joi from "joi";
import { MAX_AGE, MIN_AGE } from "../../lib/constants";

const newSchema = Joi.object({
  name: Joi.string().min(2).max(33).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  age:Joi.number().integer().min(MIN_AGE).max(MAX_AGE).optional()
});

const updateSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().optional(),
  age: Joi.number().integer().min(MIN_AGE).max(MAX_AGE).optional(),
  favorite:Joi.bool().optional()
}).or("name", "email", "phone", "age");

const validateFavoriteSchema = Joi.object({
  favorite:Joi.bool().required()
})

const idSchema = Joi.object({ id: Joi.string().required() });

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

export const validateFavorite = async (req, res, next) => {
  try {
  await validateFavoriteSchema.validateAsync(req.body);
  } catch (err) {
    const [{ type }] = err.details;
    if (type === "object.missing") {
      return res.status(400).json({ message: 'missing fields favorite' });
    }
    return res.status(400).json({ message: err.message });
  }
  next();
};


export const validateId = async (req, res, next) => {
  try {
    await idSchema.validateAsync(req.params);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
  next();
};


