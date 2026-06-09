require('dotenv').config(); 

const express = require('express');
const app = express();
const pool = require('./db'); 
const session = require('express-session')
const cors = require('cors');

app.use(cors()); // เปิดสิทธิ์ให้หน้าบ้านดึงข้อมูลได้
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SESSION_SECRET, // ดึงรหัสลับมาจาก .env
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 } // กำหนดอายุเซสชันให้อยู่ได้ 1 วัน (ระบุเป็นมิลลิวินาที)
}));

// ฟังก์ชันตรวจสอบและสร้างตารางข้อมูลใน PostgreSQL
async function initDatabase() {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS posts (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            content TEXT NOT NULL,
            date DATE NOT NULL,
            updated_at DATE
        );
    `;
    try {
        await pool.query(createTableQuery);
        console.log('Database table "posts" is ready.');
    } catch (err) {
        console.error('Error creating database table:', err);
    }
}

// เรียกใช้งานฟังก์ชันสร้างตารางทันที
initDatabase();

const blogRoutes = require('./routes/blog');
const adminRoutes = require('./routes/admin');

app.use('/', blogRoutes);
app.use('/admin', adminRoutes);

app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});