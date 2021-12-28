import Joi from 'joi'

const newSchema = Joi.object({
    name: Joi.string().min(2).max(33).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required()
})

const updateSchema = Joi.object({
    name: Joi.string().optional(),
    email: Joi.string().email().optional(),
    phone: Joi.string().optional(),
}).or('name', 'email', 'phone')

const idSchema = Joi.object({id:Joi.string().required()})


export const validateCreation = async (req, res, next)=>{ 

    try {
        const value = await newSchema.validateAsync(req.body)
    } catch (err) {
        return res.status(400).json({"message": "missing fields"})
    }
    next()
}


export const validateUpdate = async (req, res, next)=>{ 

    try {
        const value = await updateSchema.validateAsync(req.body)
    } catch (err) {
        const [{ type }] = err.detalis
        if (type === 'object.unknown') {
              return res.status(400).json({"message": err.message})
         }
        return res.status(400).json({"message": "missing fields"})
    }
    next()
}


export const validateId = async (req, res, next)=>{ 

    try {
        const value = await idSchema.validateAsync(req.params)
    } catch (err) {
        return res.status(400).json({"message": err.message})
    }
    next()
}
