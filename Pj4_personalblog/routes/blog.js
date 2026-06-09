const express = require('express');
const router = express.Router();
const pool = require('../db'); 


// หน้าแรก EJS
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM posts ORDER BY id DESC');
        res.render('home', { posts: result.rows });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// หน้าอ่านบทความฉบับเต็ม EJS
router.get('/article/:id', async (req, res) => {
    const articleId = req.params.id;
    try {
        const result = await pool.query('SELECT * FROM posts WHERE id = $1', [articleId]);
        const post = result.rows[0];
        if (!post) return res.status(404).send('Article Not Found');
        res.render('article', { post: post });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});



// 1. API ดึงบทความทั้งหมด สำหรับหน้าแรกของ React
router.get('/api/posts', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM posts ORDER BY id DESC');
        res.json(result.rows); 
    } catch (err) {
        res.status(500).json({ error: 'Server Error' });
    }
});

// 2. API ดึงบทความเดี่ยวตาม ID สำหรับหน้าอ่านฉบับเต็มของ React
router.get('/api/posts/:id', async (req, res) => {
    const articleId = req.params.id;
    try {
        const result = await pool.query('SELECT * FROM posts WHERE id = $1', [articleId]);
        const post = result.rows[0];
        
        if (!post) {
            return res.status(404).json({ error: 'Article Not Found' });
        }
        
        res.json(post); // ส่งอ็อบเจกต์บทความชิ้นนั้นกลับไปเป็น JSON
    } catch (err) {
        res.status(500).json({ error: 'Server Error' });
    }
});

// 1. เปิดหน้าฟอร์มล็อกอิน
router.get('/login', (req, res) => {
    res.render('login');
});

// 2. ตรวจสอบรหัสผ่านที่ส่งมาจากฟอร์ม
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // ตรวจสอบกับค่าในไฟล์ .env
    if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
        req.session.isLoggedIn = true; // บันทึกสถานะว่าล็อกอินสำเร็จ
        res.redirect('/admin'); // พาเข้าหน้าจัดการหลังบ้าน
    } else {
        res.send('<script>alert("รหัสผ่านไม่ถูกต้อง"); window.location.href="/login";</script>');
    }
});

// 3. ระบบออกจากระบบ (Logout)
router.get('/logout', (req, res) => {
    req.session.destroy(); // ล้างข้อมูล Session
    res.redirect('http://localhost:5173'); // ดีดกลับไปหน้าแรกของ React
});

module.exports = router;