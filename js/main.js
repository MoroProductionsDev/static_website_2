// All pages carousel logic
const next = document.querySelector('.carousel-control-next')
const prev = document.querySelector('.carousel-control-prev')
const blurImg = document.querySelector('.blurImgBackground')

const ancherNavLink = document.querySelectorAll(".nav-link")

//onpageswitch()
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

//---------------------------------------------------------------------------
// Activities Page Logic
const types = ['water-type', 'kid-type', 'nature-type', 'history-type', 'romantic-type', 'physical-type', 'entertainment-type']
const body = document.getElementsByClassName("body")
const activitiesPageName = "activities.html";
const carouselIndicators = document.querySelector(".carousel-indicators");
const carouselInner = document.querySelector(".carousel-inner");
const cards = document.querySelector("#activities-cards");
const main = document.querySelectorAll("main");
const dropdownlinks = document.querySelectorAll(".dropdown-item")
const ActivityHeader = document.createElement("h1");
let activitiesPageTrigger = false;
ActivityHeader.classList.add("display-6");
ActivityHeader.classList.add("text-secondary");

onpageswitch()

function onpageswitch() {
    window.onload = ()=> {
        if (window.location.pathname == `/${activitiesPageName}` && localStorage.getItem('activiesRedirect')) {
            renderonpath(window.location.href)
            localStorage.setItem('activiesRedirect', false) // local storage to store states between redirects
        } 
    }
}

function rerender(type) {
    clearcanvas()
    setheaderactivity(type)
    
    // Checks if the ActivityHeader exists in main to append it if not.
    if (!main[0].contains(ActivityHeader)) {
        main[0].prepend(ActivityHeader)
        ActivityHeader.style = "margin-bottom: 30px;";
    }

    ActivityHeader.style = "display: block;";
    
    displayselectedcards(type)
}

function clearcanvas() {
    main[0].childNodes.forEach((elem) => {
        if (elem !== cards) {
            elem.style = "display: none;";
        }
    })

    carouselIndicators.innerHTML = '';
    carouselInner.innerHTML = '';
}

function setheaderactivity(type) {
    switch(type) {
        case 'water-type':
            ActivityHeader.innerText = "Water Activities";
            break;
        case 'kid-type':
            ActivityHeader.innerText = "Kid's Activities";
            break;
        case 'nature-type':
            ActivityHeader.innerText = "Nature's Activities";
            break;
        case 'history-type':
            ActivityHeader.innerText = "Historical Activities";
            break;
        case 'romantic-type':
            ActivityHeader.innerText = "Romatic Activities";
            break;
        case 'physical-type':
            ActivityHeader.innerText = "Physical/Sport's Activities";
            break;
        case 'entertainment-type':
            ActivityHeader.innerText = "Entertainment Activities";
            break;
    }
}

function anchorTrigger(path) {
    localStorage.setItem('activiesRedirect', true) // local storage to store states between redirects
    window.location.href = path
}

function renderonpath(href) {
    const domainSplit = href.split("/") //pathname with the ids included

    switch(domainSplit[3]) {
        case `${activitiesPageName}#WaterActivities`:
            rerender("water-type")
            break;
        case `${activitiesPageName}#KidsActivities`:
            rerender("kid-type")
            break;
        case `${activitiesPageName}#NatureActivities`:
            rerender("nature-type")
            break;
        case `${activitiesPageName}#PhysicalActivities`:
            rerender("history-type")
            break;
        case `${activitiesPageName}#RomanticActivities`:
            rerender("romantic-type")
            break;
        case `${activitiesPageName}#EntertainmentActivities`:
            rerender("entertainment-type")
            break;
    }
}

function displayselectedcards(type) {
    imgcounter = 0;

    cards.childNodes.forEach((elem, index) => {
        if (index == 1 || index % 2 == 1) {
            if (elem.attributes.class.value.includes(type)) {
                elem.style = "display: block;";

                elem.childNodes.forEach((elem) => {
                    elem.style = "display: block;";
                    
                    if (elem.nodeName == "IMG") {
                        setcarousel(elem, imgcounter)
                    }
                })
                this.imgcounter++
            } else {
                elem.style = "display: none;";
            }
        }
    })
}

function setcarousel(img, counter) {
    btn = document.createElement("button")
    div = document.createElement("div")
    newimg = document.createElement("img")

    // Excptns
    if (0 === counter) {
        btn.setAttribute("aria-current", "true")
        btn.classList.add("active")
        div.classList.add("active")
    }

    // button
    btn.type = "button"
    btn.setAttribute("data-bs-target", "#tinatiActivitiesCarouselIndicators")
    btn.setAttribute("data-bs-slide-to", counter)
    btn.setAttribute("aria-label", `Slide ${counter + 1}`)

    // img div
    div.classList.add("class", "carousel-item")

    // img
    // loop through <img> attributes and apply them on <newimg>
    Array.from(img.attributes).forEach((attr) => {
        newimg.setAttribute(attr.nodeName, attr.nodeValue);
    });

    // This class is causing the Carousel images not to scale correctly on the header
    newimg.classList.remove("card-img-top")

    // newimg.classList.add("d-block")
    // newimg.classList.add("w-100")
    // newimg.style = "min-height: 1000px;" +
    //                 "object-fit: contain;";

    //append
    div.appendChild(newimg)
    carouselIndicators.appendChild(btn)
    carouselInner.appendChild(div)
}