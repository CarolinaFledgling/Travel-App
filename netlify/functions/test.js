exports.handler = async function (event, context) {
    const nodeVersion = process.env.NODE_VERSION
    const weatherApi = process.env.GEONAMES_USERNAME
    const combined = `${nodeVersion}-${weatherApi}`
    return combined
}