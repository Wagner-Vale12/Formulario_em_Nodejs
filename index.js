// const {Person} = require('./person');
const dotenv = require('dotenv');

dotenv.config(); // PRECISA VIAJAR ANTES DOS OUTROS REQUIRES

const { connectToDatabase } = require('./src/database/connect.js');
const app = require('./modules/express.js');

connectToDatabase();

// require('./modules/path.js');

// require('./fs.js');

// require('./modules/http.js');
const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Rodando com Express na porta ${port}!`));
