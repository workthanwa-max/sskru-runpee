import { Personnel } from 'src/common/drizzle';

export type PersonnelCreatedPayload = Personnel;
export class PersonnelCreated {
  constructor(public readonly payload: PersonnelCreatedPayload) {}
}
