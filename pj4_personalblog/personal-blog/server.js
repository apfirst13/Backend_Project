const express = require('express');
const fs = require('node:fs'); // เพิ่มบรรทัดนี้: fs ย่อมาจาก File System เอาไว้อ่านไฟล์ในเครื่อง

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

// ดักจับ Request ที่มีคำว่า /article/ ตามด้วยตัวเลขอะไรก็ได้ (:id)
app.get('/article/:id', (req, res) => {
    // 1. รับ ID จาก URL (เช่น ถ้าเข้า /article/1 ค่า req.params.id จะเท่ากับ 1)
    const articleId = req.params.id;

    // 2. เดินไปอ่านไฟล์ posts.json เหมือนเดิม
    const rawData = fs.readFileSync('./data/posts.json');
    const posts = JSON.parse(rawData);

    // 3. ค้นหาบทความที่มี id ตรงกับที่ลูกค้าขอมา
    // .find() เป็นคำสั่งของ JavaScript ไว้หาของใน List ครับ
    const post = posts.find(p => p.id == articleId);

    // 4. ส่งข้อมูลบทความที่หาเจอ ไปให้หน้า article.ejs แสดงผล
    res.render('article', { post: post });
});

app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});