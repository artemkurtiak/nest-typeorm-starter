import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

import { ValidationService } from '@shared/validation/validation.service';
import { EnvironmentSchema } from './schemas/environment.schema';
import type { EnvironmentType } from './types';

const expanded = dotenvExpand.expand(dotenv.config()).parsed;

export const Environment = ValidationService.validateWithZod(
  EnvironmentSchema,
  expanded,
) as EnvironmentType;
