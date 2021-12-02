# ProjectMap

 ProjectMap is a full stack project board application for developers who want to visualize and organize their projects. The app is inspired by the kanban board used in agile development methodologies.

## Live Site

Use ProjectMap to map out a complex project by breaking it up into small tasks and tracking their progress.

Try ProjectMap [here](https://project-board-345.herokuapp.com/)!

## Technologies Used

- React.js
- Express.js
- Node.js
- PostgresSQL
- HTML5
- CSS3
- Webpack
- Heroku

## Features

- User can create and delete project boards.
- User can add and delete columns from project boards.
- User create, delete, and edit task cards.
- User can add and remove color-coded labels from cards
- User can move task cards between columns.

## Preview

![ProjectMap](assets/demoCreate.gif)

![ProjectMap](assets/demoEdit.gif)

## Planned Features

- add drag and drop functionality to task cards
- allow users to authenticate through Github's OAuth implementation.

## Development

### System Requirements

- Node.js 10 or higher
- NPM 6 or higher
- PostgreSQL 12 or higher

### Getting Started

1. Clone the repository.

 ```shell
    git clone https://github.com/yunyunliu/project-map.git
    cd project-map
  ```
2. Install all dependencies with NPM.

 ```shell
    npm install
 ```

3. Import the example database to PostgreSQL.

 ```shell
    npm run db:import
 ```

4. Start the project. Once started you can view the application by opening http://localhost:3000 in your browser.

  ```shell
    npm run dev
  ```
