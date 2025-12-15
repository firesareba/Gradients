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

const m_c = document.getElementById("manhattan-gradient-surface");
const e_c = document.getElementById("euclidean-gradient-surface");
let m_ctx = m_c.getContext("2d");
let e_ctx = e_c.getContext("2d");
const color_picker = document.getElementById("color-picker");
const set_button = document.getElementById("set-color");
const gradient_button = document.getElementById("set-gradient");

var top_left;
var bottom_right;

//make white
for (let x = 0; x < m_c.height; x++){
    for (let y = 0; y < m_c.width; y++){
        m_setPixel(x, y, [255, 255, 255]);
    }
}

for (let x = 0; x < e_c.height; x++){
    for (let y = 0; y < e_c.width; y++){
        e_setPixel(x, y, [255, 255, 255]);
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
    }
});

gradient_button.addEventListener('click', (event) => {
    manhattan_gradient(top_left, bottom_right);
    euclidean_gradient(top_left, bottom_right);
});



function manhattan_gradient(top_left, bottom_right) {
    let diagonal_manhattan_dist = m_c.width+m_c.height;
    for (let x = 0; x < m_c.height; x++){
        for (let y = 0; y < m_c.width ; y++){
            var manhattan_dist = x + y;
            var pixel_color = [0, 0, 0];
            for (let idx = 0; idx < 3; idx++){
                var color = (top_left[idx] * (diagonal_manhattan_dist - manhattan_dist)/diagonal_manhattan_dist) + (bottom_right[idx] * manhattan_dist/diagonal_manhattan_dist);
                pixel_color[idx] = color;
            }
            m_setPixel(x, y, pixel_color)
        }
    }
}

function euclidean_gradient(top_left, bottom_right) {
    for (let x = 0; x < e_c.height; x++){
        for (let y = 0; y < e_c.width ; y++){
            var pixel_color = [0, 0, 0];
            for (let idx = 0; idx < 3; idx++){
                var color = (top_left[idx] * ((x-0)**2+(y-0)**2) + (bottom_right[idx] * ((x-300)**2+(y-300)**2)));
                pixel_color[idx] = color;
            }
            e_setPixel(x, y, pixel_color)
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

function m_setPixel(x, y, rgb) {
    m_ctx.fillStyle = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
    m_ctx.fillRect(x, y, 1, 1)
}

function e_setPixel(x, y, rgb) {
    e_ctx.fillStyle = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
    e_ctx.fillRect(x, y, 1, 1)
}

