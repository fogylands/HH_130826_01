const fs = require('fs');
const path = require('path');

const PROJECTS_DIR = path.join(__dirname, '03_Projects');
const OUTPUT_FILE = path.join(PROJECTS_DIR, 'projects.json');

const projects = [];

fs.readdirSync(PROJECTS_DIR).forEach(projectNumber => {
  const projectPath = path.join(PROJECTS_DIR, projectNumber);

  if (!fs.statSync(projectPath).isDirectory()) return;

  // Default metadata
const parts = projectNumber.split('_');

  let number = parts[0]; // "2003"
  let name = parts.slice(1, -1).join(' ');
  let description = '';
  let credits = '';
  let location =``;
  let year =``;
  let type =``;
  let status=``;
  

  // Optional project.txt (if it exists)
  const txtPath = path.join(projectPath, 'Project-Description.txt');
  if (fs.existsSync(txtPath)) {
    const lines = fs
  .readFileSync(txtPath, 'utf8')
  .split('\n')
  .map(line => line.trim());



// Line 1 = name (remove underscores)
name = (lines.shift() || name)
  .replace(/^\d+_/, '')   // remove "01_"
  .replace(/_/g, ' ');


const creditsIndex = lines.findIndex(line =>
  line.startsWith('Bauleiter:')
);

const detailsIndex = lines.findIndex(line =>
  line.startsWith('Ort:')
);



const descriptionEnd = detailsIndex !== -1 ? detailsIndex : lines.length;

description = lines
  .slice(0, descriptionEnd)
  .join('\n')
  .trim();


 if (detailsIndex !== -1) {
  lines.slice(detailsIndex).forEach(line => {

    if (line.startsWith('Ort:')) {
      location = line.replace('Ort:', '').trim();
    }

    if (line.startsWith('Zeitraum:')) {
      year = line.replace('Zeitraum:', '').trim();
    }

    if (line.startsWith('Art:')) {
      type = line.replace('Art:', '').trim();
    }

    if (line.startsWith('Status:')) {
      status = line.replace('Status:', '').trim();
    }

  });
}

// Details = Ort until the end
if (detailsIndex !== -1) {
  details = lines
    .slice(detailsIndex)
    .join('\n')
    .trim();
}
  }

  // Read Credits.txt
const creditsPath = path.join(projectPath, 'Credits.txt');

if (fs.existsSync(creditsPath)) {
  credits = fs
    .readFileSync(creditsPath, 'utf8')
    .trim()
    .split('\n')
    .map(line => line.trim())
    .filter(line => line !== '')
    .join('<br>');
}

  // Gather images by folder
  const images = {};
  fs.readdirSync(projectPath).forEach(folder => {
    const folderPath = path.join(projectPath, folder);
    if (!fs.statSync(folderPath).isDirectory()) return;

    images[folder] = fs
      .readdirSync(folderPath)
      .filter(f => /\.(jpg|png|webp)$/i.test(f))
      .sort();
  });

projects.push({
  number,
  name,
  id: projectNumber,
  description,
  credits,
  location,
  year,
  type,
  status,
  images
});
});

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(projects, null, 2));
console.log('✅ projects.json generated');