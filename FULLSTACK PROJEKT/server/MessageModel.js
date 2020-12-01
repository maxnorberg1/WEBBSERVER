const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    email: String,
    messageType: String
});
  
const Message = mongoose.model('Message', messageSchema);


exports.createMessage = (email, messageType) => {
    var message = new Message({
        email: email, 
        messageType: messageType
    })

    return message
}

exports.getAllMessages = async () => {
    let messages = await Message.find({});

    return messages

}