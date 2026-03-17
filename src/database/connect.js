const mongoose = require("mongoose");

let cachedConnection = null;
let connectionPromise = null;

const sanitizeMongoUri = (mongoUri) =>
  mongoUri.replace(/\/\/([^:]+):([^@]+)@/, "//$1:***@");

const buildMongoUri = () => {
  if (process.env.MONGODB_URI) {
    return process.env.MONGODB_URI;
  }

  if (
    process.env.MONGODB_USER &&
    process.env.MONGODB_PASSWORD &&
    process.env.MONGODB_CLUSTER &&
    process.env.MONGODB_DB
  ) {
    return `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}/${process.env.MONGODB_DB}?retryWrites=true&w=majority`;
  }

  return "mongodb://127.0.0.1:27017/nodejs";
};

const connectToDatabase = async () => {
  if (cachedConnection) {
    return cachedConnection;
  }

  if (connectionPromise) {
    return connectionPromise;
  }

  const mongoUri = buildMongoUri();
  const isLocalFallback = mongoUri === "mongodb://127.0.0.1:27017/nodejs";

  if (process.env.VERCEL && isLocalFallback) {
    throw new Error(
      "MONGODB_URI nao foi configurada na Vercel. O app esta tentando usar o Mongo local."
    );
  }

  connectionPromise = mongoose
    .connect(mongoUri, {
      serverSelectionTimeoutMS: 10000,
    })
    .then((connection) => {
      cachedConnection = connection;
      console.log("Conexao bem-sucedida ao banco de dados MongoDB!");
      return connection;
    })
    .catch((error) => {
      connectionPromise = null;
      console.log("Falha ao conectar ao MongoDB.");
      console.log("URI usada:", sanitizeMongoUri(mongoUri));
      console.log("Erro:", error.message);
      throw error;
    });

  return connectionPromise;
};

module.exports = {
  connectToDatabase,
};
