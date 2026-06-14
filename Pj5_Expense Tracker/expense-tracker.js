#!/user/bin/ env node

const { command } = require('commander')
const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'expenses.json');


function readExpenses() {
    // ถ้ายังไม่มีไฟล์ expenses.json ให้ส่ง Array ว่างกลับไป
    if (!fs.existsSync(DATA_FILE)) {
        return [];
    }
    try {
        // อ่านข้อความดิบจากไฟล์
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        // แปลงข้อความดิบให้เป็น JavaScript Array / Object
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading data file.');
        return [];
    }
}