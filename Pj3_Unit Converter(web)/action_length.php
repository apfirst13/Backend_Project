<h1>Result of your calculation:</h1>
<?php 

// default value
$length = (float)$_GET["Length"];
$unitFrom = $_GET["UnitFrom"];
$unitTo = $_GET["UnitTo"];

$result = 0;

// Logic: Check 'From' unit, then convert to 'To' unit
// Note: Based on index.html value="milimeter" (lowercase)
// 1. แปลงขาเข้า ให้เป็น "เมตร" (Base Unit) ก่อน
$lengthInMeters = 0;
switch ($unitFrom) {
    case "millimeter": $lengthInMeters = $length / 1000; break;
    case "centimeter": $lengthInMeters = $length / 100; break;
    case "meter":      $lengthInMeters = $length; break;
    case "kilometer":  $lengthInMeters = $length * 1000; break;
    case "inch":       $lengthInMeters = $length * 0.0254; break;
    case "feet":       $lengthInMeters = $length * 0.3048; break;
    case "yard":       $lengthInMeters = $length * 0.9144; break;
    case "mile":       $lengthInMeters = $length * 1609.34; break;
}

// 2. แปลงจาก "เมตร" เป็น "ขาออก" ตามที่ลูกค้าขอ
switch ($unitTo) {
    case "millimeter": $result = $lengthInMeters * 1000; break;
    case "centimeter": $result = $lengthInMeters * 100; break;
    case "meter":      $result = $lengthInMeters; break;
    case "kilometer":  $result = $lengthInMeters / 1000; break;
    case "inch":       $result = $lengthInMeters / 0.0254; break;
    case "feet":       $result = $lengthInMeters / 0.3048; break;
    case "yard":       $result = $lengthInMeters / 0.9144; break;
    case "mile":       $result = $lengthInMeters / 1609.34; break;
    
}
 
 echo "Converted: " . $length . " " . $unitFrom . " = " . $result . " " . $unitTo;
 
?>

<!-- <br><br>
<a href="index.html">
    <button>Reset / New Calculation</button>
</a> -->

<br><br>
<button onclick="window.history.back()">Go Back</button>