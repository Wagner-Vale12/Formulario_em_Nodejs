// const {Person} = require('./person');
const dotenv = require('dotenv');

dotenv.config(); // PRECISA VIAJAR ANTES DOS OUTROS REQUIRES

const { connectToDatabase } = require('./src/database/connect.js');

connectToDatabase();



// require('./modules/path.js');

// require('./fs.js');

// require('./modules/http.js');

require('./modules/express.js');
