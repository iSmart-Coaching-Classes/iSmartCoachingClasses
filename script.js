const menuOpenButton = document.querySelector ("#menu-open-button");
const menuCloseButton = document.querySelector ("#menu-close-button");
const navLinks = document.querySelectorAll (".nav-menu .nav-link");

menuOpenButton.addEventListener("click", () => {
    //Toggle Mobile menu visibility
    document.body.classList.toggle("show-mobile-menu");
});

//Close menu when the close button is clicked
menuCloseButton.addEventListener("click", () => menuOpenButton.click ());

//Close menu when the nav link is clicked
navLinks.forEach(link => {
    link.addEventListener("click", () => menuOpenButton.click ());
})
const slides = document.querySelectorAll(".islide")
var counter = 0;
slides.forEach(
  (islide, index) =>{
    islide.style.left = `${index * 100}%`
  }
)
const goPrev = () =>{
  if(counter > 0){
    counter--
  slideImage()
  }
}
const goNext = () =>{
  if(counter < slides.length-1){
    counter++
  slideImage()
  }
}
const slideImage = () => {
  slides.forEach(
    (islide) => {
      islide.style.transform = `translateX(-${counter * 100}%)`
    }
  )
}
