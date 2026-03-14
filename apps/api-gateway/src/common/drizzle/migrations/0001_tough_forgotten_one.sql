CREATE TYPE "public"."curriculum_approval_step" AS ENUM('UNDER_CONSIDERATION', 'ACADEMIC_COMMITTEE', 'ACADEMIC_COUNCIL', 'UNIVERSITY_COUNCIL', 'APPROVED');--> statement-breakpoint
CREATE TYPE "public"."curriculum_course_type" AS ENUM('NON_DEGREE', 'DEGREE');--> statement-breakpoint
CREATE TYPE "public"."curriculum_expense_category" AS ENUM('COMPENSATION', 'EXPENSES', 'MATERIAL');--> statement-breakpoint
CREATE TYPE "public"."curriculum_status" AS ENUM('DRAFT', 'SUBMITTED', 'IN_PROGRESS', 'REJECTED', 'APPROVED');--> statement-breakpoint
ALTER TYPE "public"."enum_role_type" RENAME TO "authentication_role_type";--> statement-breakpoint
CREATE TABLE "approval_actions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"curriculumId" uuid NOT NULL,
	"approvedBy" varchar(255) NOT NULL,
	"approvalStep" "curriculum_approval_step" NOT NULL,
	"agendaNumber" integer NOT NULL,
	"isApproved" boolean NOT NULL,
	"meetingTitle" varchar(255) NOT NULL,
	"remarks" varchar(255),
	"attachmentUrls" text[] DEFAULT '{}',
	"meetingTime" varchar(255) NOT NULL,
	"meetingDate" date DEFAULT now(),
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "budget_estimates" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"category" "curriculum_expense_category" NOT NULL,
	"itemName" varchar(255) NOT NULL,
	"estimatedCost" integer NOT NULL,
	"curriculumId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "course_structures" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"competencies" varchar(255) NOT NULL,
	"learningHours" jsonb NOT NULL,
	"deliveryFormats" varchar(255)[] DEFAULT '{}',
	"curriculumId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "curriculum_applications" (
	"id" uuid PRIMARY KEY NOT NULL,
	"minimumEnrollment" integer NOT NULL,
	"courseFee" integer DEFAULT 0 NOT NULL,
	"qualificationRequirements" varchar(255)[] DEFAULT '{}',
	"additionalConditions" varchar(255)[] DEFAULT '{}',
	"attachmentUrl" varchar(255)
);
--> statement-breakpoint
CREATE TABLE "curriculum_general_info" (
	"id" uuid PRIMARY KEY NOT NULL,
	"generalInfo" jsonb NOT NULL,
	"model" varchar(255) NOT NULL,
	"type" varchar(255) NOT NULL,
	"benefits" varchar(255)[] DEFAULT '{}'
);
--> statement-breakpoint
CREATE TABLE "curriculums" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"objectives" varchar(255)[] DEFAULT '{}',
	"content" varchar(255) NOT NULL,
	"requestedBy" varchar(255) NOT NULL,
	"status" "curriculum_status" DEFAULT 'DRAFT',
	"currentStep" "curriculum_approval_step",
	"rejectionNote" varchar(255),
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "learning_outcomes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"outcome" varchar(255) NOT NULL,
	"teachingStrategy" varchar(255) NOT NULL,
	"assessmentStrategy" varchar(255) NOT NULL,
	"curriculumId" uuid NOT NULL
);
--> statement-breakpoint
ALTER TABLE "approval_actions" ADD CONSTRAINT "approval_actions_curriculumId_curriculums_id_fk" FOREIGN KEY ("curriculumId") REFERENCES "public"."curriculums"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "budget_estimates" ADD CONSTRAINT "budget_estimates_curriculumId_curriculums_id_fk" FOREIGN KEY ("curriculumId") REFERENCES "public"."curriculums"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "course_structures" ADD CONSTRAINT "course_structures_curriculumId_curriculums_id_fk" FOREIGN KEY ("curriculumId") REFERENCES "public"."curriculums"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "curriculum_applications" ADD CONSTRAINT "curriculum_applications_id_curriculums_id_fk" FOREIGN KEY ("id") REFERENCES "public"."curriculums"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "curriculum_general_info" ADD CONSTRAINT "curriculum_general_info_id_curriculums_id_fk" FOREIGN KEY ("id") REFERENCES "public"."curriculums"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "learning_outcomes" ADD CONSTRAINT "learning_outcomes_curriculumId_curriculums_id_fk" FOREIGN KEY ("curriculumId") REFERENCES "public"."curriculums"("id") ON DELETE no action ON UPDATE no action;