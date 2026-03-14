import { ApprovalActions, Curriculum } from 'src/common/drizzle';

export type RequestSubmittedPayload = Curriculum;
export class RequestSubmitted {
  constructor(public readonly payload: RequestSubmittedPayload) {}
}

export type ApprovalActionSubmittedPayload = ApprovalActions;
export class ApprovalActionSubmitted {
  constructor(public readonly payload: ApprovalActionSubmittedPayload) {}
}
