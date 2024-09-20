const formidable = require('formidable');
const fs = require('fs');
const path = require('path');

const uploadsDir = path.join(__dirname, '..', 'uploads');

// Verifica si la carpeta 'uploads' existe, si no, la crea
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const parseForm = (req) => {
  return new Promise((resolve, reject) => {
    const form = formidable({ multiples: true, uploadDir: uploadsDir, keepExtensions: true });

    form.on('fileBegin', (name, file) => {
      file.path = path.join(uploadsDir, file.name);
    });

    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
      }
      resolve({ fields, files });
    });
  });
};

module.exports = parseForm;
