module.exports = {
  name: 'mongo',
  type: 'mongodb',
  url: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/linkApiChallenge`,
  useUnifiedTopology: true,
  logging: true,
  synchronize: true,
  entities: ['./src/modules/**/infra/typeorm/schemas/*.ts'],
};
