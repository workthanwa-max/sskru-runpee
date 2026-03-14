CREATE TYPE "public"."enum_role_type" AS ENUM('STUDENT', 'PERSONNEL', 'ADMIN');--> statement-breakpoint
CREATE TABLE "identities" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"status" varchar DEFAULT 'active' NOT NULL,
	"systemUrls" varchar(255)[] DEFAULT '{}' NOT NULL,
	CONSTRAINT "identities_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE TABLE "identities_roles" (
	"identityId" uuid NOT NULL,
	"roleId" uuid NOT NULL,
	CONSTRAINT "identities_roles_identityId_roleId_pk" PRIMARY KEY("identityId","roleId")
);
--> statement-breakpoint
CREATE TABLE "permissions_systems" (
	"permissionId" uuid NOT NULL,
	"systemId" uuid NOT NULL,
	CONSTRAINT "permissions_systems_permissionId_systemId_pk" PRIMARY KEY("permissionId","systemId")
);
--> statement-breakpoint
CREATE TABLE "permissions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" varchar(255),
	CONSTRAINT "permissions_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "roles_permissions" (
	"roleId" uuid NOT NULL,
	"permissionId" uuid NOT NULL,
	CONSTRAINT "roles_permissions_roleId_permissionId_pk" PRIMARY KEY("roleId","permissionId")
);
--> statement-breakpoint
CREATE TABLE "roles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"type" "enum_role_type" NOT NULL,
	"description" varchar(255),
	CONSTRAINT "roles_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "systems" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"url" varchar(255) NOT NULL,
	"note" varchar(255),
	"loginRequired" boolean DEFAULT false NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	CONSTRAINT "systems_name_unique" UNIQUE("name"),
	CONSTRAINT "systems_url_unique" UNIQUE("url")
);
--> statement-breakpoint
CREATE TABLE "faculties" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"shortName" varchar(50),
	"parentId" uuid,
	"description" varchar(255)
);
--> statement-breakpoint
CREATE TABLE "personnel_educations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"personnelId" uuid NOT NULL,
	"degree" varchar(255) NOT NULL,
	"field" varchar(255) NOT NULL,
	"university" varchar(255) NOT NULL,
	"year" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "import_progress" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"label" varchar(255) NOT NULL,
	"total" integer NOT NULL,
	"processed" integer DEFAULT 0,
	"createdAt" date DEFAULT now() NOT NULL,
	"updatedAt" date
);
--> statement-breakpoint
CREATE TABLE "personnel" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"personnelId" varchar(255) NOT NULL,
	"phone" varchar(255) NOT NULL,
	"firstname" varchar(255) NOT NULL,
	"lastname" varchar(255) NOT NULL,
	"academicPosition" varchar(255),
	"highestEducation" varchar(255) NOT NULL,
	"programOrField" varchar(255) NOT NULL,
	"university" varchar(255) NOT NULL,
	"graduationYear" integer NOT NULL,
	"facultyIds" uuid[] DEFAULT '{}',
	CONSTRAINT "personnel_personnelId_unique" UNIQUE("personnelId")
);
--> statement-breakpoint
ALTER TABLE "identities_roles" ADD CONSTRAINT "identities_roles_identityId_identities_id_fk" FOREIGN KEY ("identityId") REFERENCES "public"."identities"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "identities_roles" ADD CONSTRAINT "identities_roles_roleId_roles_id_fk" FOREIGN KEY ("roleId") REFERENCES "public"."roles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "permissions_systems" ADD CONSTRAINT "permissions_systems_permissionId_permissions_id_fk" FOREIGN KEY ("permissionId") REFERENCES "public"."permissions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "permissions_systems" ADD CONSTRAINT "permissions_systems_systemId_systems_id_fk" FOREIGN KEY ("systemId") REFERENCES "public"."systems"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "roles_permissions" ADD CONSTRAINT "roles_permissions_roleId_roles_id_fk" FOREIGN KEY ("roleId") REFERENCES "public"."roles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "roles_permissions" ADD CONSTRAINT "roles_permissions_permissionId_permissions_id_fk" FOREIGN KEY ("permissionId") REFERENCES "public"."permissions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "faculties" ADD CONSTRAINT "faculties_parentId_faculties_id_fk" FOREIGN KEY ("parentId") REFERENCES "public"."faculties"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "personnel_educations" ADD CONSTRAINT "personnel_educations_personnelId_personnel_id_fk" FOREIGN KEY ("personnelId") REFERENCES "public"."personnel"("id") ON DELETE no action ON UPDATE no action;