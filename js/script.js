// Wait until the page loads
document.addEventListener("DOMContentLoaded", function() {
    const button = document.getElementById("clickBtn");
    button.addEventListener("click", function() {
        alert("Hello! Thanks for clicking the button 😊");
    });
});
