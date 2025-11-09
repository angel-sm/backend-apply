export interface DatabaseConfig {
  uri: string;
  options?: Record<string, any>;
}

export const getDatabaseConfig = (): DatabaseConfig => {
  const {
    MONGODB_URI = 'mongodb://localhost:27017/backend-apply',
    MONGODB_USER,
    MONGODB_PASSWORD,
    MONGODB_HOST,
    MONGODB_PORT,
    MONGODB_DATABASE,
  } = process.env;

  if (MONGODB_HOST && MONGODB_DATABASE) {
    const port = MONGODB_PORT || '27017';
    const auth =
      MONGODB_USER && MONGODB_PASSWORD
        ? `${MONGODB_USER}:${MONGODB_PASSWORD}@`
        : '';
    const uri = `mongodb://${auth}${MONGODB_HOST}:${port}/${MONGODB_DATABASE}`;

    return {
      uri,
    };
  }

  return {
    uri: MONGODB_URI,
  };
};
