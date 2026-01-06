<h1>Result of your calculation:</h1>
<?php 

// default value
$Weight = (float)$_GET["Weigth"];
$unitFrom = $_GET["UnitFrom"];
$unitTo = $_GET["UnitTo"];

$result = 0;

// Logic: Check 'From' unit, then convert to 'To' unit
// Note: Based on index.html value="milimeter" (lowercase)
// 1. แปลงขาเข้า ให้เป็น "เมตร" (Base Unit) ก่อน
$WeighthInGram = 0;
switch ($unitFrom) {
    case "milligram": $lengthInGram = $Weight   / 1000; break;
    case "gram": $lengthInGram = $Weight ; break;
    case "kilogram":      $lengthInGram = $Weight * 1000  ; break;
    case "ounce":  $lengthInGram = $Weight  * 28.3495; break;
    case "pound":  $lengthInGram = $Weight  * 453.592; break;
}

// 2. แปลงจาก "เมตร" เป็น "ขาออก" ตามที่ลูกค้าขอ
switch ($unitTo) {
    case "milligram": $result = $lengthInGram * 1000; break;
    case "gram": $result = $lengthInGram; break;
    case "kilogram":      $result = $lengthInGram / 1000; break;
    case "ounce":  $result = $lengthInGram * 0.035274; break;
    case "pound":       $result = $lengthInGram  * 0.00220462;; break;
    
}
 
 echo "Converted: " . $Weight . " " . $unitFrom . " = " . $result . " " . $unitTo;
 
?>

<!-- <br><br>
<a href="index.html">
    <button>Reset / New Calculation</button>
</a> -->

<br><br>
<button onclick="window.history.back()">Go Back</button>