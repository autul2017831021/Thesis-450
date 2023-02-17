const { getFeatures, getFeaturesById} = require('../services/featureServiceIND.js')
const { commonResponse } = require('../helpers/utility.js')


async function getAll(request, response, bearer){
    var features = await getFeatures(bearer)
    commonResponse(response,features,'application/json')
}

async function getById(request, response, id, bearer){
    var features = await getFeaturesById(id, bearer)
    commonResponse(response,features,'application/json')
}

module.exports = {
    getAll,
    getById,
}