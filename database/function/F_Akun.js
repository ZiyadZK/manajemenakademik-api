const { encryptKey } = require("../../libs/cryptor")
const { randNumber } = require("../../libs/functions/randNumber")
const { sendEmail } = require("../../libs/mailer")
const { M_DataAkun } = require('../model/M_Akun')

exports.F_Akun_validateLogin = async (payload) => {
    try {
        const data = await M_DataAkun.findOne({
            where: payload
        })

        if(!data || data === null || typeof(data) === 'undefined') {
            throw new Error('Email dan Password tidak ditemukan!')
        }

        
        const userdataToken = randNumber(6)
        const responseEmail = await sendEmail(payload.email_akun, 'Verifikasi PIN', `PIN Anda adalah ${userdataToken}`)
        console.log(responseEmail)
        // const responseEmail = {
        //     success: true
        // }
        if(responseEmail.success) {
            const userdata = {...data['dataValues'], userdataToken}
    
            const token = await encryptKey(userdata)
            console.log(userdata)
            
            return {
                success: true,
                token
            }
        }else{
            console.log(responseEmail)
            return {
                success: false,
                message: responseEmail.message
            }
        }
    } catch (error) {
        console.log(error.message)
        return {
            success: false,
            message: error.message
        }
    }
}

exports.F_Akun_getAll = async () => {
    try {
        const data = await M_DataAkun.findAll({
            raw: true
        })

        return {
            success: true,
            data
        }
    } catch (error) {
        console.log(error.message)
        return {
            success: false,
            message: error.message
        } 
    }
}

exports.F_Akun_create = async (payload) => {
    try {
        if(Array.isArray(payload)) {
            await M_DataAkun.bulkCreate(payload)
        }else{
            await M_DataAkun.create(payload)
        }

        return {
            success: true
        }
    } catch (error) {
        console.log(error.message)
        return {
            success: false,
            message: error.message
        } 
    }
}

exports.F_Akun_delete = async (idArr) => {
    try {
        if(Array.isArray(idArr)) {
            idArr.forEach(async (id) => await M_DataAkun.destroy({
                where: {
                    id_akun: id
                }
            }))
        }else{
            await M_DataAkun.destroy({
                where: {
                    id_akun: idArr
                }
            })
        }

        return {
            success: true
        }
    } catch (error) {
        console.log(error.message)
        return {
            success: false,
            message: error.message
        } 
    }
}

exports.F_Akun_update = async (id_akun, payload) => {
    try {
        await M_DataAkun.update(payload, {where: {id_akun}})

        return {
            success: true
        }
    } catch (error) {
        console.log(error.message)
        return {
            success: false,
            message: error.message
        }
    }
}