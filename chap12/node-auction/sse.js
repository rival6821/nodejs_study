const SSE = require(sse);

module.exports = (server) => {
    const sse = new SSE(server);
    sse.on('connextion', (client)=>{
        setInterval(()=>{
            client.send(new Date().valueOf().toString());
        },1000);
    });
};