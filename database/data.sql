INSERT INTO "users" ("email", "password")
  VALUES ('test@test.com', 'pass')
  RETURNING *;

INSERT INTO "boards" ("userId", "name")
  VALUES (1, 'code journal' ),
          (1, 'secret project'),
          (1, 'typescript project')
  RETURNING *;


INSERT INTO "columns" ("boardId", "name")
  VALUES (1, 'todos'),
          (1, 'in progress'),
          (1, 'done')
   RETURNING *;

INSERT INTO "cards" ("columnId", "boardId", "name", "description")
    VALUES (1, 1, 'sql outer join', 'is it the same as mongo populate?'),
          (1, 1, 'react context', 'would it help?'),
          (1, 1, 'drag and drop', 'should I use react beautiful dnd. what is react ref?')
RETURNING *;

INSERT INTO "tags" ("boardId", "text", "color")
    VALUES (1, 'refactor', 'yellow'),
            (1, 'bugfix', 'red'),
            (1, 'feature', 'blue'),
            (1, 'needs review', 'green'),
            (1, 'database', 'pink')
        RETURNING *;

INSERT INTO "tagsCards" ("cardId", "tagId")
    VALUES (1, 1),
            (1, 2),
            (2, 3),
            (2, 4),
            (3, 5)
        RETURNING *;
