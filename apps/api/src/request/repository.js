const insertOne = (client, request) => client.insert(request).into('request');

module.exports = {
    insertOne,
}
