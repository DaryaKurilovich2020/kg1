// importScripts("https://cdnjs.cloudflare.com/ajax/libs/chroma-js/2.4.2/chroma.min.js");
const D65 = [95.047, 100, 108.883];
const bgclr = document.getElementById("picker");
bgclr.addEventListener("input", () => {
    document.body.style.backgroundColor = bgclr.value;
    // rgbChange();
    // hlsChange();
    // labChange();
    setLAB();
    setHLS();
    setRGB();

});

function rRGBsliderChange() {
    document.getElementById("R").value = document.getElementById("rRGBslider").value;
    rgbChange();
}

function gRGBsliderChange() {
    document.getElementById("G").value = document.getElementById("gRGBslider").value;
    rgbChange();
}

function bRGBsliderChange() {
    document.getElementById("Brgb").value = document.getElementById("bRGBslider").value;
    rgbChange();
}

function hHSLsliderChange() {
    document.getElementById("H").value = document.getElementById("hHSLslider").value;
    hlsChange();
}

function sHSLsliderChange() {
    document.getElementById("S").value = document.getElementById("sHSLslider").value;
    hlsChange();
}

function lHSLsliderChange() {
    document.getElementById("Lhls").value = document.getElementById("lHSLslider").value;
    hlsChange();
}

function lLABsliderChange() {
    document.getElementById("Llab").value = document.getElementById("lLABslider").value;
    labChange();
}

function aLABsliderChange() {
    document.getElementById("A").value = document.getElementById("aLABslider").value;
    labChange();
}

function bLABsliderChange() {
    document.getElementById("Blab").value = document.getElementById("bLABslider").value;
    labChange();
}


function rgbChange() {
    const red = document.getElementById("R").value;
    const green = document.getElementById("G").value;
    const blue = document.getElementById("Brgb").value;
    document.body.style.backgroundColor = 'rgb(' + red + ',' + blue + ',' + green + ')';
    setHLS();
    setLAB();
}

function hlsChange() {
    const h = document.getElementById("H").value;
    const l = document.getElementById("Lhls").value;
    const s = document.getElementById("S").value;
    document.body.style.backgroundColor = 'hsl(' + h + ',' + l + '%' + ',' + s + '%' + ')';
    setRGB();
    setLAB();
}

function labChange() {
    const rgb = lab2rgb();
    document.body.style.backgroundColor = 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')';
    console.log('lab', rgb);
    //document.body.style.backgroundColor = chroma.lab(document.getElementById("Llab").value, document.getElementById("A").value, document.getElementById("B").value);
    setRGB();
    setHLS();
}


function setRGB() {
    var c = document.body.style.backgroundColor;
    var rgb = c.replace(/^(rgb|rgba)\(/, '').replace(/\)$/, '').replace(/\s/g, '').split(',');
    document.getElementById("R").value = rgb[0];
    document.getElementById("rRGBslider").value = rgb[0];
    document.getElementById("G").value = rgb[1];
    document.getElementById("gRGBslider").value = rgb[1];
    document.getElementById("Brgb").value = rgb[2];
    document.getElementById("bRGBslider").value = rgb[2];
}

function setHLS() {
    var c = document.body.style.backgroundColor;
    var rgb = c.replace(/^(rgb|rgba)\(/, '').replace(/\)$/, '').replace(/\s/g, '').split(',');
    let r = rgb[0];
    let g = rgb[1];
    let b = rgb[2];

    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0; // achromatic
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h *= 60;
    }
    document.getElementById("H").value = Math.round(h);
    document.getElementById("hHSLslider").value = Math.round(h);
    document.getElementById("lHSLslider").value = Math.round(l * 100);
    document.getElementById("sHSLslider").value = Math.round(s * 100);
    document.getElementById("Lhls").value = Math.round(l * 100);
    document.getElementById("S").value = Math.round(s * 100);
}

function setLAB() {
    const lab = rgb2lab();
    // const lab = xyzToLab(rgbToXyz());
    document.getElementById("Llab").value = Math.round(lab[0]);
    document.getElementById("lLABslider").value = lab[0];
    document.getElementById("A").value = Math.round(lab[1]);
    document.getElementById("aLABslider").value = lab[1];
    document.getElementById("Blab").value = Math.round(lab[2]);
    document.getElementById("bLABslider").value = lab[2];
}

// function rgbToXyz() {
//     const r = document.getElementById("R").value;
//     const g = document.getElementById("G").value;
//     const b = document.getElementById("Brgb").value;
//     const X = 0.4124 * r + 0.3576 * g + 0.1805 * b
//     const Y = 0.2126 * r + 0.7152 * g + 0.0722 * b
//     const Z = 0.0193 * r + 0.1192 * g + 0.9505 * b
//     return [X, Y, Z].map(_ => _ * 100)
// }
//
// function xyzToLab([x, y, z]) {
//     [x, y, z] = [x, y, z].map((v, i) => {
//         v = v / D65[i]
//         return v > 0.008856 ? Math.pow(v, 1 / 3) : v * 7.787 + 16 / 116
//     })
//     const l = 116 * y - 16;
//     const a = 500 * (x - y);
//     const b = 200 * (y - z);
//     return [l % 100, a % 120, b % 120];
// }


function lab2rgb(){
    const l =   document.getElementById("Llab").value ;
    const a =   document.getElementById("A").value ;
    const bLab=   document.getElementById("Blab").value;
    var y = (l + 16) / 116,
        x = a / 500 + y,
        z = y - bLab / 200,
        r, g, b;

    x = 0.95047 * ((x * x * x > 0.008856) ? x * x * x : (x - 16/116) / 7.787);
    y = ((y * y * y > 0.008856) ? y * y * y : (y - 16 / 116) / 7.787);
    z = 1.08883 * ((z * z * z > 0.008856) ? z * z * z : (z - 16/116) / 7.787);

    r = x *  3.2406 + y * -1.5372 + z * -0.4986;
    g = x * -0.9689 + y *  1.8758 + z *  0.0415;
    b = x *  0.0557 + y * -0.2040 + z *  1.0570;

    r = (r > 0.0031308) ? (1.055 * Math.pow(r, 1/2.4) - 0.055) : 12.92 * r;
    g = (g > 0.0031308) ? (1.055 * Math.pow(g, 1/2.4) - 0.055) : 12.92 * g;
    b = (b > 0.0031308) ? (1.055 * Math.pow(b, 1/2.4) - 0.055) : 12.92 * b;

    return [Math.max(0, Math.min(1, r)) * 255,
        Math.max(0, Math.min(1, g)) * 255,
        Math.max(0, Math.min(1, b)) * 255]
}


function rgb2lab(){
    var r = document.getElementById("R").value / 255,
        g = document.getElementById("G").value/ 255,
        b = document.getElementById("Brgb").value / 255,
        x, y, z;

    r = (r > 0.04045) ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
    g = (g > 0.04045) ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
    b = (b > 0.04045) ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

    x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
    y = (r * 0.2126 + g * 0.7152 + b * 0.0722);
    z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;

    x = (x > 0.008856) ? Math.pow(x, 1/3) : (7.787 * x) + 16/116;
    y = (y > 0.008856) ? Math.pow(y, 1/3) : (7.787 * y) + 16/116;
    z = (z > 0.008856) ? Math.pow(z, 1/3) : (7.787 * z) + 16/116;

    return [(116 * y) - 16, 500 * (x - y), 200 * (y - z)]
}