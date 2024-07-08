
const { Op } = require("sequelize")
const { encryptKey } = require("../../libs/cryptor")
const { randNumber } = require("../../libs/functions/randNumber")
const { sendEmail } = require("../../libs/mailer")
const { M_DataAkun } = require('../model/M_Akun')
const { M_DataPegawai } = require("../model/M_Pegawai")

exports.F_Akun_validateLogin = async (payload) => {
    try {
        const data = await M_DataAkun.findOne({
            raw: true,
            where: {
                password_akun: payload.password_akun
            },
            include: [
                {
                    model: M_DataPegawai,
                    where: {
                        email_pegawai: payload.email_akun
                    }
                }
            ]
        })

        if(!data || data === null || typeof(data) === 'undefined') {
            throw new Error('Email dan Password tidak ditemukan!')
        }

        
        const userdataToken = randNumber(6)
        const responseEmail = await sendEmail(payload.email_akun, 'Verifikasi PIN', `PIN Anda adalah ${userdataToken}`)
        // const responseEmail = {
        //     success: true
        // }
        if(responseEmail.success) {
            const formattedData = {
                email_akun: payload.email_akun,
                password_akun: payload.password_akun,
                role_akun: data['role_akun'],
                nama_akun: data['data_pegawai.nama_pegawai']
            }
            const userdata = {...formattedData, userdataToken}
    
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
            raw: true,
            include: [
                {
                    model: M_DataPegawai
                }
            ]
        })

        const formattedData = data.map(record => {
            return {
                id_akun: record.id_akun,
                id_pegawai: record['data_pegawai.id_pegawai'],
                nama_akun: record['data_pegawai.nama_pegawai'],
                email_akun: record['data_pegawai.email_pegawai'],
                password_akun: record['password_akun'],
                role_akun: record['role_akun'],
            };
        });

        return {
            success: true,
            data: formattedData
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
            M_DataAkun.destroy({
                where: {
                    id_akun: {
                        [Op.in]: idArr
                    }
                }
            })
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