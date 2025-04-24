import { nanoid } from 'nanoid';

export const generateTestLink = (): string => {
  return `http://localhost:3000/${nanoid(10)}`;
};