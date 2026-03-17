const mongoose = require("mongoose");

let cachedConnection = null;
let connectionPromise = null;

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

  connectionPromise = mongoose
    .connect(mongoUri)
    .then((connection) => {
      cachedConnection = connection;
      console.log("Conexao bem-sucedida ao banco de dados MongoDB!");
      return connection;
    })
    .catch((error) => {
      connectionPromise = null;
      console.log("Erro ao conectar ao banco de dados:", error.message);
      throw error;
    });

  return connectionPromise;
};

module.exports = {
  connectToDatabase,
};
