const express = require('express');
const app = express();

// บอกให้ Express รู้ว่าเราจะใช้ EJS เป็นตัวสร้างหน้าเว็บนะ
app.set('view engine', 'ejs');

// ดักจับ Request ที่เข้ามาหน้า Home (URL: / )
app.get('/', (req, res) => {
    // เปลี่ยนจาก res.send เป็น res.render เพื่อส่งไฟล์ home.ejs ไปให้ลูกค้า
    res.render('home'); 
});

// เปิด Server รอรับลูกค้าที่พอร์ต 3000
app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});