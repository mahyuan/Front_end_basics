const fs = require('fs');
const path = require('path');

// console.log('__dirname', __dirname);
// console.log('__filename', __filename);

let readSyncStr = fs.readFileSync( path.join( __dirname, 'beReadFile.json' )).toString()
// console.log(readSyncStr);

fs.readFile( path.join( __dirname, './beReadFile.json' ), 'utf8', ( err, data ) => {
	if (err) {
		throw err;
	}
	// console.log(data)
})
fs.writeFile( path.join( __dirname, 'beReadFile.json' ), 'second.md', ( err ) => {
	if(err) throw err;
})

