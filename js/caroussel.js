let btns = document.querySelectorAll(".caroussel-btn");

let currentSlideIndex=0;
let slides = document.querySelectorAll(".caroussel__slide");
let smartPhoneCarousselSlides = document.querySelectorAll(".smartphone-caroussel img");
let maxSlides = slides.length;

function setZindex(element,zindex) 
{
    element.style.zIndex = zindex;    
}


function AnimateSmartphone(direction) {
    if (direction=="next") {
        
        if (currentSlideIndex==0) {
            smartPhoneCarousselSlides[maxSlides-1].classList.remove("active");
            smartPhoneCarousselSlides[maxSlides-1].classList.add("inactive");    
        }
        else
        {
            smartPhoneCarousselSlides[currentSlideIndex-1].classList.remove("active");
            smartPhoneCarousselSlides[currentSlideIndex-1].classList.add("inactive");    
        }
        
        smartPhoneCarousselSlides[currentSlideIndex].classList.remove("invisible");
        smartPhoneCarousselSlides[currentSlideIndex].classList.add("active");

    }
    else
    {
        smartPhoneCarousselSlides[(currentSlideIndex+1)%maxSlides].classList.remove("active");
        smartPhoneCarousselSlides[(currentSlideIndex+1)%maxSlides].classList.add("inactive");
        smartPhoneCarousselSlides[currentSlideIndex].classList.remove("invisible");
        smartPhoneCarousselSlides[currentSlideIndex].classList.add("active");
    }
}

btns.forEach(element => {
    element.addEventListener("click",()=>{
        
        if (element.dataset.btn=="next")
        {
            currentSlideIndex=(currentSlideIndex==maxSlides-1 ? 0 : currentSlideIndex+1);
        }
        else
        {
            currentSlideIndex=(currentSlideIndex==0 ? maxSlides-1 : currentSlideIndex-1);
        }
        AnimateSmartphone(element.dataset.btn);
        
        setZindex(slides[currentSlideIndex],maxSlides);
        let Restslides = [...slides];
        Restslides.filter(element=>element!=slides[currentSlideIndex]).forEach(element => {
            setZindex(element,0);
        });
    })
});