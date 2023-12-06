const next = document.querySelector('.carousel-control-next')
const prev = document.querySelector('.carousel-control-prev')
const blurImg = document.querySelector('.blurImgBackground')

changeImg()

function changeImg() {
    const activeImg = document.querySelector('div.corousel-item, div.active img')

    if (blurImg.src !== activeImg.src) {
        blurImg.src = activeImg.src;
    }
}

next.addEventListener('click', changeImg)
prev.addEventListener('click', changeImg)

// Changes images if the [ChangeImg] function detects a change in the DOM
const interval = setInterval(()=> {
    changeImg()
}, 50);