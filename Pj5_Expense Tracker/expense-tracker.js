#!/usr/bin/env node

const { Command } = require('commander');
const fs = require('fs');
const path = require('path');

const program = new Command();
const DATA_FILE = path.join(__dirname, 'expenses.json');

function readExpenses() {
    if (!fs.existsSync(DATA_FILE)) {
        return [];
    }
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading data file.');
        return [];
    }
}

function writeExpenses(expenses) {
    // แก้ไขคำว่า stringify ให้ถูกต้อง
    fs.writeFileSync(DATA_FILE, JSON.stringify(expenses, null, 2));
}

function getCurrentDate() {
    const today = new Date();
    return today.toISOString().split('T')[0]; 
}

program
    .name('expense-tracker')
    .description('CLI Application to manage your personal finances')
    .version('1.0.0');

// 1. คำสั่ง Add
program 
    .command('add')
    .description('Add a new expense')
    .requiredOption('-d, --description <text>', 'Description of the expense')
    .requiredOption('-a, --amount <number>', 'Amount of the expense')
    .action((options) => {

        const amount = parseFloat(options.amount);
        if (isNaN(amount) || amount <= 0) {
            console.error('Error: Amount must be a positive number.');
            process.exit(1);
        }

        const expenses = readExpenses();
        const newId = expenses.length > 0 ? Math.max(...expenses.map(e => e.id)) + 1 : 1;

        const newExpense = {
            id: newId,
            date: getCurrentDate(),
            description: options.description,
            amount: amount
        };

        expenses.push(newExpense);
        writeExpenses(expenses);
        
        // แก้ไขการใช้ Single Quote เป็น Backtick (ตัวหนอน)
        console.log(`Expense added successfully (ID: ${newId})`);
    });

// 2. คำสั่ง List
program
    .command('list')
    .description('View all expenses')
    .action(() => {
        const expenses = readExpenses();

        if (expenses.length === 0) {
            console.log('No expenses found.');
            return;
        }

        console.log('ID'.padEnd(5) + 'Date'.padEnd(15) + 'Description'.padEnd(20) + 'Amount');
        // แก้ไขคำสั่ง console.logn
        console.log('-'.repeat(50));

        // แก้ไขจากการเรียก expense.array.forEach เป็น expenses.forEach
        expenses.forEach(e => {
            // แก้ไขการใช้ Single Quote เป็น Backtick (ตัวหนอน)
            console.log(`${e.id.toString().padEnd(5)}${e.date.padEnd(15)}${e.description.padEnd(20)}$${e.amount}`);
        });
    });

    program
    .command('delete')
    .description('Delete an expense')
    .requiredOption('--id <number>', 'Expense ID to delete')
    .action((options) => {
        const id = parseInt(options.id);
        
        // 1. อ่านข้อมูลทั้งหมดจากไฟล์
        let expenses = readExpenses();
        const initialLength = expenses.length;
        
        // 2. กรองเอาเฉพาะรายการที่ ID ไม่ตรงกับที่ระบุ (คัดรายการที่ต้องการลบออก)
        expenses = expenses.filter(e => e.id !== id);

        // 3. เช็คว่าจำนวนรายการลดลงไหม ถ้าเท่าเดิมแปลว่าหา ID นั้นไม่เจอ
        if (expenses.length === initialLength) {
            console.error(`Error: Expense with ID ${id} not found.`);
            process.exit(1);
        }

        // 4. บันทึกข้อมูลที่เหลือกลับลงไฟล์
        writeExpenses(expenses);
        console.log('Expense deleted successfully');
    });
    // update
    program
    .command('update')
    .description('Update an existing expense')
    .requiredOption('--id <number>', 'Expense ID to update')
    .option('-d, --description <text>', 'New description')
    .option('-a, --amount <number>', 'New amount')
    .action((options) => {
        const id = parseInt(options.id);
        const expenses = readExpenses();
        
        // 1. ค้นหาตำแหน่งของ ID ใน Array
        const index = expenses.findIndex(e => e.id === id);

        if (index === -1) {
            console.error(`Error: Expense with ID ${id} not found.`);
            process.exit(1);
        }

        // 2. ถ้าผู้ใช้พิมพ์ข้อมูลใหม่เข้ามา ให้เปลี่ยนค่าในตำแหน่งนั้น
        if (options.description) {
            expenses[index].description = options.description;
        }
        
        if (options.amount) {
            const amount = parseFloat(options.amount);
            if (isNaN(amount) || amount <= 0) {
                console.error('Error: Amount must be a positive number.');
                process.exit(1);
            }
            expenses[index].amount = amount;
        }

        // 3. บันทึกค่าที่แก้ไขแล้วลงไฟล์
        writeExpenses(expenses);
        console.log(`Expense ID ${id} updated successfully.`);
    });
//summary
    program
    .command('summary')
    .description('View summary of expenses')
    .option('-m, --month <number>', 'Specify month (1-12) of current year')
    .action((options) => {
        const expenses = readExpenses();
        let filteredExpenses = expenses;
        let monthText = '';

        // ถ้าผู้ใช้ระบุเดือนเข้ามา เช่น --month 8
        if (options.month) {
            const month = parseInt(options.month);
            if (isNaN(month) || month < 1 || month > 12) {
                console.error('Error: Month must be between 1 and 12.');
                process.exit(1);
            }
            
            const currentYear = new Date().getFullYear();
            // แปลงเลขเดือนให้เป็น 2 หลัก เช่น 8 -> "08" เพื่อให้ตรงกับ format วันที่ในไฟล์ JSON
            const monthStr = month.toString().padStart(2, '0'); 
            
            // กรองเอาเฉพาะรายการที่วันที่ขึ้นต้นด้วย ปี-เดือน ที่ระบุ
            filteredExpenses = expenses.filter(e => e.date.startsWith(`${currentYear}-${monthStr}`));
            
            // แปลงตัวเลขเดือนให้เป็นชื่อเดือนภาษาอังกฤษ เช่น August
            const monthName = new Date(currentYear, month - 1).toLocaleString('en-US', { month: 'long' });
            monthText = ` for ${monthName}`;
        }

        // ใช้คำสั่ง .reduce เพื่อวนลูปรวบยอดรวมตัวเลข amount ทั้งหมด
        const total = filteredExpenses.reduce((sum, e) => sum + e.amount, 0);
        console.log(`Total expenses${monthText}: $${total}`);
    });
program.parse(process.argv);
