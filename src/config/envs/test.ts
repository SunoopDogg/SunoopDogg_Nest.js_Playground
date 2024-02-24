export const config = {
  db: {
    type: 'mysql',
    synchronize: process.env.DB_SYNCHRONIZE === 'true',
    logging: false,
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 3306,
    username: process.env.DB_USER || 'username',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'database',
    extra: {
      connectionLimit: 5,
    },
    autoLoadEntities: true,
  },
  graphql: {
    playground: false,
  },
};
