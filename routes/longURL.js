const express = require('express');

const router = express.Router();

const Url = require('../models/urlModel');

const validUrl = require('valid-url');

const shortid = require('shortid');

// The API base Url endpoint
const baseUrl = 'http://localhost:8000/api';

router.post('/convert/short', async (req, res) => {
	const { longUrl } = req.body;

	if (!validUrl.isUri(baseUrl)) {
		return res.status(401).json('Invalid base URL');
	}

	const uniqueId = shortid.generate();

	if (validUrl.isUri(longUrl)) {
		try {
			let url = await Url.findOne({
				longUrl,
			});

			if (url) {
				res.json(url);
			} else {
				const shortUrl = baseUrl + '/' + uniqueId;

				url = new Url({
					longUrl,
					shortUrl,
					uniqueId,
					date: new Date(),
				});

				await url.save();
				res.json(url);
			}
		} catch (err) {
			console.log(err);
			res.status(500).json('Internal Server Error');
		}
	} else {
		res.status(401).json('Invalid longUrl');
	}
});

module.exports = router;
