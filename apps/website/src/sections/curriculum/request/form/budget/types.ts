import { z } from 'zod';
import { CurriculumReqBudgetFormSchema } from './schema';

export type CurriculumReqBudgetForm = z.infer<typeof CurriculumReqBudgetFormSchema>;
export type EnumExpenseEstimateCategory = CurriculumReqBudgetForm['expenseEstimates'][number]['category'];
