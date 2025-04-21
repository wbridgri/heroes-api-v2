const daoCommon = require('./common/daoCommon')

const heroDao = {
    ...daoCommon,
    ...require('./api/heroDao')
}

module.exports = {
    heroDao
}