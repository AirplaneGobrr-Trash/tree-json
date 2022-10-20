const fs = require('fs')
const path = require('path');

function tree(filepath, ignore) {

	if (!ignore) ignore = []

	filepath = path.normalize(filepath);

	var stats = fs.lstatSync(filepath),
		result = {
			path:filepath,
			name:path.basename(filepath)
		};

	if (stats.isDirectory()) {
		for (var file in ignore){
			if (filepath.includes(file)) return
		}
		result.type = "folder";

		result.children = fs.readdirSync(filepath).map(function(child) {
			return tree(filepath + '/' + child, ignore);
		});

	} else {
		result.type = "file";
	}

	return result;
}

module.exports = tree;