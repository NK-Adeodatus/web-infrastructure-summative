const { error } = require('console')
const http = require('http')
const https = require('https')

const API_KEY = '6ee780b73emsh80ea193d802e044p1accb6jsn5618244abdf1'
const PORT = 3000

const server = http.createServer((req , res) => {
    if(req.url.startsWith('/movies')) {
        const options = {
            hostname: 'imdb236.p.rapidapi.com',
            path: '/imdb/most-popular-movies',
            method: 'GET',
            headers: {
                'x-rapidapi-key': API_KEY,
		        'x-rapidapi-host': 'imdb236.p.rapidapi.com'
            }
        }

        const apiReq = https.request(options, apiRes => {
            let data = ''

            apiRes.on('data', chunk => {
                data += chunk
            })

            apiRes.on('end', () => {
                res.writeHead(200, {
                    "content-type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type"
                })
                res.end(data)
            })
        })

        apiReq.on('error', error => {
            console.error('Error fetching data from RapidAPI:', error)
            res.writeHead(500, {"Content-Type": "text/plain"})
            res.end("Failed to fetch movies")
        })
        apiReq.end()
    } else {
        res.writeHead(404, {"Content-Type": "application/json"})
        res.end(JSON.stringify({error: "Route not found"}))
    }
})

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})