INSERT INTO "users" ("email", "password")
  VALUES ('test@test.com', 'pass')
  RETURNING *;

INSERT INTO "boards" ("userId", "name")
  VALUES (1, 'code journal'),
          (1, 'secret project'),
          (1, 'typescript project')
  RETURNING *;
