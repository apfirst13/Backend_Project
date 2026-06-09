const express = require('express');
const router = express.Router();
const pool = require('../db'); // นำเข้าท่อเชื่อมต่อฐานข้อมูล
const checkAuth = require('./auth');

router.use(checkAuth);

// 1. หน้าแสดงรายการหลังบ้านสำหรับจัดการ (READ)
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM posts ORDER BY id DESC');
        res.render('admin', { posts: result.rows });
    } catch (err) {
        console.error('Error fetching admin posts:', err);
        res.status(500).send('Server Error');
    }
});

// 2. หน้าฟอร์มสำหรับดึงข้อมูลเดิมมาเตรียมแก้ไข (READ Single Row)
router.get('/edit/:id', async (req, res) => {
    const articleId = req.params.id;
    try {
        const result = await pool.query('SELECT * FROM posts WHERE id = $1', [articleId]);
        const post = result.rows[0];

        if (!post) {
            return res.status(404).send('Article Not Found');
        }

        res.render('edit', { post: post });
    } catch (err) {
        console.error('Error fetching post for edit:', err);
        res.status(500).send('Server Error');
    }
});

// 3. ระบบรับข้อมูลจากฟอร์มเพื่อบันทึกบทความใหม่ (CREATE)
router.post('/add', async (req, res) => {
    const { title, content } = req.body;
    const currentDate = new Date().toISOString().split('T')[0];

    try {
        // ใช้คำสั่ง INSERT INTO โดยไม่ต้องใส่ id ระบบจะเจนให้เอง
        const insertQuery = 'INSERT INTO posts (title, content, date) VALUES ($1, $2, $3)';
        await pool.query(insertQuery, [title, content, currentDate]);
        
        // บันทึกเสร็จให้กลับไปหน้าแรกของเว็บเพื่อดูบทความใหม่
        res.redirect('/');
    } catch (err) {
        console.error('Error adding new post:', err);
        res.status(500).send('Server Error');
    }
});

// 4. ระบบลบบทความตาม ID (DELETE)
router.post('/delete/:id', async (req, res) => {
    const articleId = req.params.id;
    try {
        // ใช้คำสั่ง DELETE FROM ตามด้วยเงื่อนไข ID
        await pool.query('DELETE FROM posts WHERE id = $1', [articleId]);
        res.redirect('/admin');
    } catch (err) {
        console.error('Error deleting post:', err);
        res.status(500).send('Server Error');
    }
});

// 5. ระบบอัปเดตข้อมูลบทความหลังแก้ไข (UPDATE)
router.post('/edit/:id', async (req, res) => {
    const articleId = req.params.id;
    const { title, content } = req.body;
    const updatedAt = new Date().toISOString().split('T')[0];

    try {
        // ใช้คำสั่ง UPDATE และ SET คอลัมน์ที่ต้องการเปลี่ยน
        const updateQuery = `
            UPDATE posts 
            SET title = $1, content = $2, updated_at = $3 
            WHERE id = $4
        `;
        await pool.query(updateQuery, [title, content, updatedAt, articleId]);
        res.redirect('/admin');
    } catch (err) {
        console.error('Error updating post:', err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;