const { Op } = require("sequelize");
const { M_DataAlumni } = require("../model/M_Alumni");
const { M_DataSiswa } = require("../model/M_Siswa");
const { F_DataAlumni_create } = require("./F_Alumni");
const { date_getYear, date_getMonth, date_getDay } = require("../../libs/date");

exports.F_Siswa_get = async (filters) => {
    try {
        let data;
        if(typeof(filters) === 'object') {
            data = await M_DataSiswa.findAll({
                where: filters,
                raw: true
            })
        }else{
            data = await M_DataSiswa.findAll({
                raw: true
            })
        }

        

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

exports.F_Siswa_get_single = async (nis) => {
    try {
        let data = {}

        if(nis) {
            data = await M_DataSiswa.findOne({
                where: {
                    nis
                }
            })
        }
        
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

exports.F_Siswa_create = async (payload) => {
    try {
        if(Array.isArray(payload)) {
            await M_DataSiswa.bulkCreate(payload)
        }else{
            await M_DataSiswa.create(payload)
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

exports.F_Siswa_delete = async (arrayNis) => {
    try {
        await M_DataSiswa.destroy({
            where: {
                nis: arrayNis
            }
        })

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

exports.F_Siswa_update = async (arrayNis, payload) => {
    try {
        if(Array.isArray(arrayNis)) {
            await M_DataSiswa.update(payload, {
                where: {
                    nis: {
                        [Op.in]: arrayNis
                    }
                }
            })
        }else{
            await M_DataSiswa.update(payload,{ where: {nis: arrayNis}});
        }

        return {
            success: true
        }
    } catch (error) {
        console.log(error.message)
        return {
            success: false,
            debug: {
                message: error.message
            }
        }
    }
}

exports.F_Siswa_delete = async (arrayNis) => {
    try {
        if(Array.isArray(arrayNis)){
            await M_DataSiswa.destroy({
                where: {
                    nis: {
                        [Op.in]: arrayNis
                    }
                }
            })
        }else{ 
            await M_DataSiswa.destroy({
                where: {
                    nis: arrayNis
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
            debug: {
                message: error.message
            }
        }
    }
}

exports.F_Siswa_naikKelas = async (nisArrTidakNaikKelas) => {
    try {
        const dataCalonAlumni = await M_DataSiswa.findAll({
            where: {
                nis: {
                    [Op.notIn]: nisArrTidakNaikKelas
                },
                kelas: 'XII'
            }
        })

        await M_DataSiswa.destroy({
            where: {
                nis: {
                    [Op.notIn]: nisArrTidakNaikKelas
                },
                kelas: 'XII'
            }
        })

        await M_DataSiswa.update({ kelas: 'XII' },{
            where: {
                nis: {
                    [Op.notIn]: nisArrTidakNaikKelas
                },
                kelas: 'XI'
            }
        })

        await M_DataSiswa.update({ kelas: 'XI'}, {
            where: {
                nis: {
                    [Op.notIn]: nisArrTidakNaikKelas
                },
                kelas: 'X'
            }
        })

        await M_DataAlumni.bulkCreate(dataCalonAlumni.map(value => ({...value, tahun_keluar: date_getYear(), tanggal_keluar: `${date_getYear()}-${date_getMonth()}-${date_getDay()}`})))

        return {
            success: true
        }
    } catch (error) {
        console.log(error.message)
        return {
            success: false,
            debug: {
                message: error.message
            }
        }
    }
}