const hex_to_dec = {
    '0':0,
    '1':1,
    '2':2,
    '3':3,
    '4':4,
    '5':5,
    '6':6,
    '7':7,
    '8':8,
    '9':9,
    'a':10,
    'b':11,
    'c':12,
    'd':13,
    'e':14,
    'f':15,
};

const surface = document.getElementById("gradient-surface");
let ctx = surface.getContext("2d");
const exponent_picker = document.getElementById("exponent-picker");
const exponent_value = document.getElementById("exponent-value");
const dist_method_picker = document.getElementById("distance-type");
const gradient_button = document.getElementById("set-gradient");

const top_left = document.getElementById("top-left-picker");
const top_right = document.getElementById("top-right-picker");
const bottom_left = document.getElementById("bottom-left-picker");
const bottom_right = document.getElementById("bottom-right-picker");

//make white
for (let x = 0; x < surface.height; x++){
    for (let y = 0; y < surface.width; y++){
        setPixel(x, y, [255, 255, 255], 0);
    }
}

//listeners
exponent_picker.addEventListener('change', (event) => {
    exponent_value.innerHTML = `Exponent Value: ${exponent_picker.value}`;

    if (bottom_right){
        gradient(
        [[[0, 0], getRGB(top_left.value)], 
        [[surface.width, 0], getRGB(top_right.value)], 
        [[0, surface.height], getRGB(bottom_left.value)], 
        [[surface.width, surface.height], getRGB(bottom_right.value)]]
        );
    }
}
);

gradient_button.addEventListener('click', (event) => {//colors = [Each color:[[position x,y], [r, g, b]]
    gradient(
        [[[0, 0], getRGB(top_left.value)], 
        [[surface.width, 0], getRGB(top_right.value)], 
        [[0, surface.height], getRGB(bottom_left.value)], 
        [[surface.width, surface.height], getRGB(bottom_right.value)]]
    );
});


function gradient(colors, distance_method) {
    var height = surface.height;
    var width = surface.width;
    
    for (let x = 0; x < height; x++){
        for (let y = 0; y < width ; y++){
            var sum = 0;
            
            for (const source of colors){
                sum += get_distance(source[0][0], source[0][1], x, y);
            }
            let avg = sum / colors.length;
            
            var pixel_color = [0, 0, 0];
            for (let idx = 0; idx < 3; idx++){
                var color = 0;
                for (const source of colors){
                    var distance = get_distance(source[0][0], source[0][1], x, y);
                    var multiplier = ((avg-distance)*2 + distance) / sum;
                    color += source[1][idx] * multiplier;
                }
                
                pixel_color[idx] = color;
            }
            setPixel(x, y, pixel_color)
        }
    }
}

function get_distance(x1, y1, x2, y2){
    var original_distance
    var distance_method = dist_method_picker.value;
    if (distance_method == "manhattan"){
        original_distance = Math.abs(x1-x2) + Math.abs(y1-y2);
    } else if (distance_method == "euclidean"){
        original_distance = ((x1-x2)**2 + (y1-y2)**2)**0.5;
    }
    return original_distance ** exponent_picker.value;
}

function getRGB(hex) {
    var rgb = [
        hex_to_dec[hex[1]]*16+hex_to_dec[hex[2]],
        hex_to_dec[hex[3]]*16+hex_to_dec[hex[4]],
        hex_to_dec[hex[5]]*16+hex_to_dec[hex[6]]
    ];
    return rgb;
}

function setPixel(x, y, rgb) {
        ctx.fillStyle = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
        ctx.fillRect(x, y, 1, 1)
}