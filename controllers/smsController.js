// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

const smsController = {
  sendSMS: async function (req, res) {
    try {
      client.messages
        .create({
          body: req.body.message,
          from: "+14704504097",
          to: "+14042764570",
        })
        .then((message) => res.json(message))
        .catch((err) => console.log(err));
    } catch (ex) {}
  },
};

module.exports = smsController;
