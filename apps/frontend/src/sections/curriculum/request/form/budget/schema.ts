import { z } from 'zod';

const ExpenseEstimateCategoryEnum = z.object({
  category: z.enum(['COMPENSATION', 'EXPENSES', 'MATERIAL']),
  name: z.string(),
  cost: z.number().nonnegative(),
});

export const CurriculumReqBudgetFormSchema = z.object({
  activityId: z.string().uuid(),
  minimumRegister: z.number().nonnegative(),
  hasFee: z.string().regex(/^(0|1)$/),
  fee: z.number().nonnegative(),
  expenseEstimates: z.array(ExpenseEstimateCategoryEnum),
  applicantQualifications: z.array(z.object({ condition: z.string().min(1) })),
  applicantQualificationConditions: z.array(z.object({ condition: z.string() })),
  attachFile: z.string().optional(),
});
