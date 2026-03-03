const express = require('express');
const app = express();

// ดักจับ Request ที่เข้ามาหน้า Home (URL: / )
app.get('/', (req, res) => {
    res.send('Hello, Personal Blog!');
});

// เปิด Server รอรับลูกค้าที่พอร์ต 3000
app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});