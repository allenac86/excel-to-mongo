const notFound = (req, res) => {
	res.status(404).json({ msg: 'route not found' });
};

module.exports = notFound;
