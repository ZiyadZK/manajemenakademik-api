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

exports.validateBody = async function (req, res, next) {
    try {
        const body = req.body;

        // Attempt to parse the body as JSON

        const jsonKeys = Object.keys(body);
        if (jsonKeys.length < 1) {
            return res.status(400).json({
                error: 'JSON Body tidak berisi apa-apa, masih kosong!'
            });
        }
        next();
    } catch (error) {
        // Handle JSON parsing errors
        return res.status(400).json({
            error: 'Terdapat kesalahan dalam parsing JSON Body',
            debug: {
                message: error.message
            }
        });
    }
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

exports.validateEmptyBody = async function (req, res, next) {
    if(req.method === 'GET') {
        const isEmptyOrWhitespace = !req.body || /^[\s\u00A0]*$/.test(req.body);

        if (isEmptyOrWhitespace) {
            return res.status(400).json({ error: 'Empty JSON body' });
        }
    }

    next()

    // const isEmptyOrWhiteSpace = !req.body ||

    // if (!req.body || /^\s*$/.test(req.body)) {
    //     return res.status(400).json({ error: 'Empty JSON body' });
    // }

    // next();
}

exports.ignoreBodyMethod = async (req, res, next) => {
    bodyParser.json()(req, res, next);
    next()
}