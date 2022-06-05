const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Enter Message</title><head>');
        res.write(
            '<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>'
        );
        res.write('</html>');
        return res.end();
    }

    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {  // req.on -> allows us to listen to certain events
            console.log(chunk);
            body.push(chunk);
        });

        return req.on('end', () => { // end --> once it's done parseing the incomming req data
            const parsedBody = Buffer.concat(body).toString(); // buffers adds all the chunks from inside my body to it.
            console.log(parsedBody);
            const message = parsedBody.split('=')[1];
            // fs.writeFileSync('message.txt', message); // fs.writeFileSync --> will block code execution unless the file is created;
            fs.writeFile('message.txt', message, err => { // fs.writeFile --> take 3 argu. and should be executed once it is done!
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
    }

    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title><head>');
    res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
    res.write('</html>');
    res.end();

}

// # multiple way of exporting 

// module.exports = requestHandler;

// exporting many things
// module.exports = {
//     handler: requestHandler,
//     sometext: 'Some hard coded text'
// }

// or can be export like this also;
// module.exports.handler = requestHandler;
// module.exports.sometext = 'Some hard coded text';

// or shortCut
exports.handler = requestHandler;
exports.sometext = 'Some hard coded text';