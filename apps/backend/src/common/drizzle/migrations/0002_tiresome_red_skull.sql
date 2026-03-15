CREATE TABLE "students" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"studentId" varchar(255) NOT NULL,
	"firstname" varchar(255) NOT NULL,
	"lastname" varchar(255) NOT NULL,
	"phone" varchar(255),
	"email" varchar(255),
	"facultyId" uuid,
	"program" varchar(255),
	"year" integer,
	CONSTRAINT "students_studentId_unique" UNIQUE("studentId")
);
