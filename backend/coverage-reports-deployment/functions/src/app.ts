import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

const publicDir = join(__dirname, 'public');
console.log('Public directory path:', publicDir); // For debugging

app.use('/user-service-coverage', express.static(join(publicDir, 'user-service'), {
  etag: false,
  maxAge: 0
}));
app.use('/product-service-coverage', express.static(join(publicDir, 'product-service'), {
  etag: false,
  maxAge: 0
}));

app.get('/', (req, res) => {
    res.send(`
        <h1>Code Coverage Reports</h1>
        <ul>
            <li><a href="/user-service-coverage/">User Service Coverage</a></li>
            <li><a href="/product-service-coverage/">Product Service Coverage</a></li>
        </ul>
    `);
});

// // Start server
// app.listen(8080, () => {
//     console.log('Server started on port 8080');
// });

export default app;