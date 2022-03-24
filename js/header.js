//---------------hamburger-btn & mobile-menu-------------------------------
let CSSbreakPoint = 935;


let hamburger = document.querySelector(".hamburger");
let mombileMenu = document.querySelector(".mobile-header-menu");

    hamburger.addEventListener("click",()=>{
        if(hamburger.classList.contains("active"))
        {
            
            hamburger.classList.add("inactive");
            mombileMenu.classList.add("inactive");
            
            setTimeout(() => {
                hamburger.classList.remove("active");
                mombileMenu.classList.remove("active");    
            }, 100);
        }
        else
        {
            hamburger.classList.add("active");
            mombileMenu.classList.remove("inactive");
            mombileMenu.classList.add("active");
            setTimeout(() => {
                hamburger.classList.remove("inactive");
            }, 100);
        }
    })

    window.addEventListener("resize",()=>{
        if (window.innerWidth>=CSSbreakPoint) {
            mombileMenu.classList.remove("inactive");
            mombileMenu.classList.remove("active");
            hamburger.classList.remove("active");
            hamburger.classList.remove("inactive");
        }
    })

//-----------------header menu---------------------------

let docs = document.querySelector(".navbar > li");
let headerMenu = document.querySelector(".header-menu");

docs.addEventListener("mouseover",()=>{
    headerMenu.classList.add("active");
})

headerMenu.addEventListener("mouseleave",()=>{
    headerMenu.classList.add("inactive");

    setTimeout(() => {
        headerMenu.classList.remove("active");
        headerMenu.classList.remove("inactive");
    }, 300);
})
