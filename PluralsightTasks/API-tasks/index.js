let express = requier('express')
let app = express()

let router = express.Router()

router.Get('/', function (req, res, next) {
    res.send('Apple')
})

app.use('/api/', router)

var server = app.listen(5000, function () {
    console.log('Node server is running on localhost:5000')
})