
document.addEventListener("DOMContentLoaded", function () {

    const btn = document.getElementById('get-palette')
    btn.addEventListener('click', () => {
        populateColors();
    })
});

function populateColors() {
    chrome.runtime.sendMessage({ method: "getColors" }, function (response) {
        // Sort the colors by frequency
        const colorCounts = {};
        response.forEach((color) => {
            colorCounts[color] = (colorCounts[color] || 0) + 1;
        });
        const sortedColors = Object.keys(colorCounts).sort(
            (a, b) => colorCounts[b] - colorCounts[a]
        );

        // Create blocks of the most frequent colors
        const colorsContainer = document.getElementById("output");
        for (let i = 0; i < 5 && i < sortedColors.length; i++) {
            const colorBlock = document.createElement("div");
            colorBlock.style.backgroundColor = sortedColors[i];
            colorBlock.style.width = "50px";
            colorBlock.style.height = "50px";
            colorBlock.style.margin = "5px";
            colorBlock.style.border = "1px solid black";
            colorsContainer.appendChild(colorBlock);
        }
    });
}