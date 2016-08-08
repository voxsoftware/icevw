
import Registry from 'npm-registry'
var npm= new Registry({})

npm.packages.details('vox-core', function (err, data) {
 	vw.info(data[0])
});