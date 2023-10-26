const fs = require('fs');
const https = require('https');
const path = require('path');

function downloadImage(url, destPath, maxRetries = 3, retryDelay = 1000) {
    return new Promise((resolve, reject) => {
        let retries = 0;

        function performDownload() {
            const file = fs.createWriteStream(destPath);
            const options = {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'
                }
            };
            const request = https.get(url, options, response => {
                if (response.statusCode === 200) {
                    response.pipe(file);
                    file.on('finish', () => {
                        file.close();
                        resolve();
                    });
                } else {
                    if (retries < maxRetries) {
                        retries++;
                        setTimeout(performDownload, retryDelay);
                    } else {
                        reject(new Error(`Failed to download: ${url}, status code: ${response.statusCode}`));
                    }
                }
            });

            request.on('error', error => {
                if (retries < maxRetries) {
                    retries++;
                    setTimeout(performDownload, retryDelay);
                } else {
                    reject(error);
                }
            });
        }

        performDownload();
    });
}


async function downloadImagesAndUpdateJson(jsonFilePath, outputFolder, newDataFilePath) {
    try {
        const jsonData = fs.readFileSync(jsonFilePath, 'utf8');
        const data = JSON.parse(jsonData);
        const listings = data.listings;

        if (!fs.existsSync(outputFolder)) {
            fs.mkdirSync(outputFolder, { recursive: true });
        }

        for (const listing of listings) {
            const images = listing.images.images;
            images.push(listing.images.show_image);
            const listingFolder = outputFolder;


            const downloadedImagePaths = [];

            for (let i = 0; i < images.length; i++) {
                const imageUrl = images[i];
                const imageFileName = `image_${listing.mlsNumber}_${Date.now()}.jpg`;
                const imagePath = path.join(listingFolder, imageFileName);

                console.log(`Downloading ${imageUrl} to ${imagePath}`);
                await downloadImage(imageUrl, imagePath);
                console.log(`Downloaded ${imageFileName}`);

                downloadedImagePaths.push(imagePath);
            }

            // Replace image URLs with local paths
            listing.images.images = downloadedImagePaths.splice(0, downloadedImagePaths.length - 2).map(d=>d.split('\\').join('/').split('public').join(''));;
            listing.images.show_image =downloadedImagePaths[0].split('\\').join('/').split('public').join('');
            fs.writeFileSync(newDataFilePath, JSON.stringify(data, null, 2));
        }

        // Update the data and save it to a new file
        const updatedData = { ...data, downloaded: true };
        fs.writeFileSync(newDataFilePath, JSON.stringify(updatedData, null, 2));

        console.log('All images downloaded successfully and JSON updated.');
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

// Usage
const jsonFilePath = './data/sold.json'; // Change this to your JSON file path
const outputFolder = './public/house_images'; // Change this to your desired output folder
const newDataFilePath = './data/soldHouses_Big.json'; // Change this to the desired path for the updated data file
downloadImagesAndUpdateJson(jsonFilePath, outputFolder, newDataFilePath);
