const fs = require('fs')
const path = require('path')
const MOCK_DIR = path.resolve(__dirname, 'test')

const walk = dir => {
	let results = []
	const list = fs.readdirSync(dir)
	list.forEach(function(file) {
		file = dir + '/' + file
		const stat = fs.statSync(file)
		if (stat && stat.isDirectory()) {
			results = results.concat(walk(file))
		} else if (path.extname(file) === '.js') {
			results.push(file)
		}
	})
	return results
}
const files = walk(MOCK_DIR)
const db = {}
files.forEach(function(file) {
	Object.assign(db, require(file))
})
module.exports = function() {
	return db
}
