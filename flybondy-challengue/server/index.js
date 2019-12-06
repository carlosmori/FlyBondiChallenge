const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const flightTicketsRouter = require('./routes/flightTicketsRouter');
// Allow cross-origin
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use('/flightTickets', flightTicketsRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
