const express = require('express');
const fs = require('fs'); // 👈 เพิ่มบรรทัดนี้: fs ย่อมาจาก File System เอาไว้อ่านไฟล์ในเครื่อง

const app = express();
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    // 1. Backend เดินไปอ่านไฟล์ posts.json
    const rawData = fs.readFileSync('./data/posts.json');
    
    // 2. แปลงข้อความ JSON ให้เป็นข้อมูลที่ JavaScript เอาไปใช้งานได้
    const posts = JSON.parse(rawData);
    
    // 3. ส่งข้อมูลที่ชื่อว่า posts แนบไปกับไฟล์ home.ejs
    res.render('home', { posts: posts }); 
});

app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});