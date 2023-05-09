const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));
// get driver connection
const dbo = require("./db/conn");
 
app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
 
  });
  console.log(`Server is running on port: ${port}`);
});


gitpod /workspace/pet-transport-react/pet_transport/server (main) $ node server.js
Server is running on port: 5000
/workspace/pet-transport-react/pet_transport/node_modules/mongodb/lib/cmap/connection.js:202
                callback(new error_1.MongoServerError(document));
                         ^

MongoServerError: bad auth : Authentication failed.
    at Connection.onMessage (/workspace/pet-transport-react/pet_transport/node_modules/mongodb/lib/cmap/connection.js:202:26)
    at MessageStream.<anonymous> (/workspace/pet-transport-react/pet_transport/node_modules/mongodb/lib/cmap/connection.js:61:60)
    at MessageStream.emit (node:events:513:28)
    at processIncomingData (/workspace/pet-transport-react/pet_transport/node_modules/mongodb/lib/cmap/message_stream.js:124:16)
    at MessageStream._write (/workspace/pet-transport-react/pet_transport/node_modules/mongodb/lib/cmap/message_stream.js:33:9)
    at writeOrBuffer (node:internal/streams/writable:392:12)
    at _write (node:internal/streams/writable:333:10)
    at Writable.write (node:internal/streams/writable:337:10)
    at TLSSocket.ondata (node:internal/streams/readable:766:22)
    at TLSSocket.emit (node:events:513:28) {
  ok: 0,
  code: 8000,
  codeName: 'AtlasError',
  connectionGeneration: 0,
  [Symbol(errorLabels)]: Set(2) { 'HandshakeError', 'ResetPool' }
}

Node.js v18.15.0




