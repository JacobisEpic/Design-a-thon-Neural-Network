
const http = require('http');
const fs = require('fs');
const path = require('path');
const formidable = require('formidable');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  console.log(`Request for ${req.url} received.`);

  if (req.method.toLowerCase() === 'post') {
    const form = formidable({ multiples: true, uploadDir: '/Users/jacobc/Documents/Design-a-thon-Neural-Network' + '/uploads' });

    form.parse(req, (err, fields, files) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(`Error: ${err}`);
        return;
      }

      // Move the uploaded file(s) to the uploads directory
      for (const file of Object.values(files)) {
        const oldPath = file.path;
        const newPath = path.join('/Users/jacobc/Documents/Design-a-thon-Neural-Network', 'uploads', file.name);
        fs.rename(oldPath, newPath, err => {
          if (err) throw err;
          console.log(`Moved file ${file.name} to ${newPath}`);
        });
      }

      // Send a response to the client
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('File(s) uploaded successfully!');
    });
  } else {
    // Determine the file path and content type based on the request URL
    let filePath = '.' + req.url;
    if (filePath == './') {
      filePath = './index.html'; // Serve index.html as the default file
    }
    const extname = path.extname(filePath);
    let contentType = 'text/html';
    if (extname === '.css') {
      contentType = 'text/css';
    }

    // Check if the file exists
    fs.readFile(filePath, (err, content) => {
      if (err) {
        if (err.code == 'ENOENT') {
          res.writeHead(404);
          res.end('404 Not Found');
        } else {
          res.writeHead(500);
          res.end('500 Internal Server Error');
        }
      } else {
        // Send the file content with the correct content type
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content, 'utf-8');
      }
    });
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


///new version
// const express = require('express');
// const multer = require('multer');
// const path = require('path');

// const app = express();

// // Set up the file upload storage options
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, 'uploads')); // specify the upload directory
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname); // keep the original file name
//   },
// });

// // Create a multer upload object with the storage options
// const upload = multer({ storage: storage });

// // Serve the HTML form with the file upload button
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'index.html'));
// });

// // Handle the file upload when the form is submitted
// app.post('/upload', upload.single('file'), (req, res) => {
//   if (req.file) {
//     console.log(`Uploaded file: ${req.file.originalname}`);
//     res.status(200).send('File uploaded successfully!');
//   } else {
//     console.error('No file uploaded');
//     res.status(400).send('No file uploaded');
//   }
// });

// // Start the server
// const port = 3000;
// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });
