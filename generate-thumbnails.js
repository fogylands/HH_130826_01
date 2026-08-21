const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const projectsDir = path.join(__dirname, "libraries/03_Projects");
const thumbnailsDir = path.join(projectsDir, "_thumbnails");

async function createThumbnails() {
  fs.mkdirSync(thumbnailsDir, { recursive: true });

  const projects = fs.readdirSync(projectsDir);

  for (const project of projects) {
    const projectPath = path.join(projectsDir, project);

    if (!fs.statSync(projectPath).isDirectory()) continue;
    if (project === "_thumbnails") continue;

    const folders = fs.readdirSync(projectPath);

    for (const folder of folders) {
      const folderPath = path.join(projectPath, folder);

      if (!fs.statSync(folderPath).isDirectory()) continue;

      const outputFolder = path.join(
        thumbnailsDir,
        project,
        folder
      );

      fs.mkdirSync(outputFolder, { recursive: true });

      const images = fs.readdirSync(folderPath);

      for (const image of images) {
        if (!/\.(jpg|jpeg|png|webp)$/i.test(image)) continue;

        const input = path.join(folderPath, image);
        const output = path.join(outputFolder, image);

        await sharp(input)
          .resize({
            width: 800,
            withoutEnlargement: true
          })
          .jpeg({ quality: 70 })
          .toFile(output);

        console.log("Created:", output);
      }
    }
  }

  console.log("✅ All thumbnails created");
}

createThumbnails();