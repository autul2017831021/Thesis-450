const { getApiData } = require('./apiService')
const { makeUrl } = require('../helpers/utility')
const {bangladeshiSongs,kolkataSongs} = require('../models/trackIdModel')
const { nullFeatureObj } = require('../models/featureModel')
const audioFeaturesApi = process.env.GET_AUDIO_FEATURES != '' ? process.env.GET_AUDIO_FEATURES : 'https://api.spotify.com/v1/audio-features/'

async function getFeatures(bearer){
    features = []
    for (let i = 0; i < bangladeshiSongs.length; i++) {
        // if(typeof bangladeshiSongs[i]['Tracking Id'] !== null || bangladeshiSongs[i]['Tracking Id'] !== 'na' || bangladeshiSongs[i]['Tracking Id'] !== 'N/A'){
        const obj = new Object()
        obj['Status'] = {
            "Success" : true,
            "Message" : "Successfully Retrieved Features"
        }
        obj['Country'] = bangladeshiSongs[i]['Country']
        obj['Song Name'] = bangladeshiSongs[i]['Song Name']
        obj['Tracking Id'] = bangladeshiSongs[i]['Tracking Id']
        trackingId = obj['Tracking Id']
        if(trackingId === null || trackingId === 'N/A' || trackingId === 'na' ){
            obj['Status'] = {
                "Success" : false,
                "Message" : "This Song Is Absent In Spotify"
            }
            obj['Features'] = nullFeatureObj
        }
        else{
            url = makeUrl(audioFeaturesApi,trackingId)
            const featuresObj = await getApiData(url,bearer)
            obj['Features'] = featuresObj
        }
        features.push(obj)
        // }
    }
    // console.log(bangladeshiSongs.length)
    return features
}
async function getFeaturesById(id, bearer){
    url = makeUrl(audioFeaturesApi,id)
    var featuresObj = await getApiData(url,bearer)
    return featuresObj
}


module.exports = {
    getFeatures,
    getFeaturesById,
}