const { customAlphabet } = require("nanoid")

exports.randNumber = (length) => {
    const result = customAlphabet('1234567890', length)
    return result()
}