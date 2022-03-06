INSERT INTO "users" ("email", "password")
  VALUES ('test@test.com', 'pass')
  RETURNING *;

INSERT INTO "boards" ("userId", "name")
  VALUES  (1, 'typescript project'),
          (1, 'code journal' ),
          (1, 'recipe card app')
  RETURNING *;


INSERT INTO "columns" ("boardId", "name")
  VALUES (3, 'todos'),
          (3, 'in progress'),
          (3, 'done'),
          (2, 'pending'),
          (2, 'wip'),
          (2, 'under review'),
          (2, 'complete')
   RETURNING *;


INSERT INTO "cards" ("columnId", "boardId", "name", "description", "sequenceNum")
    VALUES (1, 3, 'style confirm modal', 'use a div with position:fixed', 0),
          (1, 3, 'add react context', 'decide where what contexts are needed and where to put provider components. or use redux instead', 1),
          (1, 3, 'implement drag and drop', 'research html drag and drop api', 2),
          (1, 3, 'find a data visualization library', 'which one is easier to use, chartjs or d3?', 3),
          (1, 3, 'refactor backend to use sequelize', '', 4),
          (2, 3, 'create app draw component for navigation', '', 0),
          (2, 3, 'change buttons in EditForm and AddForm to type submit', 'need to be type submit for required boolean attribute to work', 1),
          (2, 3, 'create Notification component for displaying error messages', '', 2),
          (2, 3, 'build out authentication', 'figure out how OAuth works', 3),
          (3, 3, 'trap focus on modals', 'do I need a library? focus-trap library?', 0),
          (3, 3, 'create endpoints', '', 1)
RETURNING *;

INSERT INTO "tags" ("boardId", "text", "color")
    VALUES (null, 'refactor', 'yellow'),
            (null, 'bug', 'red'),
            (null, 'feature', 'green'),
            (null, 'research', 'blue'),
            (null, 'database', 'pink'),
            (null, 'UI/CSS', 'light-blue'),
            (null, 'server', 'gray'),
            (null, 'testing', 'orange'),
            (null, 'HTML',  'purple')
        RETURNING *;

INSERT INTO "tagsCards" ("cardId", "tagId")
    VALUES (1, 1),
            (1, 2),
            (2, 3),
            (2, 4),
            (3, 5),
            (1, 6),
            (6, 6),
            (7, 4),
            (7, 6)
        RETURNING *;
