const { getApiReqResTime } = require('./apiReqResTime.js')

function commonResponse(response,content,contentType){
    let dateObj = new Date()
    //content = JSON.parse(content)
    if(typeof content == 'undefined'){
        response.statusCode = 403
        content = {
            "error": {
                "status": 401,
                "message": "The access token expired"
            }
        }
        response.writeHead(response.statusCode, {'Content-Type': contentType})
        response.end(JSON.stringify(content) )
        console.log('Response Time : ',getApiReqResTime(dateObj) )
        console.log('Response Code : ',response.statusCode)
        console.log(content)
    }
    else{
        response.writeHead(response.statusCode, {'Content-Type': contentType})
        response.end(JSON.stringify(content) )
        console.log('Response Time : ',getApiReqResTime(dateObj) )
        console.log('Response Code : ',response.statusCode)
        console.log(content)
    }
    
}

function makeUrl(api,id){
    url = api+id
    return url
}

function  isEmptyObject(object) {  
    return Object.keys(object).length === 0
}

module.exports = {
    commonResponse,
    isEmptyObject,
    makeUrl
}