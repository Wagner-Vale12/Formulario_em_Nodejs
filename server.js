const dotenv = require("dotenv");

dotenv.config();

const { connectToDatabase } = require("./src/database/connect");
const app = require("./modules/express");

connectToDatabase();

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Rodando com Express na porta ${port}!`));
