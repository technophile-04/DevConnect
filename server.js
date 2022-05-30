const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json({ strict: false }));
app.use(morgan('short'));

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
