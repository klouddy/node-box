const actuator = require('./dist/index.js');

var a = actuator();

a.listen(3000, () => {
  console.log('listening on 3000')
});
