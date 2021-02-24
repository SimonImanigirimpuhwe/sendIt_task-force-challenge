require('dotenv').config()

module.exports = {
  development: {
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    username: process.env.POSTGRES_USER,
    host: process.env.DB_HOSTNAME,
    url: process.env.DEV_DATABASE_URL,
    dialect: 'postgres',
  },
  test: {
    database: process.env.POSTGRES_DB_TEST,
    password: process.env.POSTGRES_PASSWORD_TEST,
    username: process.env.POSTGRES_USER_TEST,
    host: process.env.DB_HOSTNAME_TEST,
    url: process.env.TEST_DATABASE_URL,
    dialect: 'postgres',
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
  }
}
