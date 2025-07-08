// Import necessary modules
const http = require('http');
const mongoose = require('mongoose');
const url = require('url');
const TypingTestModel = require('./models/TypingTest'); 

mongoose.connect('mongodb://localhost:27017/typingTests', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

const server = http.createServer(async (req, res) => {
    const { method, url: requestUrl } = req;

    const parsedUrl = url.parse(requestUrl, true);
    const pathname = parsedUrl.pathname;
    const id = pathname.split('/')[2]; 

    if (method === 'DELETE' && pathname.startsWith('/deleteHistory/') && id) {
        try {
            const result = await TypingTestModel.findByIdAndDelete(id);

            if (!result) {
                res.statusCode = 404;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ message: 'Typing test entry not found.' }));
                return;
            }

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ message: 'Typing test history deleted successfully!' }));
        } catch (err) {
            console.error('Error deleting typing test history:', err);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ message: 'An error occurred while deleting typing test history. Please try again.' }));
        }
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: 'Route not found' }));
    }
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
