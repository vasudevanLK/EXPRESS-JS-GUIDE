const fs = require('fs');

// Function to log events
function logEvents(message, filePath) {
    const logMessage = `[${new Date().toLocaleString()}] ${message}\n`;
    fs.appendFile(filePath, logMessage, (err) => {
        if (err) throw err;
    });
}
const logger= (req,res,next)=>{
    logEvents(`${req.method}\t ${req.headers.origin} \t ${req.url}`,'event.txt' )
    
    next()
}

module.exports=(logger)


//custommiddleWare  