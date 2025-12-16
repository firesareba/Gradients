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
const exponent_picker = document.getElementById("exponent-picker");
const exponent_value = document.getElementById("exponent-value");
const gradient_button = document.getElementById("set-gradient");

const top_left = document.getElementById("top-left-picker");
const top_right = document.getElementById("top-right-picker");
const bottom_left = document.getElementById("bottom-left-picker");
const bottom_right = document.getElementById("bottom-right-picker");

//make white
for (let x = 0; x < m_c.height; x++){
    for (let y = 0; y < m_c.width; y++){
        setPixel(x, y, [255, 255, 255], 0);
    }
}

for (let x = 0; x < e_c.height; x++){
    for (let y = 0; y < e_c.width; y++){
        setPixel(x, y, [255, 255, 255], 1);
    }
}

//listeners
exponent_picker.addEventListener('change', (event) => {
    exponent_value.innerHTML = `Exponent Value: ${exponent_picker.value}`;

    if (bottom_right){
        gradient(
        [[[0, 0], getRGB(top_left.value)], 
        [[m_c.width, 0], getRGB(top_right.value)], 
        [[0, m_c.height], getRGB(bottom_left.value)], 
        [[m_c.width, m_c.height], getRGB(bottom_right.value)]],
        0
        );
        gradient(
            [[[0, 0], getRGB(top_left.value)], 
            [[m_c.width, 0], getRGB(top_right.value)], 
            [[0, m_c.height], getRGB(bottom_left.value)], 
            [[m_c.width, m_c.height], getRGB(bottom_right.value)]],
            1
        );
    }
}
);

gradient_button.addEventListener('click', (event) => {//colors = [Each color:[[position x,y], [r, g, b]]
    gradient(
        [[[0, 0], getRGB(top_left.value)], 
        [[m_c.width, 0], getRGB(top_right.value)], 
        [[0, m_c.height], getRGB(bottom_left.value)], 
        [[m_c.width, m_c.height], getRGB(bottom_right.value)]],
        0
    );
    gradient(
        [[[0, 0], getRGB(top_left.value)], 
        [[m_c.width, 0], getRGB(top_right.value)], 
        [[0, m_c.height], getRGB(bottom_left.value)], 
        [[m_c.width, m_c.height], getRGB(bottom_right.value)]],
        1
    );
    console.log("gradiented");
});


function gradient(colors, grad_method) {
    console.log(colors);
    console.log(grad_method);
    
    var height;
    var width;
    if (grad_method == 0){
        height = m_c.height;
        width = m_c.width;
    } else if (grad_method == 1) {
        height = e_c.height;
        width = e_c.width;
    } else {
        console.log("0 or 1 for manhattan or euclidean respectively. This request did not go through");
        return;
    }
    
    for (let x = 0; x < height; x++){
        for (let y = 0; y < width ; y++){
            var sum = 0;
            
            for (const source of colors){
                sum += get_distance(source[0][0], source[0][1], x, y, grad_method);
            }
            let avg = sum / colors.length;
            
            var pixel_color = [0, 0, 0];
            for (let idx = 0; idx < 3; idx++){
                var color = 0;
                for (const source of colors){
                    var distance = get_distance(source[0][0], source[0][1], x, y, grad_method);
                    var multiplier = ((avg-distance)*2 + distance) / sum;
                    color += source[1][idx] * multiplier;
                }
                
                pixel_color[idx] = color;
            }
            setPixel(x, y, pixel_color, grad_method)
        }
    }
}

function get_distance(x1, y1, x2, y2, grad_method){
    var original_distance
    if (grad_method == 0){
        original_distance = Math.abs(x1-x2) + Math.abs(y1-y2);
    } else if (grad_method == 1) {
        original_distance = ((x1-x2)**2 + (y1-y2)**2)**0.5;
    } else {
        console.log("0 or 1 for manhattan or euclidean respectively. This request did not go through");
        return;
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

function setPixel(x, y, rgb, grad_method) {
    if (grad_method == 0){
        m_ctx.fillStyle = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
        m_ctx.fillRect(x, y, 1, 1)
    } else if (grad_method == 1) {
        e_ctx.fillStyle = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
        e_ctx.fillRect(x, y, 1, 1)
    } else {
        console.log("0 or 1 for manhattan or euclidean respectively. This request did not go through");
    }
}