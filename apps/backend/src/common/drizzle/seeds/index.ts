import { hash } from 'argon2';
import { drizzle } from 'drizzle-orm/postgres-js';
import { eq, sql } from 'drizzle-orm';
import { migrationClient } from '../conn';
import * as schema from '../tables';
import faculties from './mocks/faculties.json';
import identities from './mocks/identities.json';
import identities_roles from './mocks/identities_roles.json';
import permissions from './mocks/permissions.json';
import permissions_systems from './mocks/permissions_systems.json';
import personnel from './mocks/personnel.json';
import roles from './mocks/roles.json';
import roles_permissions from './mocks/roles_permissions.json';
import systems from './mocks/systems.json';
import curriculums from './mocks/curriculums.json';
import curriculum_general_info from './mocks/curriculum_general_info.json';
import curriculum_applications from './mocks/curriculum_applications.json';
import students from './mocks/students.json';

const db = drizzle(migrationClient, { schema });

async function run() {
  const idns = await Promise.all(
    identities.map(async (idn) => ({ ...idn, status: idn.status as 'active', password: await hash(idn.password) })),
  );

  console.log('Cleaning existing data...');
  // Delete in order to respect foreign keys
  await db.delete(schema.identityRoles);
  await db.delete(schema.rolePermissions);
  await db.delete(schema.permissionSystems);
  await db.delete(schema.approvalActions);
  await db.delete(schema.budgetEstimates);
  await db.delete(schema.learningOutcomes);
  await db.delete(schema.courseStructures);
  await db.delete(schema.curriculumApplications);
  await db.delete(schema.curriculumGeneralInfo);
  await db.delete(schema.curriculums);
  await db.delete(schema.educations);
  await db.delete(schema.personnel);
  await db.delete(schema.students);
  await db.delete(schema.identities);
  await db.delete(schema.roles);
  await db.delete(schema.permissions);
  await db.delete(schema.systems);
  await db.delete(schema.faculties);

  // master data
  console.log('Seeding master data...');
  await db.insert(schema.faculties).values(faculties);
  await db.insert(schema.identities).values(idns);
  await db.insert(schema.permissions).values(permissions);
  await db.insert(schema.personnel).values(personnel);
  await db.insert(schema.students).values(students);
  await db.insert(schema.roles).values(roles.map((r) => ({ ...r, type: r.type as any })));
  await db.insert(schema.systems).values(systems);
  await db.insert(schema.curriculums).values(curriculums as any);

  // detail data
  console.log('Seeding detail data...');
  await db.insert(schema.curriculumGeneralInfo).values(curriculum_general_info as any);
  await db.insert(schema.curriculumApplications).values(curriculum_applications as any);

  // relation data
  console.log('Seeding relation data...');
  await db.insert(schema.identityRoles).values(identities_roles);
  await db.insert(schema.rolePermissions).values(roles_permissions);
  await db.insert(schema.permissionSystems).values(permissions_systems);
  
  console.log('Seeding completed successfully!');
}

run()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
