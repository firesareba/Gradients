let c = document.getElementById("gradient-surface");
let ctx = c.getContext("2d");

gradient(
    [0, 0, 0], 
    [255, 255, 255]
);

function gradient(top_left, bottom_right) {
    for (let x = 0; x < c.width; x++){
        for (let y = 0; y < c.height; y++){
            var top_distance = Math.abs(0-x) + Math.abs(0-y);
            var bottom_distance = Math.abs(c.width-x) + Math.abs(c.height-y);

            var sum = top_distance+bottom_distance;
            var avg = sum/2;

            top_distance = ((avg-top_distance)*2)+top_distance;
            bottom_distance = ((avg-bottom_distance)*2)+bottom_distance;

            var top_multiplier = (top_distance/sum);
            var bottom_multiplier = (bottom_distance/sum);

            var pixel_color = [0, 0, 0];
            for (let idx = 0; idx < 3; idx++){
                var color = (top_left[idx]*top_multiplier) + (bottom_right[idx]*bottom_multiplier);
                pixel_color[idx] = color;
            }
            setPixel(x, y, pixel_color);
        }
    }
}

function setPixel(x, y, rgb) {
    ctx.fillStyle = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
    ctx.fillRect(x, y, 1, 1)
}
