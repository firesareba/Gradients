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
    'A':10,
    'B':11,
    'C':12,
    'D':13,
    'E':14,
    'F':15,
};

const color_picker = document.getElementById("color-picker");
color_picker.addEventListener('change', (event) => {
    console.log(color_picker.value);
})
