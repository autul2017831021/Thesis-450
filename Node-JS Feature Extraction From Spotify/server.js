const http = require('http')
const url = require('url')
require('dotenv').config();
const {StringDecoder} = require('string_decoder')
const { getAll,getById } = require('./controllers/featureController.js')
const { getApiReqResTime } = require('./api-request-response-time/apiReqResTime.js')
const { base64decode } = require('./helpers/utility.js')

const port = process.env.PORT != '' ? process.env.PORT : 8082

function getDate(dateObj){
    return 'Request Time : '+getApiReqResTime(dateObj)
}
function getEndpointName(endpoint){
    return 'Endpoint : http://localhost:'+port+endpoint
}
function commonCallBack(path){
    console.log( getEndpointName(path) )
    console.log( getDate(new Date()) )
}

function main(request, response){
    const bearer = request.headers.authorization != 'undefined' ? request.headers.authorization.split(' ')[1] : process.env.BEARER
    var path = request.url
    var parsedUrl = url.parse(request.url, true)
    if(path === '/api/audio-features/getAll' && request.method === 'GET'){
        commonCallBack(path)
        getAll(request,response,bearer)
    }
    else if(parsedUrl.pathname === '/api/audio-features/getById' && typeof parsedUrl.query.id !== 'undefined' && request.method === 'GET'){
        commonCallBack(path)
        const id = parsedUrl.query.id
        getById(request,response,id,bearer)
    }
    else{
        response.writeHead(404, {'Content-Type': 'application/json'})
        msg = {
            "message" : "not found"
        }
        response.end(JSON.stringify(msg))
    } 
}

http.createServer(main).listen(port,()=>{
    console.log("Server running on http://localhost:%i",port)
})
