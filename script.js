const menuOpenButton = document.querySelector ("#menu-open-button");
const menuCloseButton = document.querySelector ("#menu-close-button");
const navLinks = document.querySelectorAll (".nav-menu .nav-link");
const form = document.querySelector('form');
const fullName = document.getElementsById("Name");
const email = document.getElementsById("email");
const phone = document.getElementsById("phone");
const message = document.getElementsById("message");

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

function sendEmail() {
    const bodyMessage = `Full Name: ${Name.value} <br> Email: ${email.value} <br> Phone Number: ${phone.value} <br> Message: ${message.value}`; 
    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "ismartcoachingclasses@gmail.com",
        Password : "1C031B1C1A9EF49CE0405F2F059FF8D06F37",
        To : 'ismartcoachingclasses@gmail.com',
        From : "ismartcoachingclasses@gmail.com",
        Subject : "This is the subject",
        Body : bodyMessage
    }).then(
      message => alert(message)
    );
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    sendEmail();
});
