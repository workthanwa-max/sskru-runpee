export enum RoleType {
  ADMIN = 'ADMIN',
  STUDENT = 'STUDENT',
  PERSONNEL = 'PERSONNEL',
}

export type Identity = {
  id: string;
  roles: RoleType[];
  systemUrls: string[];
};
