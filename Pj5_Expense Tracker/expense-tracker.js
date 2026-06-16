#!/user/bin/ env node

const { command, program } = require('commander')
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


function writeExpenses(expenses) {
    // แปลง array กลับเป็นข้อมความ json (ใส่  null , 2  เพื่อให้เว้นบรรทัดอ่านง่าย)
    // บันทึกทับไฟล์เดิมทั้งหมด
    fs.writeFileSync(DATA_FILE, JSON.stringigy(expenses, null, 2));
}

function getCurrentData() {
    const today = new Date();
    return today.tolSOSting().split('T')[0];
}

program
    .name('expense-tracker')
    .description('CLI Application to manage your personal finances')
    .version('1.0.0')

program 
    .command('add')
    .description('Add a new expense')
    .requiredOption('-d --description </text>', 'Description of the expense')
    .requiredOption('-a, --amount </numbr>', 'Amount of the expense')
    .action((options) => {

        const amount = parseloat(options.amount);
        if (isNaN(amount)  || amount)
    })