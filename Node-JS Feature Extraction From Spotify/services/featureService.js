const { getFeatureApiData,getTrackApiData } = require('./apiService')
const { makeUrl } = require('../helpers/utility')
const {bangladeshiSongs,kolkataSongs} = require('../models/trackIdModel')
const { nullFeatureObj } = require('../models/featureModel')
const audioFeaturesApi = process.env.GET_AUDIO_FEATURES != '' ? process.env.GET_AUDIO_FEATURES : 'https://api.spotify.com/v1/audio-features/'
const tracksApi = process.env.GET_TRACKS != '' ? process.env.GET_TRACKS : 'https://api.spotify.com/v1/tracks/'

async function getFeatures(bearer){
    features = []
    for (let i = 0; i < bangladeshiSongs.length; i++) {
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
            featureUrl = makeUrl(audioFeaturesApi,trackingId)
            trackUrl = makeUrl(tracksApi,trackingId)
            const featuresObj = await getFeatureApiData(featureUrl,bearer)
            obj['Features'] = featuresObj
        }
        features.push(obj)
    }
    for (let i = 0; i < bangladeshiSongs.length; i++) {
        const obj = new Object()
        obj['Tracking Id'] = bangladeshiSongs[i]['Tracking Id']
        trackingId = obj['Tracking Id']
        if(trackingId === null || trackingId === 'N/A' || trackingId === 'na' ){
            features[i]['Popularity'] = null
        }
        else{
            trackUrl = makeUrl(tracksApi,trackingId)
            const track = await getTrackApiData(trackUrl,bearer)
            if(typeof track === 'undefined'){
                console.log(i,features[i]['Song Name'],trackUrl)
            }
            features[i]['Popularity'] = typeof track !== 'undefined' ? track.popularity : "Some API Error Must Happened, Try Again"
        }
    }
    // console.log(bangladeshiSongs.length)
    return features
}
async function getFeaturesById(id, bearer){
    featureUrl = makeUrl(audioFeaturesApi,id)
    trackUrl = makeUrl(tracksApi,id)
    var featuresObj = await getFeatureApiData(featureUrl,bearer)
    const track = await getTrackApiData(trackUrl,bearer)
    featuresObj.Popularoty = track.popularity
    return featuresObj
}


module.exports = {
    getFeatures,
    getFeaturesById,
}