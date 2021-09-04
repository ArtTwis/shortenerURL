const express = require('express');

const router = express.Router();

const Url = require('../models/urlModel');

router.get('/:uniqueId', async (req, res) => {
	try {
		const url = await Url.findOne({
			uniqueId: req.params.uniqueId,
		});
		if (url) {
			return res.redirect(url.longUrl);
		} else {
			return res.status(404).json('No URL Found');
		}
	} catch (err) {
		res.status(500).json('Internal Server Error');
	}
});

module.exports = router;
