const { Router } = require('express');

const router = Router();

router.use('/users', require('./users.routes'));
router.use('/artists', require('./artists.routes'));
router.use('/albums', require('./albums.routes'));
router.use('/music', require('./music.routes'));
router.use('/music-history', require('./musicHistory.routes'));
router.use('/search-history', require('./searchHistory.routes'));
router.use('/favorites', require('./favorites.routes'));

module.exports = router;
