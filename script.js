class colorSource{
    constructor(x, y, strength, hex){
        this.x = x;
        this.y = y;
        this.strength = strength;
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
const dist_method_picker = document.getElementById("distance-type");

let sources = [];
let sourceModal;

//make white
for (let x = 0; x < surface.height; x++){
    for (let y = 0; y < surface.width; y++){
        setPixel(x, y, [255, 255, 255], 0);
    }
}

//listeners
dist_method_picker.addEventListener('change', (event) => {
    gradient();
}
);

surface.addEventListener('click', (event) => {
    if (sourceModal){
        document.body.removeChild(sourceModal);
    }

    sourceModal = document.createElement('div');
    sourceModal.style.position = 'absolute';
    sourceModal.style.left = `${event.clientX}px`;
    sourceModal.style.top = `${event.clientY}px`;
    sourceModal.style.backgroundColor = "BurlyWood";
    sourceModal.style.display = "flex";
    sourceModal.style.padding = "0.5%";
    
    var colorPicker = document.createElement('input');
    colorPicker.type = 'color';
    colorPicker.value = "#ff0000"
    sourceModal.appendChild(colorPicker);

    var strengthPicker = document.createElement('input');
    strengthPicker.type = "range";
    strengthPicker.min = 1;
    strengthPicker.max = 4;
    sourceModal.appendChild(strengthPicker);
    
    var confirmationButton = document.createElement('button');
    confirmationButton.innerHTML = "Ok";
    sourceModal.appendChild(confirmationButton);
    
    document.body.appendChild(sourceModal);
    sourceModal.style.borderRadius = `${sourceModal.clientHeight*0.25}px`;

    confirmationButton.addEventListener('click', (_) => {
        sources.push(new colorSource(event.offsetX, event.offsetY, strengthPicker.value, colorPicker.value));
        document.body.removeChild(sourceModal);
        sourceModal = null;
        gradient();
    })
}
);

function gradient() {
    var height = surface.height;
    var width = surface.width;
    for (let x = 0; x < height; x++){
        for (let y = 0; y < width ; y++){
            var sum = 0;
            var pixel_color = [0, 0, 0];

            for (const source of sources){
                var distance = getDistance(x, y, source);
                var influence = Math.max(0, source.strength-distance);
                for (let idx = 0; idx < 3; idx++){
                    pixel_color[idx] += source.rgb[idx]*influence;
                }
            }
                
            setPixel(x, y, pixel_color)
        }
    }
}

function getDistance(x, y, source){
    var original_distance;
    var distance_method = dist_method_picker.value;
    
    if (distance_method == "manhattan"){
        original_distance = Math.abs(x-source.x) + Math.abs(y-source.y);
    } else if (distance_method == "euclidean"){
        original_distance = Math.hypot(x-source.x, y-source.y);
    } else if (distance_method == "chebyshev"){
        original_distance = Math.max(Math.abs(x-source.x), Math.abs(y-source.y));
    }

    return original_distance;
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
    for (let i=0; i<3; i++){
        rgb[i] = Math.min(255, rgb[i]);
    }

    ctx.fillStyle = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
    ctx.fillRect(x, y, 1, 1)
}