class colorSource{
    constructor(x, y, hex){
        this.x = x;
        this.y = y;
        this.rgb = getRGB(hex);
    }
}

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
const ctx = surface.getContext("2d");
const exponent_picker = document.getElementById("exponent-picker");
const exponent_value = document.getElementById("exponent-value");
const dist_method_picker = document.getElementById("distance-type");
const gradient_button = document.getElementById("set-gradient");

const top_left = document.getElementById("top-left-picker");
const top_right = document.getElementById("top-right-picker");
const bottom_left = document.getElementById("bottom-left-picker");
const bottom_right = document.getElementById("bottom-right-picker");

let sources = [new colorSource(0, 0, top_left.value), new colorSource(surface.width, 0, top_right.value), new colorSource(0, surface.height, bottom_left.value), new colorSource(surface.width, surface.height, bottom_right.value)];
let sourceModal;

//make white
for (let x = 0; x < surface.height; x++){
    for (let y = 0; y < surface.width; y++){
        setPixel(x, y, [255, 255, 255], 0);
    }
}

//listeners
exponent_picker.addEventListener('change', (event) => {
    exponent_value.innerHTML = `Exponent Value: ${exponent_picker.value}`;
    updateSources();
    gradient();
}
);

gradient_button.addEventListener('click', (event) => {
    updateSources();
    gradient();
});

surface.addEventListener('click', (event) => {
    if (sourceModal){
        document.body.removeChild(sourceModal);
    }


    //modal with color, dist type, and submit button
    sourceModal = document.createElement('div');
    
    var colorPicker = document.createElement('input');
    colorPicker.type = 'color';
    colorPicker.value = "#ff0000"
    colorPicker.style.position = 'absolute';
    colorPicker.style.left = `${event.clientX}px`;
    colorPicker.style.top = `${event.clientY}px`;
    sourceModal.appendChild(colorPicker);
    
    document.body.appendChild(sourceModal);

    //some logic to see if they confirmed
    sources.push(new colorSource(event.offsetX, event.offsetY, getRGB(colorPicker.value)));
    document.body.removeChild(colorPicker);
    sourceModal = null;
}
);

function gradient(colors) {
    var height = surface.height;
    var width = surface.width;
    
    for (let x = 0; x < height; x++){
        for (let y = 0; y < width ; y++){
            var sum = 0;
            
            for (const source of sources){
                sum += getDistance(source.x, source.y, x, y);
            }
            let avg = sum / sources.length;
            
            var pixel_color = [0, 0, 0];
            for (let idx = 0; idx < 3; idx++){
                var color = 0;
                for (const source of sources){
                    var distance = getDistance(source.x, source.y, x, y);
                    var multiplier = ((avg-distance)*2 + distance) / sum;
                    color += source.rgb[idx] * multiplier;
                }
                
                pixel_color[idx] = color;
            }
            setPixel(x, y, pixel_color)
        }
    }
}

function getDistance(x1, y1, x2, y2){
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