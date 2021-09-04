const express = require('express');

const app = express();

const env = require('dotenv').config({ path: './.env' });

const PORT = process.env.PORT || 8000;

const bodyParser = require('body-parser');

const longUrl = require('./routes/longURL');

const shortUrl = require('./routes/shortURL');

const mongoose = require('mongoose');

// DB Connection
mongoose
	.connect(`${process.env.DB_PORT}/${process.env.DB_NAME}`, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('Db is connected!');
	})
	.catch((err) => {
		console.log(`Error : ${err}`);
	});

// Middlewares
app.use(bodyParser.json());

// Routes
app.use('/api', longUrl);
app.use('/api', shortUrl);

app.get('/api/secure/user/2', (req, res) => {
	return res.status(200).json({
		status: 'success',
		userName: 'Twinkle',
		lastName: 'Goyal',
		profession: 'Software Engineer',
		role: 'Developer',
	});
});

app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}!`);
});
