const crypto = require('crypto')


const hash = (password) => {
    //salt
    const slated = "_asuh" + password + "dfdsfsdf_sdfsd"
    return crypto.createHash('md5').update(slated).digest('hex')
}

const compare = (raw, hashed) => {
    return hash(raw) === hashed
}

module.exports = {
    hash: hash,
    compare: compare
}