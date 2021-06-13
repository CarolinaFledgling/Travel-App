exports.handler = async function (event, context) {
    const nodeVersion = process.env.NODE_VERSION
    const weatherApi = process.env.GEONAMES_USERNAME
    const combined = nodeVersion + '-' + weatherApi

    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Hello World' + combined }),
    }
}
