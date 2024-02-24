export const config = {
  db: {
    type: process.env.DB_TYPE || 'mysql',
    synchronize: process.env.DB_SYNCHRONIZE === 'true',
    logging: false,
    replication: {
      master: {
        host: process.env.DB_HOST || 'masterHost',
        port: process.env.DB_PORT || 3306,
        username: process.env.DB_USER || 'username',
        password: process.env.DB_PASSWORD || 'password',
        database: process.env.DB_NAME || 'database',
      },
      slaves: [
        {
          host: 'slaveHost',
          port: 3306,
          username: 'username',
          password: 'password',
          database: 'database',
        },
      ],
    },
    extra: {
      connectionLimit: 30,
    },
    autoLoadEntities: true,
  },
  graphql: {
    debug: false,
    playground: false,
  },
  foo: 'pro-bar',
};
