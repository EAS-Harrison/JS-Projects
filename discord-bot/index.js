var express = require('express');
const app = express();
app.use(express.json());
let factRepo = require('./factRepo/factRepo.js')

let router = express.Router()

router.get('/', function (req, res, next) {
    factRepo.get(function (data) {
        res.status(200).json({
            'status': 200,
            'statusText': 'OK',
            'message': 'All facts retrieved',
            'data': data
        })
    },
        function (err) {
            next(err)
        })
})
router.get('/:id', function (req, res, next) {
    factRepo.getById(req.params.id, function (data) {
        if (data) {
            res.status(200).json({
                'status': 200,
                'statusText': 'OK',
                'message': 'All facts retrieved',
                'data': data
            })
        } else {
            res.status(404).json({
                'status': 404,
                'statusText': 'Not found',
                'message': `The fact '${req.params.id}' could not be found.`,
                'error': {
                    "code": "NOT_FOUND",
                    "message": `The fact '${req.params.id}' could not be found.`
                }
            })
        }
    }, function (err) {
        next(err)
    })
})
router.get('/searchtopic', function (req, res, next) {
    factRepo.searchTopic(req.params.topic, function (data) {
        if (data) {
            res.status(200).json({
                'status': 200,
                'statusText': 'OK',
                'message': 'All facts retrieved',
                'data': data
            })
        } else {
            res.status(404).json({
                'status': 404,
                'statusText': 'Not found',
                'message': `The topic '${req.params.topic}' could not be found.`,
                'error': {
                    "code": "NOT_FOUND",
                    "message": `The topic '${req.params.topic}' could not be found.`
                }
            })
        }
    }, function (err) {
        next(err)
    })
})
router.post('/', function (req, res, next) {
    factRepo.insert(req.body, function (data) {
        if (data) {
            res.status(201).json({
                'status': 201,
                'statusText': 'Created',
                'message': 'New fact added',
                'data': data
            })
        }
    }, function (err) {
        next(err)
    })
})
app.use('/api/', router)
app.listen(3000, () => {
    console.log('Node server is running on port 3000');
})