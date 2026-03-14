export type IdentityRolesAssignedPayload = {
  identityId: string;
  roleIds: string[];
};
export class IdentityRolesAssigned {
  constructor(public readonly payload: IdentityRolesAssignedPayload) {}
}
