const { Op } = require("sequelize")
const { M_DataAlumni } = require("../model/M_Alumni")
const { M_MataPelajaran } = require("../model/M_Mata_Pelajaran")
const { M_DataMutasiSiswa } = require("../model/M_MutasiSiswa")
const { M_Nilai } = require("../model/M_Nilai")
const { M_DataSiswa } = require("../model/M_Siswa")

exports.F_Nilai_getAll = async () => {
    try {
        const data = await M_Nilai.findAll({
            raw: true,
            include: [
                {
                    model: M_MataPelajaran,
                    as: 'data_mapel'
                },
                {
                    model: M_DataSiswa,
                    as: 'data_siswa'
                },
                {
                    model: M_DataAlumni,
                    as: 'data_alumni'
                },
                {
                    model: M_DataMutasiSiswa,
                    as: 'data_mutasi_siswa'
                }
            ]
        })

        return {
            success: true,
            data: data.map(value => ({
                id_nilai: value['id_nilai'],
                fk_id_mapel: value['fk_id_mapel'],
                fk_nilai_nis_siswa: value['fk_nilai_nis_siswa'],
                fk_nilai_nis_mutasi_siswa: value['fk_nilai_nis_mutasi_siswa'],
                fk_nilai_nis_alumni: value['fk_nilai_nis_alumni'],
                id_mapel: value['data_mapel.id_mapel'],
                nama_mapel: value['data_mapel.nama_mapel'],
                jurusan_mapel: value['data_mapel.jurusan_mapel'],
                kategori_mapel: value['data_mapel.kategori_mapel'],
                semester_1: value['semester_1'],
                semester_2: value['semester_2'],
                semester_3: value['semester_3'],
                semester_4: value['semester_4'],
                semester_5: value['semester_5'],
                semester_6: value['semester_6'],
                nilai_akhir: value['nilai_akhir'],
                nilai_ujian: value['nilai_ujian'],
                data_siswa: value['fk_nilai_nis_siswa'] === null ? null : {
                    nama: value['data_siswa.nama_siswa'],
                    kelas: value['data_siswa.kelas'],
                    jurusan: value['data_siswa.jurusan'],
                    rombel: value['data_siswa.rombel'],
                    tahun_masuk: value['data_siswa.tahun_masuk'],
                },
                data_mutasi_siswa: value['fk_nilai_nis_mutasi_siswa'] === null ? null : {
                    nama: value['data_mutasi_siswa.nama_siswa'],
                    kelas: value['data_mutasi_siswa.kelas'],
                    jurusan: value['data_mutasi_siswa.jurusan'],
                    rombel: value['data_mutasi_siswa.rombel'],
                    tahun_masuk: value['data_mutasi_siswa.tahun_masuk'],
                    tahun_keluar: value['data_mutasi_siswa.tahun_keluar'],
                    keterangan: value['data_mutasi_siswa.keterangan'],
                },
                data_alumni: value['fk_nilai_nis_alumni'] === null ? null : {
                    nama: value['data_alumni.nama_siswa'],
                    kelas: value['data_alumni.kelas'],
                    jurusan: value['data_alumni.jurusan'],
                    rombel: value['data_alumni.rombel']
                }
            }))
        }

    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: error.message
        }
    }
}

exports.F_Nilai_getAll_nis = async (nis) => {
    try {
        const data = await M_Nilai.findAll({
            raw: true,
            where: {
                [Op.or]: [
                    {
                        fk_nilai_nis_siswa: nis
                    },
                    {
                        fk_nilai_nis_mutasi_siswa: nis
                    },
                    {
                        fk_nilai_nis_alumni: nis
                    }
                ]
            },
            include: [
                {
                    model: M_MataPelajaran,
                    as: 'data_mapel'
                },
                {
                    model: M_DataSiswa,
                    as: 'data_siswa'
                },
                {
                    model: M_DataAlumni,
                    as: 'data_alumni'
                },
                {
                    model: M_DataMutasiSiswa,
                    as: 'data_mutasi_siswa'
                }
            ]
        })

        return {
            success: true,
            data: data.map(value => ({
                id_nilai: value['id_nilai'],
                fk_id_mapel: value['fk_id_mapel'],
                fk_nilai_nis_siswa: value['fk_nilai_nis_siswa'],
                fk_nilai_nis_mutasi_siswa: value['fk_nilai_nis_mutasi_siswa'],
                fk_nilai_nis_alumni: value['fk_nilai_nis_alumni'],
                id_mapel: value['data_mapel.id_mapel'],
                nama_mapel: value['data_mapel.nama_mapel'],
                jurusan_mapel: value['data_mapel.jurusan_mapel'],
                kategori_mapel: value['data_mapel.kategori_mapel'],
                semester_1: value['semester_1'],
                semester_2: value['semester_2'],
                semester_3: value['semester_3'],
                semester_4: value['semester_4'],
                semester_5: value['semester_5'],
                semester_6: value['semester_6'],
                nilai_akhir: value['nilai_akhir'],
                nilai_ujian: value['nilai_ujian'],
                data_siswa: value['fk_nilai_nis_siswa'] === null ? null : {
                    nama: value['data_siswa.nama_siswa'],
                    kelas: value['data_siswa.kelas'],
                    jurusan: value['data_siswa.jurusan'],
                    rombel: value['data_siswa.rombel'],
                },
                data_mutasi_siswa: value['fk_nilai_nis_mutasi_siswa'] === null ? null : {
                    nama: value['data_mutasi_siswa.nama_siswa'],
                    kelas: value['data_mutasi_siswa.kelas'],
                    jurusan: value['data_mutasi_siswa.jurusan'],
                    rombel: value['data_mutasi_siswa.rombel']
                },
                data_alumni: value['fk_nilai_nis_alumni'] === null ? null : {
                    nama: value['data_alumni.nama_siswa'],
                    kelas: value['data_alumni.kelas'],
                    jurusan: value['data_alumni.jurusan'],
                    rombel: value['data_alumni.rombel']
                }
            }))
        }

    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: error.message
        }
    }
}

exports.F_Nilai_create = async (payload) => {
    try {
        await M_Nilai.create(payload)

        return {
            success: true
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: error.message
        }
    }
}

exports.F_Nilai_update = async (id_nilai, payload) => {
    try {
        if(Array.isArray(id_nilai)) {
            await M_Nilai.update(payload, {
                where: {
                    id_nilai: {
                        [Op.in]: id_nilai
                    }
                }
            })
        }else{
            await M_Nilai.update(payload, {
                where: {
                    id_nilai
                }
            })
        }

        return {
            success: true
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: error.message
        }
    }
}

exports.F_Nilai_delete = async (id_nilai) => {
    try {

        if(Array.isArray(id_nilai)) {
            await M_Nilai.destroy({
                where: {
                    id_nilai: {
                        [Op.in]: id_nilai
                    }
                }
            })
        }else{
            await M_Nilai.destroy({
                where: {
                    id_nilai
                }
            })
        }

        return {
            success: true
        }
        
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: error.message
        }
    }
}

exports.F_Nilai_delete_nis = async (nis) => {
    try {
        if(Array.isArray(nis)) {
            await M_Nilai.destroy({
                where: {
                    [Op.or]: [
                        {
                            fk_nilai_nis_siswa: {
                                [Op.in]: nis
                            }
                        },
                        {
                            fk_nilai_nis_mutasi_siswa: {
                                [Op.in]: nis
                            }
                        },
                        {
                            fk_nilai_nis_alumni: {
                                [Op.in]: nis
                            }
                        },
                    ]
                }
            })
        }else{
            await M_Nilai.destroy({
                where: {
                    [Op.or]: [
                        {
                            fk_nilai_nis_siswa: {
                                nis
                            }
                        },
                        {
                            fk_nilai_nis_mutasi_siswa: {
                                nis
                            }
                        },
                        {
                            fk_nilai_nis_alumni: {
                                nis
                            }
                        },
                    ]
                }
            })
        }

        return {
            success: true
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: error.message
        }
    }
}



