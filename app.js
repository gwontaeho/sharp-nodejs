const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const inputDir = path.join(__dirname, "input");
const outputDir = path.join(__dirname, "output");

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

fs.readdir(inputDir, (err, files) => {
  if (err) {
    console.log(err);
    return;
  }

  files.forEach((file) => {
    const inputFilePath = path.join(inputDir, file);
    const outputFilePath = path.join(
      outputDir,
      file.slice(1).replace(/\.[^/.]+$/, ".webp")
    );

    if (/\.(jpe?g|png|webp|gif)$/i.test(file)) {
      sharp(inputFilePath)
        .metadata()
        .then((metadata) => {
          const scale = 1000 / Math.max(metadata.width, metadata.height);
          const newWidth = Math.round(metadata.width * scale);
          const newHeight = Math.round(metadata.height * scale);

          return sharp(inputFilePath)
            .resize(newWidth, newHeight)
            .toFormat("webp")
            .toFile(outputFilePath);
        })
        .then(() => {})
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log(err);
    }
  });
});
