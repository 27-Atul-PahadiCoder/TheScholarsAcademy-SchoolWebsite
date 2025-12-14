
const fs = require('fs');
const path = require('path');
console.log(`Project root: ${projectRoot}`);
console.log(`Source directory: ${srcDir}`);
console.log(`Images directory: ${imagesDir}`);


const imageFiles = glob.sync(`${imagesDir}/**/*.{jpg,jpeg,png,svg,gif}`);
const imageUsage = {};

console.log(`Found ${imageFiles.length} image files.`);

imageFiles.forEach(imagePath => {
    const imageName = path.basename(imagePath);
    const relativeImagePath = path.relative(projectRoot, imagePath).replace(/\\/g, '/');
    imageUsage[relativeImagePath] = [];

    const searchResults = glob.sync(`${srcDir}/**/*.{ts,tsx}`);
    
    searchResults.forEach(filePath => {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        if (fileContent.includes(imageName)) {
            const relativeFilePath = path.relative(projectRoot, filePath).replace(/\\/g, '/');
            imageUsage[relativeImagePath].push(relativeFilePath);
        }
    });
});

const outputFilePath = path.join(projectRoot, 'src', 'config', 'image-usage.json');
fs.writeFileSync(outputFilePath, JSON.stringify(imageUsage, null, 2));

console.log(`Image usage analysis complete. Results saved to ${outputFilePath}`);


