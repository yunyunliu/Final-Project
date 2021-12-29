require('dotenv/config');

const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL, { logging: false });

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (err) {
    console.error('Unable to connect to the database:', err.message);
    return process.exit(1);
  }
  return null;
};

module.exports = { connectDb, sequelize };
