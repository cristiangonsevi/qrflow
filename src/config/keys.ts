import zod from 'zod';

const rawKeys = {
  MYVAR: process.env.MYVAR || 'default_value',
};

const validateEnv = zod.object({
  MYVAR: zod.number().min(1, 'MYVAR is required'),
});

export const keys = validateEnv.parse(rawKeys);
