export enum RoleType {
  ADMIN = 'ADMIN',
  STUDENT = 'STUDENT',
  PERSONNEL = 'PERSONNEL',
}

export type Identity = {
  id: string;
  username: string;
  roles: RoleType[];
  systemUrls: string[];
};
