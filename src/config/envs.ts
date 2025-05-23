import 'dotenv/config';
import * as Joi from 'joi';

interface EnvVars {
  API_URL: string;
}

const envsSchema = Joi.object({
  API_URL: Joi.string().uri().required(),
}).unknown(true);
const result = envsSchema.validate(process.env);
const value = result.value as EnvVars;
const error = result.error;

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  API_URL: envVars.API_URL,
};
