/**
 *
 * This is an example of how to use node box
 */
const nodeBox = require('./dist/index');
var a = new nodeBox.NodeBox({filename: './config.yml'});

a.logger.warn('logging warn message');
a.app.listen(4200, () => {
  console.log('listening on 4200')
});
