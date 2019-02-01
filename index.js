/**
 * Triggered from a message on a Cloud Pub/Sub topic.
 *
 * @param {!Object} event Event payload.
 * @param {!Object} context Metadata for the event.
 */
exports.sendSIGNL4Alert = (event, context) => {
 
  
  const pubSubMessage = event;
  const name = pubSubMessage.data ? Buffer.from(pubSubMessage.data, 'base64').toString() : 'No Data';

  console.log(`Data: ${name}!`);

  // Send alert to SIGNL4

  const request = require('request')

  request.post('https://connect.signl4.com/webhook/96sbq38s', {
    json: {
      Alert: name
    }
  }, (error, res, body) => {
    if (error) {
      console.error(error)
      return
    }
    console.log(`statusCode: ${res.statusCode}`)
    console.log(body)
  })

};
