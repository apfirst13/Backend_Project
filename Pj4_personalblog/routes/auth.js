function checkAuth(req, res, next) {
    // ตรวจสอบว่าในเซสชันมีข้อมูลการล็อกอินระบุอยู่หรือไม่
    if (req.session && req.session.isLoggedIn) {
        // ถ้าล็อกอินแล้ว ให้เรียกฟังก์ชัน next() เพื่อให้ผู้ใช้เดินทางไปต่อได้เลย
        return next();
    }
    
    // ถ้ายังไม่ได้ล็อกอิน ให้ดีดกลับไปที่หน้าล็อกอินหลัก
    res.redirect('/login');
}

module.exports = checkAuth;