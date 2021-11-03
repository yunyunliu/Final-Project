set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public.users" (
	"userId" serial NOT NULL,
	"password" TEXT NOT NULL,
	"email" TEXT NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.boards" (
	"boardId" serial NOT NULL,
	"userId" integer NOT NULL,
	"name" TEXT NOT NULL,
	CONSTRAINT "boards_pk" PRIMARY KEY ("boardId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.columns" (
	"boardId" integer NOT NULL,
	"columnId" serial NOT NULL,
	"name" TEXT NOT NULL,
	CONSTRAINT "columns_pk" PRIMARY KEY ("columnId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.cards" (
	"cardId" serial NOT NULL,
	"name" TEXT NOT NULL,
	"description" TEXT,
	"columnId" integer NOT NULL,
	"boardId" integer NOT NULL,
	"createdAt" TIMESTAMP NOT NULL,
	CONSTRAINT "cards_pk" PRIMARY KEY ("cardId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.tags" (
	"tagId" serial NOT NULL,
	"color" VARCHAR(255) NOT NULL,
	"text" TEXT,
	"boardId" integer NOT NULL,
	CONSTRAINT "tags_pk" PRIMARY KEY ("tagId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.tagsCards" (
	"cardId" integer NOT NULL,
	"tagId" integer NOT NULL,
	CONSTRAINT "tagsCards_pk" PRIMARY KEY ("cardId","tagId")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "boards" ADD CONSTRAINT "boards_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");

ALTER TABLE "columns" ADD CONSTRAINT "columns_fk0" FOREIGN KEY ("boardId") REFERENCES "boards"("boardId");

ALTER TABLE "cards" ADD CONSTRAINT "cards_fk0" FOREIGN KEY ("columnId") REFERENCES "columns"("columnId");
ALTER TABLE "cards" ADD CONSTRAINT "cards_fk1" FOREIGN KEY ("boardId") REFERENCES "boards"("boardId");

ALTER TABLE "tags" ADD CONSTRAINT "tags_fk0" FOREIGN KEY ("boardId") REFERENCES "boards"("boardId");

ALTER TABLE "tagsCards" ADD CONSTRAINT "tagsCards_fk0" FOREIGN KEY ("cardId") REFERENCES "cards"("cardId");
ALTER TABLE "tagsCards" ADD CONSTRAINT "tagsCards_fk1" FOREIGN KEY ("tagId") REFERENCES "tags"("tagId");
