const fs = require("fs").promises;
const path = require("path");

const sass = require("node-sass");

const BUILDPATH = path.join(__dirname, "/dist");

(async () => {
	await fs.rmdir(BUILDPATH, { recursive: true }).then(() => fs.mkdir(BUILDPATH));

	const metadata = await require(path.join(__dirname, "/src/metadata.js")).defaults();

	const resultCss = sass
		.renderSync({
			file: path.join(__dirname, "src/style.scss"),
		})
		.css.toString();

	await fs.writeFile(
		path.join(BUILDPATH, "better-twitter-redesign.user.css"),
		`${metadata}\n\n@-moz-document domain("twitter.com") {\n${resultCss}}`
	);
})().catch((e) => {
	console.error("[ERROR] Building failed:", e);
});
