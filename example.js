/**
 *
 * This is an example of how to use node box
 */
const nodeBox = require('@klouddydev/node-boxy');
var a = new nodeBox.NodeBox({filename: './config.yml'});

a.logger.warn('logging warn message');
a.app.listen(3000, () => {
  console.log('listening on 3000')
});
