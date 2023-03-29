CREATE TABLE "mcsps"(
    "id" BIGINT NOT NULL,
    "start" DATE NOT NULL,
    "end" DATE NOT NULL,
    "code" VARCHAR(255) NOT NULL,
    "mcsp_name" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "mcsps" ADD PRIMARY KEY("id");
CREATE TABLE "tasks"(
    "id" BIGINT NOT NULL,
    "task" VARCHAR(255) NOT NULL,
    "complete" BOOLEAN NOT NULL,
    "complete_date" DATE NULL,
    "due" DATE NOT NULL,
    "user" BIGINT NOT NULL
);
ALTER TABLE
    "tasks" ADD PRIMARY KEY("id");
CREATE TABLE "users"(
    "id" BIGINT NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "admin" BOOLEAN NOT NULL,
    "mcsp" VARCHAR(255) NULL,
    "sep_date" DATE NULL,
    "branch" VARCHAR(255) NULL,
    "family" BOOLEAN NULL,
    "barracks" BOOLEAN NULL
);
ALTER TABLE
    "users" ADD PRIMARY KEY("id");
ALTER TABLE
    "users" ADD CONSTRAINT "users_email_unique" UNIQUE("email");
CREATE TABLE "messages"(
    "id" BIGINT NOT NULL,
    "to" VARCHAR(255) NOT NULL,
    "from" VARCHAR(255) NOT NULL,
    "body" VARCHAR(255) NOT NULL,
    "date" DATE NOT NULL
);
ALTER TABLE
    "messages" ADD PRIMARY KEY("id");
ALTER TABLE
    "messages" ADD CONSTRAINT "messages_from_foreign" FOREIGN KEY("from") REFERENCES "users"("id");
ALTER TABLE
    "messages" ADD CONSTRAINT "messages_to_foreign" FOREIGN KEY("to") REFERENCES "users"("id");
ALTER TABLE
    "tasks" ADD CONSTRAINT "tasks_user_foreign" FOREIGN KEY("user") REFERENCES "users"("id");
ALTER TABLE
    "users" ADD CONSTRAINT "users_mcsp_foreign" FOREIGN KEY("mcsp") REFERENCES "mcsps"("id");