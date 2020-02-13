const nodeBox = require('./dist/index.js');
var a = new nodeBox.NodeBox();

a.logger.warn('logging warn message');
a.app.listen(3000, () => {
  console.log('listening on 3000')
});
