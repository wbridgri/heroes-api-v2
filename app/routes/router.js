const express = require('express');
const router = express.Router();

const PORT = process.env.PORT || 3000

router.use(express.static('public'));

//  Root Route => localhost:3000/api
router.get('/api', (req, res) => {
    res.json({
        'Heroes': `http://localhost:${PORT}/api/hero`, //this endpoint 'hero' needs to match the same name for the mysql table
        'Franchises': `http://localhost:${PORT}/api/franchise`,
        'Powers': `http://localhost:${PORT}/api/power`,
        'Species': `http://localhost:${PORT}/api/species`,
        'Teams': `http://localhost:${PORT}/api/team`
    })
});

const endpoints = [
    'hero', 'power',
    'species'
]

endpoints.forEach(endpoint => {
    router.use(`/api/${endpoint}`, require(`./api/${endpoint}Routes`))
})



module.exports = router;