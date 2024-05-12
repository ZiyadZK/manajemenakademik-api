const CryptoJS = require('crypto-js')

exports.decryptKey = async (token) => {
    try {
        const bytes = CryptoJS.AES.decrypt(token, process.env.PUBLIC_KEY)
        const payload = bytes.toString(CryptoJS.enc.Utf8)
        return {
            success: true,
            data: JSON.parse(payload)
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            token,
            debug: {
                message: error
            }
        }
    }
}

exports.encryptKey = async (payload) => {
    const data = typeof(payload) === 'object' ? `${JSON.stringify(payload)}` : payload.toString()
    const token = CryptoJS.AES.encrypt(data, process.env.PUBLIC_KEY)
    return token.toString()
}