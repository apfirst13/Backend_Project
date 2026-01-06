<h1>Result of your calculation:</h1>
<?php 

// default value
$temp = (float)$_GET["Temp"];
$unitFrom = $_GET["UnitFrom"];
$unitTo = $_GET["UnitTo"];

$result = 0;

// Logic: Check 'From' unit, then convert to 'To' unit
// Note: Based on index.html value="milimeter" (lowercase)
// 1. แปลงขาเข้า ให้เป็น "เมตร" (Base Unit) ก่อน
$tempInCelsius = 0;
switch ($unitFrom) {
    case "celsius": $tempInCelsius = $temp; break;
    case "Fahrenheit": $tempInCelsius = ($temp - 32) * 5/9 ; break;
    case "Kelvin":      $tempInCelsius = $temp - 273.15; break;

}

// 2. แปลงจาก "เมตร" เป็น "ขาออก" ตามที่ลูกค้าขอ
switch ($unitTo) {

    case "celsius": $result = $tempInCelsius ; break;
    case "Fahrenheit": $result = ($tempInCelsius * 9/5) + 32; break;
    case "Kelvin":      $result = $tempInCelsius + 273.15; break;
    
}
 
 echo "Converted: " . $temp . " " . $unitFrom . " = " . $result . " " . $unitTo;
 
?>

<!-- <br><br>
<a href="index.html">
    <button>Reset / New Calculation</button>
</a> -->

<br><br>
<button onclick="window.history.back()">Go Back</button>