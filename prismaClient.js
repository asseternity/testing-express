// this programmatically checks what the NODE_ENV is set to from launch scripts and changes the DB from real to test one
const { PrismaClient } = require('@prisma/client');
const databaseUrl = process.env.NODE_ENV === 'test'
  ? process.env.TEST_DATABASE_URL
  : process.env.DATABASE_URL;

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: databaseUrl,
    },
  },
});

module.exports = prisma;