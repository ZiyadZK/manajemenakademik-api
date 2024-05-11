exports.validateApiKey = function (req, res, next) {
    const api_key = req.header('x-api-key')
    if(api_key !== process.env.API_MAIN_KEY) {
        return res.status(403).json({
            error: 'Anda tidak memiliki API KEY yang sesuai dengan yang ada di server!',
            api_key: api_key
        })
    }

    next()
}

exports.validateBody = function (req, res, next) {
    const body = req.body

    const jsonKeys = Object.keys(body)
    if(jsonKeys.length < 1) {
        return res.status(400).json({
            error: 'JSON Body tidak berisi apa-apa, masih kosong!'
        })
    }
    next()
}

exports.validateFilterQuery = function (req, res, next) {
    const filters = req.query.filters;

    if(filters) {
        const keys = Object.keys(filters);
        let duplicatedFilters = []
        let emptyFilters = []
        keys.forEach(key => {
            if(Array.isArray(filters[key])) {
                duplicatedFilters.push(key)
            }

            if(filters[key] === null || filters[key] === '') {
                console.log(filters[key])
                emptyFilters.push(key)
            }
        })

        if(duplicatedFilters.length > 0) {
            return res.status(400).json({ 
                error: 'Query Filters tidak boleh berisi kunci yang duplikat/sama!',
                duplicatedFilters
            });
        }

        if(emptyFilters.length > 0) {
            return res.status(400).json({
                error: 'Terdapat Query Filters yang kosong!',
                emptyFilters
            });
        }
    }

    next()
}