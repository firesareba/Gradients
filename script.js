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
var top_right;
var bottom_left;
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

set_button.addEventListener('click', (event) => {
    console.log(getRGB())
    if (!top_left){
        top_left = getRGB();
    }else if (!top_right){
        top_right = getRGB();
    }else if (!bottom_left){
        bottom_left = getRGB();
    }else{
        bottom_right = getRGB();
    }
});

gradient_button.addEventListener('click', (event) => {//colors = [Each color:[[position x,y], [r, g, b]]
    manhattan_gradient([
        [[0, 0], top_left], 
        [[m_c.width, 0], top_right], 
        [[0, m_c.height], bottom_left], 
        [[m_c.width, m_c.height], bottom_right]
    ]);
    euclidean_gradient([
        [[0, 0], top_left], 
        [[e_c.width, 0], top_right], 
        [[0, e_c.height], bottom_left], 
        [[e_c.width, e_c.height], bottom_right]
    ]);
    console.log("gradiented");
});



function manhattan_gradient(colors) {
    console.log(colors);
    for (let x = 0; x < m_c.height; x++){
        for (let y = 0; y < m_c.width ; y++){
            var sum = 0;
            
            for (const source of colors){
                sum += Math.abs(source[0][0]-x) + Math.abs(source[0][1]-y);
            }
            let avg = sum / colors.length;

            var pixel_color = [0, 0, 0];
            for (let idx = 0; idx < 3; idx++){
                var color = 0;
                for (const source of colors){
                    var distance = Math.abs(source[0][0]-x) + Math.abs(source[0][1]-y);
                    var multiplier = ((avg-distance)*2 + distance) / sum;
                    color += source[1][idx] * multiplier;
                }

                pixel_color[idx] = color;
            }
            m_setPixel(x, y, pixel_color)
        }
    }
}

function euclidean_gradient(colors) {
    console.log(colors);
    for (let x = 0; x < e_c.height; x++){
        for (let y = 0; y < e_c.width ; y++){
            var sum = 0;
            
            for (const source of colors){
                sum += (source[0][0]-x)**2 + (source[0][1]-y)**2;
            }
            let avg = sum / colors.length;

            var pixel_color = [0, 0, 0];
            for (let idx = 0; idx < 3; idx++){
                var color = 0;
                for (const source of colors){
                    var distance = (source[0][0]-x)**2 + (source[0][1]-y)**2;
                    var multiplier = ((avg-distance)*2 + distance) / sum;
                    color += source[1][idx] * multiplier;
                }

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
