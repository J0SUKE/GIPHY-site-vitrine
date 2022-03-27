let btns = document.querySelectorAll(".caroussel-btn");

let currentSlideIndex=0;
let slides = [...document.querySelectorAll(".caroussel__slide")];
const [,...smartPhoneCarousselSlides] = document.querySelectorAll(".smartphone-caroussel img");
let themeSlides = [...document.querySelectorAll(".smartphone-caroussel img")].slice(0,2);
let maxSlides = smartPhoneCarousselSlides.length;
let slidesIndicators = [...document.querySelectorAll(".caroussel-indicator__cases span")];

function setZindex(element,zindex) 
{
    element.style.zIndex = zindex;    
}


function AnimateSmartphone(direction) {
    
    // cette fonction est appelée apres que currentSlideIndex ait été incrémenté
    
    let flow; // la direction inverse dans laquelle vas le caroussel
    flow = (direction=="next" ? "prev":"next" );

    // on desactive l'element precedent 
    smartPhoneCarousselSlides[getNextElement(currentSlideIndex,maxSlides-1,flow)].classList.remove("active");
    smartPhoneCarousselSlides[getNextElement(currentSlideIndex,maxSlides-1,flow)].classList.add("inactive");    

    // on active l'element actuel
    smartPhoneCarousselSlides[currentSlideIndex].classList.remove("invisible");
    setTimeout(() => {
        smartPhoneCarousselSlides[currentSlideIndex].classList.add("active");    
    }, 300);
}

function animateIndicator() {
    
    // se charge de l'indicateur de slides dans le caroussel 
    
    document.querySelector(".caroussel-indicator p").innerHTML = `${currentSlideIndex+1} / ${maxSlides}`;
    slidesIndicators[currentSlideIndex].classList.remove("inactive");
    slidesIndicators[currentSlideIndex].classList.add("active");
    
    slidesIndicators.filter(element=>element!=slidesIndicators[currentSlideIndex]).forEach(element => {
        element.classList.remove("active");
        element.classList.add("inactive");
    });

}

function animateSlides(direction) {
    
    let flow,flowReverse; // flow vas server a determiner l'elements precedent le node actuel
        // expilcations : 
        // si on appuie sur next alors l'element precedent dans le caroussel est le Node precedent dans le DOM
        // par contre si on clique sur prev alors l'element precedent est l'element qui vient apres le node actuel
    flow = (direction=="next" ? "prev":"next" );
    flowReverse = (direction=="next" ? "next":"prev" );
    
    setZindex(slides[getNextElement(currentSlideIndex,maxSlides-1,flow)] , maxSlides); // on met le zIndex du precedent au max
    setZindex(slides[currentSlideIndex] , maxSlides-1); // on met le zIndex de l'element actuel en dessous (le temps de l'animation)

    // tout le reste doit etre a 0
    // vu qu'il y'a que 3 elements c'est forcement celui qui vient apres l'actuel
    setZindex(slides[getNextElement(currentSlideIndex,maxSlides-1,flowReverse)] , 0);

    // 0n lance les animations ...

    slides[getNextElement(currentSlideIndex,maxSlides-1,flow)].classList.add("inactive"); // on le fait disparaitre
    slides[currentSlideIndex].classList.add("active");

    setTimeout(() => {
        
        setZindex(slides[getNextElement(currentSlideIndex,maxSlides-1,flow)] , maxSlides-1); // on met le precedent a max-1
        setZindex(slides[currentSlideIndex] , maxSlides);// on met l'actuel a max

        slides[getNextElement(currentSlideIndex,maxSlides-1,flow)].classList.remove("inactive");
        
        slides.filter(element=>element!=slides[currentSlideIndex]).forEach(element => {
            element.classList.remove("active");
        }); 

    }, 500); // 500 est la durée de l'animation qui fait disparaitre l'element
}

function getNextElement(current,max,direction) // renvoie l'index du prochain element selon la direction du caroussel
{
    if (direction=="next") 
    {
        return (current==(max) ? 0 : current+1);
    }
    return (current==0 ? (max) : current-1);

}


btns.forEach(element => {
    element.addEventListener("click",()=>{
        
        if (element.dataset.btn=="next") currentSlideIndex=(currentSlideIndex==maxSlides-1 ? 0 : currentSlideIndex+1);
        else currentSlideIndex=(currentSlideIndex==0 ? maxSlides-1 : currentSlideIndex-1);
          
        AnimateSmartphone(element.dataset.btn);
        animateIndicator();
        animateSlides(element.dataset.btn);

    })
});


//======================= dark-light caroussel ======================================

let cursors = document.querySelectorAll(".cursor");
let currentThemeIndex = 1; // 1 correspond a dark
                            // 0 correspond a light
let currentTheme = themeSlides[currentThemeIndex];
                        
let themeBtns = [...document.querySelectorAll(".theme-btn__icons img"),...document.querySelectorAll(".theme-btn__container p"),...document.querySelectorAll(".mobile-theme-btn__container p")];

themeBtns.forEach(element=>{
    element.addEventListener("click",()=>{
        if ((element.dataset.theme=="light" && currentTheme.classList.contains("dark"))) 
        {
            cursors.forEach(element=>{
                element.classList.remove("dark");
                element.classList.add("light");
                element.textContent = "Light";
            })
            switchTheme();
                       
        }        
        else if(element.dataset.theme=="dark" && currentTheme.classList.contains("light"))
        {
            cursors.forEach(element=>{
                element.classList.remove("light");
                element.classList.add("dark");
                element.textContent = "Dark";
            })
            switchTheme();
        }

        

    });
})

function switchTheme() {
            
    currentThemeIndex=(currentThemeIndex==0 ? 1 : 0);
    currentTheme = themeSlides[currentThemeIndex];
    
    // on desactive le precedent 

    themeSlides[getNextElement(currentThemeIndex,1,"prev")].classList.remove("active");
    themeSlides[getNextElement(currentThemeIndex,1,"prev")].classList.add("inactive");       

    // on active le suivant
    themeSlides[currentThemeIndex].classList.remove("invisible");
    setTimeout(() => {
        
        themeSlides[currentThemeIndex].classList.add("active");
        themeSlides[currentThemeIndex].classList.remove("inactive");
    }, 300);

    smartPhoneCarousselSlides[0] = themeSlides[currentThemeIndex];


}   


//--------------------resize window--------------------------------

let CarousselBreakPoint = 850;


window.addEventListener("resize",()=>{

    if (window.innerWidth<=CarousselBreakPoint) {
        resized = true;
        resetCaroussel();
    }
})



function resetCaroussel() {
    currentSlideIndex=0;
    
    setZindex(slides[0],maxSlides);
    slides[0].classList.add("active");
    slides[0].classList.remove("inactive");
    
    slides.filter(element=>element!=slides[0]).forEach(element => {
        setZindex(element,maxSlides-1);
        element.classList.remove("active");
    });

    smartPhoneCarousselSlides[0]=themeSlides[1]

    smartPhoneCarousselSlides[0].classList.remove("inactive");
    smartPhoneCarousselSlides[0].classList.remove("invisible");
    smartPhoneCarousselSlides[0].classList.add("active");
    smartPhoneCarousselSlides.filter(element=>element!=smartPhoneCarousselSlides[0]).forEach(element => {
        element.classList.remove("active")
        element.classList.add("inactive")
    });

    // on reset l'indicateru et le curseur
    document.querySelector(".caroussel-indicator p").innerHTML = `${1} / ${maxSlides}`;
    slidesIndicators[currentSlideIndex].classList.remove("inactive");
    slidesIndicators[currentSlideIndex].classList.add("active");
    

    slidesIndicators.filter(element=>element!=slidesIndicators[currentSlideIndex]).forEach(element => {
        element.classList.remove("active");
        element.classList.add("inactive");
    });
}