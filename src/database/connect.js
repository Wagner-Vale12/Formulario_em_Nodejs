const mongoose = require('mongoose');

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

    return 'mongodb://127.0.0.1:27017/nodejs';
};

const connectToDatabase = async () => {
    const mongoUri = buildMongoUri();

    try {
        await mongoose.connect(mongoUri);
        console.log('Configuracao do MongoDB:');
        console.log('URI:', mongoUri);
        console.log('Conexao bem-sucedida ao banco de dados MongoDB!');
    } catch (error) {
        console.log('Erro ao conectar ao banco de dados:', error.message);
    }
};

module.exports = {
    connectToDatabase
};
