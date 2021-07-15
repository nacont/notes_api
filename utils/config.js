require('dotenv').config();
const PORT = process.env.PORT;

const MONGOBD_URI = process.env.NODE_ENV === 'test'
                  ? process.env.TEST_MONGODB_URI
                  : process.env.MONGOBD_URI;
    
module.exports = {
    MONGOBD_URI,
    PORT
}