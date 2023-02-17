const axios = require('axios')
// const bearer = process.env.BEARER != '' ? process.env.BEARER : ''

function getFeatureApiData(url,bearer){
    return axios.get(url, {
        headers: {
            'Content-Type' : 'application/json',
            'Authorization': `Bearer ${bearer}`
        }
    }).then(response => {return response.data}).catch(error => {console.log(error)})
}
function getTrackApiData(url,bearer){
    return axios.get(url, {
        headers: {
            'Content-Type' : 'application/json',
            'Authorization': `Bearer ${bearer}`
        }
    }).then(response => {return response.data}).catch(error => {console.log(error)})
}

module.exports = {
    getFeatureApiData,
    getTrackApiData
}