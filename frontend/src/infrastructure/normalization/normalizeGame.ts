import { z } from 'zod';

export const wordResponseSchema = z.object({
  word: z.string().length(5),
});

export const validateResponseSchema = z.object({
  isValid: z.boolean(),
});


export function normalizeWordResponse(data: unknown) {
  return wordResponseSchema.parse(data);
}

export function normalizeValidateResponse(data: unknown) {
  return validateResponseSchema.parse(data);
}
