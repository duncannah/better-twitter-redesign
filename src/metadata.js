const fs = require("fs").promises;
const path = require("path");

exports.defaults = async () => {
	const package = require(path.join(__dirname, "..", "package.json"));
	const name = await fs
		.readFile(path.join(__dirname, "..", "README.md"))
		.then((v) => (v.toString().match(/^# (.+)$/m) || [])[1]);

	const metadata = [
		["name", name || package.name],
		["namespace", (package.author.match(/\((.+)\)/) || [])[1]] || package.repository || package.author,
		["version", package.version],
		["description", package.description],
		["author", package.author],
		["homepageURL", package.repository],
		["license", package.license],
		["preprocessor", "default"],
	];

	const biggestKey = Math.max(...metadata.map((el) => el[0].length));

	return (
		"/* ==UserStyle==\n" +
		metadata.map((i) => `@${i[0]}`.padEnd(biggestKey + 1) + " " + i[1]).join("\n") +
		"\n==/UserStyle== */"
	);
};
