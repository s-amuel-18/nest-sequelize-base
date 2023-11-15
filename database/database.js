const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  development: {
    dialect: 'postgres',
    dialectOptions: {
      charset: 'utf8',
      collate: 'utf8_general_ci',
    },
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    logging: process.env.DB_LOGGING == 'true' ? true : false,
    synchronize: false,
    autoLoadModels: false,
    models: [],
  },
};
