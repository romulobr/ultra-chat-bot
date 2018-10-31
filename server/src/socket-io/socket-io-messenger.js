const socketIo = require('socket.io')

function initialize(server, app) {
  const io = socketIo(server);

  app.post('/message', function (req, res) {
    io.emit('message', req.body);
    res.send(req.body);
  });

  io.on('connection', function (socket) {
    console.log('a user connected');

    socket.on('disconnect', function () {
      console.log('user disconnected');
    });
  });
}

module.exports = {initialize};
