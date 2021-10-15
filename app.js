const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById('jsSave');
const clear = document.getElementById('jsClear');

canvas.width = 700;
canvas.height = 700;

ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5;
ctx.fillStyle = 'white';

let painting = false;
let fill = false;

const stopPainting = () => {
    painting = false;
}

const startPainting = () => {
    painting = true;
}

const onMouseMove = (event) => {
    const {offsetX:x, offsetY:y} = event;
    if(painting){
        ctx.lineTo(x, y);
        ctx.stroke();
    } else {
        ctx.beginPath();
        ctx.moveTo(x, y);
    }
}

const onMouseDown = (event) => {
    if(fill){
        ctx.fillRect(0,0,700,700);
    }
    else {
        startPainting();
    }
}

const onMouseUp = (event) => {
    stopPainting();
}

const onMouseLeave = (event) => {
    stopPainting();
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("mouseleave", onMouseLeave);
}

const onClickColor = (event) => {
    ctx.fillStyle = event.target.style.backgroundColor;
    ctx.strokeStyle = event.target.style.backgroundColor;
}

Array.from(colors).forEach(color => color.addEventListener("click", onClickColor));

const onChangeRange = (event) => {
    ctx.lineWidth = (event.target.value);
}

if(range){
    range.addEventListener("change",onChangeRange)
}

const onClickMode = (event)=> {
    fill = !fill;
    mode.textContent = fill ? 'draw' : 'fill'
}

if(mode){
    mode.addEventListener("click", onClickMode);
}

const onClickSave = () => {
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "image";
    link.click();
}

if(save) {
    save.addEventListener("click", onClickSave);
}

const onClickClear = (event)=>{
    ctx.fillStyle = 'white'
    ctx.fillRect(0,0,700,700);
}

if(clear){
    clear.addEventListener("click", onClickClear);
}
