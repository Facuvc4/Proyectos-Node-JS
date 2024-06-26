import http from 'node:http';
import dittoJSON from './ditto.json' assert {type:'json'};
  
const serverResponse = (req,res) => {
    const {method, url} = req;

    switch (method) {
        case 'GET':
          switch (url) {
            case '/':
                res.setHeader('Content-Type','text/html; charsert=utf-8');
                return res.end('Hola');
            case '/ditto':
                res.setHeader('Content-Type','application/json; charset=utf-8');
                return res.end(JSON.stringify(dittoJSON));
            default:
                res.statusCode = 404;
                res.setHeader('Content-Type', 'text/html; charset=utf-8')
                return res.end('<h1>Error 404 not found</h1>')
          }  

        case 'POST': 
          switch(url) {
            case '/pokemon': {
                let body = ''
                
                //escuchar data
                req.on('data', chunk => {
                    body += chunk.toString()
                })
                
                //escuchar end
                req.on('end', () => {
                    const data = JSON.parse(body)
                    res.writeHead(201,{ 'Content-Type': 'application/json; charset=utf-8' })
                    res.end(JSON.stringify(data))
                })

                break
            }

            default:
                res.statusCode = 404;
                res.setHeader('Content-Type', 'text/html; charset=utf-8')
                return res.end('<h1>Error 404 not found</h1>')
          }
    }
}; 

const server = http.createServer(serverResponse);

server.listen(0, () => {
    console.log(`server running at port: http://localhost:${server.address().port}`)
});