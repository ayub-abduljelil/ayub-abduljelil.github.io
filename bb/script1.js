
var input1 = document.getElementById("input1");
var input2 = document.getElementById("input2");
var display = document.getElementById("color_display");
var color1 = document.getElementById("color1");
var color2 = document.getElementById("color2");
var body = document.querySelector("body");
function setgradient() {
    // Update the background using the input values
    body.style.background = "linear-gradient(to right, " + input1.value + ", " + input2.value + ")";
    
    // Update the displayed text to match
    color1.textContent = input1.value;
    color2.textContent = input2.value;
}
// Call it once on load to set the initial background and text
setgradient();
// Add event listeners to update on input change
input1.addEventListener("input", setgradient);
input2.addEventListener("input", setgradient);