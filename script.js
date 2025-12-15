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

let c = document.getElementById("gradient-surface");
let ctx = c.getContext("2d");
const color_picker = document.getElementById("color-picker");
const set_button = document.getElementById("set-gradient");

var top_left;
var bottom_right;

for (let x = 0; x < c.height; x++){
    for (let y = 0; y < c.width; y++){
        setPixel(x, y, [255, 255, 255]);
    }
}

// color_picker.addEventListener('change', (event) => {
//     for (let x = 0; x < c.height; x++){
//         for (let y = 0; y < c.width; y++){
//             setPixel(x, y, getRGB());
//         }
//     }
// }
//);

set_button.addEventListener('click', (event) => {
    console.log(getRGB())
    if (!top_left){
        top_left = getRGB();
    }else if (!bottom_right){
        bottom_right = getRGB();
        gradient(
            top_left, 
            bottom_right
        );
    }
});


function gradient(top_left, bottom_right) {
    let total_diagonals = c.width+c.height-1
    for (let x = 0; x < c.height; x++){
        for (let y = 0; y < c.width ; y++){
            var diagonal = x + y;
            var pixel_color = [0, 0, 0];
            for (let idx = 0; idx < 3; idx++){
                var color = (top_left[idx] * (total_diagonals-diagonal)/total_diagonals) + (bottom_right[idx] * diagonal/total_diagonals);
                pixel_color[idx] = color;
            }
            setPixel(x, y, pixel_color)
        }
    }
}

function getRGB() {
    let hex = color_picker.value;
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

