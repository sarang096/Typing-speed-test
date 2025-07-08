const mongoose = require('mongoose');

const TypingTestSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    userName: { type: String, required: true },  // Add userName field
    text: { type: String, required: true },
    wordsPerMinute: { type: Number, required: true },
    accuracy: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});

const TypingTestModel = mongoose.model('typingtest', TypingTestSchema);
module.exports = TypingTestModel;
