// ==========================================
// AKVIA GEMS - SCRIPT PART 1
// ==========================================

// Wait until page loads
document.addEventListener("DOMContentLoaded", function () {

    // ==========================
    // STICKY HEADER
    // ==========================

    const header = document.querySelector(".header");

    window.addEventListener("scroll", function () {

        if (window.scrollY > 80) {
            header.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
        } else {
            header.style.boxShadow = "0 5px 15px rgba(0,0,0,0.08)";
        }

    });

    // ==========================
    // BACK TO TOP
    // ==========================

    const topBtn = document.querySelector(".back-to-top");

    if (topBtn) {

        window.addEventListener("scroll", function () {

            if (window.scrollY > 300) {

                topBtn.style.display = "flex";

            } else {

                topBtn.style.display = "none";

            }

        });

        topBtn.addEventListener("click", function () {

            window.scrollTo({

                top: 0,
                behavior: "smooth"

            });

        });

    }

    // ==========================
    // HAMBURGER MENU
    // ==========================

    const menuBtn = document.querySelector(".menu-btn");
    const navbar = document.querySelector(".navbar");

    if (menuBtn && navbar) {

        menuBtn.addEventListener("click", function () {

            navbar.classList.toggle("mobile-menu");

        });

    }

    // ==========================
    // NEWSLETTER
    // ==========================

    const newsletterBtn = document.querySelector(".newsletter button");

    if (newsletterBtn) {

        newsletterBtn.addEventListener("click", function () {

            const email = document.querySelector(".newsletter input").value;

            if (email === "") {

                alert("Please enter your email.");

            } else {

                alert("Thank you for subscribing!");

            }

        });

    }

    // ==========================
    // CONTACT FORM
    // ==========================

    const contactForm = document.querySelector(".contact-form");

    if (contactForm) {

        contactForm.addEventListener("submit", function (e) {

            e.preventDefault();

            alert("Your message has been sent successfully.");

            contactForm.reset();

        });

    }

    console.log("AKVIA GEMS JS Part 1 Loaded");

});
// ==========================================
// AKVIA GEMS - SCRIPT PART 2
// Search + Cart + Wishlist
// ==========================================

// CART
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// WISHLIST
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

// Update Cart Badge
function updateCartCount(){

    const badges = document.querySelectorAll(".badge");

    if(badges.length >= 2){

        badges[1].innerText = cart.length;

    }

}

// Add To Cart
document.querySelectorAll(".cart-btn").forEach(btn=>{

    btn.addEventListener("click",()=>{

        const card = btn.closest(".product-card");

        const name = card.querySelector("h3").innerText;

        const price = card.querySelector(".new-price").innerText;

        cart.push({
            name,
            price
        });

        localStorage.setItem("cart",JSON.stringify(cart));

        updateCartCount();

        alert(name + " added to cart!");

    });

});

// Wishlist
document.querySelectorAll(".wishlist").forEach(btn=>{

    btn.addEventListener("click",()=>{

        const card = btn.closest(".product-card");

        const name = card.querySelector("h3").innerText;

        if(!wishlist.includes(name)){

            wishlist.push(name);

            btn.style.color="red";

            localStorage.setItem("wishlist",JSON.stringify(wishlist));

            alert(name+" added to wishlist.");

        }

    });

});

// Search Products
const searchInput = document.querySelector(".search-box input");

if(searchInput){

searchInput.addEventListener("keyup",()=>{

const value=searchInput.value.toLowerCase();

document.querySelectorAll(".product-card").forEach(card=>{

const text=card.innerText.toLowerCase();

if(text.includes(value)){

card.style.display="block";

}else{

card.style.display="none";

}

});

});

}

// Display Cart Total
function displayCart(){

const cartItems=document.querySelector(".cart-items");

const total=document.querySelector(".cart-footer h3");

if(!cartItems || !total) return;

cartItems.innerHTML="";

let sum=0;

cart.forEach((item,index)=>{

const price=parseInt(item.price.replace(/[^0-9]/g,""));

sum+=price;

cartItems.innerHTML+=`

<div style="padding:15px;border-bottom:1px solid #ddd;">

<h4>${item.name}</h4>

<p>${item.price}</p>

<button onclick="removeCart(${index})">

Remove

</button>

</div>

`;

});

total.innerHTML="Total : ₹"+sum.toLocaleString();

}

// Remove Cart

function removeCart(index){

cart.splice(index,1);

localStorage.setItem("cart",JSON.stringify(cart));

updateCartCount();

displayCart();

}

// Open Cart

const cartIcon=document.querySelector(".header-right a:nth-child(3)");

const cartSidebar=document.querySelector(".cart-sidebar");

if(cartIcon){

cartIcon.addEventListener("click",(e)=>{

e.preventDefault();

cartSidebar.classList.add("show");

displayCart();

});

}

// Close Cart

document.querySelectorAll(".sidebar-header span").forEach(close=>{

close.addEventListener("click",()=>{

document.querySelectorAll(".cart-sidebar,.wishlist-sidebar").forEach(side=>{

side.classList.remove("show");

});

});

});

// Wishlist Sidebar

const wishIcon=document.querySelector(".header-right a:nth-child(2)");

const wishSide=document.querySelector(".wishlist-sidebar");

if(wishIcon){

wishIcon.addEventListener("click",(e)=>{

e.preventDefault();

wishSide.classList.add("show");

});

}

updateCartCount();

console.log("AKVIA GEMS JS Part 2 Loaded");
// ==========================================
// AKVIA GEMS - SCRIPT PART 3
// Hero Slider, Countdown, FAQ,
// Login Modal, Toast Notification
// ==========================================

// ---------- HERO SLIDER ----------

const heroImages = [
    "images/hero1.jpg",
    "images/hero2.jpg",
    "images/hero3.jpg",
    "images/hero4.jpg"
];

let heroIndex = 0;

const heroImage = document.querySelector(".hero-image img");

if(heroImage){

    setInterval(()=>{

        heroIndex++;

        if(heroIndex >= heroImages.length){

            heroIndex = 0;

        }

        heroImage.src = heroImages[heroIndex];

    },4000);

}

// ---------- FLASH SALE COUNTDOWN ----------

const countdown = document.getElementById("countdown");

if(countdown){

let hours = 12;
let minutes = 30;
let seconds = 0;

setInterval(()=>{

seconds--;

if(seconds<0){

seconds=59;
minutes--;

}

if(minutes<0){

minutes=59;
hours--;

}

if(hours<0){

hours=23;

}

countdown.innerHTML=
hours.toString().padStart(2,"0")+" : "
+minutes.toString().padStart(2,"0")+" : "
+seconds.toString().padStart(2,"0");

},1000);

}

// ---------- FAQ ----------

document.querySelectorAll(".faq-item").forEach(item=>{

const answer=item.querySelector("p");

answer.style.display="none";

item.querySelector("h3").addEventListener("click",()=>{

answer.style.display=
answer.style.display==="block" ? "none":"block";

});

});

// ---------- LOGIN MODAL ----------

const loginModal=document.querySelector(".login-modal");

const accountBtn=document.querySelector(".header-right a");

if(accountBtn && loginModal){

accountBtn.onclick=(e)=>{

e.preventDefault();

loginModal.style.display="flex";

}

}

const closeLogin=document.querySelector(".close-login");

if(closeLogin){

closeLogin.onclick=()=>{

loginModal.style.display="none";

}

}

// ---------- REGISTER MODAL ----------

const registerModal=document.querySelector(".register-modal");

const registerLink=document.querySelector(".login-modal a");

if(registerLink){

registerLink.onclick=(e)=>{

e.preventDefault();

loginModal.style.display="none";

registerModal.style.display="flex";

}

}

const closeRegister=document.querySelector(".close-register");

if(closeRegister){

closeRegister.onclick=()=>{

registerModal.style.display="none";

}

}

// ---------- TOAST NOTIFICATION ----------

function toast(message){

let toast=document.createElement("div");

toast.innerHTML=message;

toast.style.position="fixed";
toast.style.bottom="30px";
toast.style.left="30px";
toast.style.background="#111";
toast.style.color="#fff";
toast.style.padding="15px 25px";
toast.style.borderRadius="10px";
toast.style.zIndex="99999";
toast.style.boxShadow="0 10px 20px rgba(0,0,0,.3)";

document.body.appendChild(toast);

setTimeout(()=>{

toast.remove();

},3000);

}

// Replace alert() with toast()

document.querySelectorAll(".cart-btn").forEach(btn=>{

btn.addEventListener("click",()=>{

toast("🛒 Product added to Cart");

});

});

document.querySelectorAll(".wishlist").forEach(btn=>{

btn.addEventListener("click",()=>{

toast("❤️ Added to Wishlist");

});

});

// ---------- SIMPLE FADE ANIMATION ----------

const sections=document.querySelectorAll("section");

window.addEventListener("scroll",()=>{

sections.forEach(section=>{

const top=section.getBoundingClientRect().top;

if(top<window.innerHeight-120){

section.style.opacity="1";
section.style.transform="translateY(0px)";

}

});

});

sections.forEach(section=>{

section.style.opacity="0";
section.style.transform="translateY(40px)";
section.style.transition=".8s";

});

console.log("AKVIA GEMS JS PART 3 LOADED");

// ==========================================
// AKVIA GEMS - SCRIPT PART 4
// Premium Features
// ==========================================

// ---------- DARK MODE ----------

const darkBtn = document.createElement("button");

darkBtn.innerHTML = "🌙";

darkBtn.style.position = "fixed";
darkBtn.style.left = "20px";
darkBtn.style.bottom = "20px";
darkBtn.style.width = "55px";
darkBtn.style.height = "55px";
darkBtn.style.borderRadius = "50%";
darkBtn.style.border = "none";
darkBtn.style.background = "#111";
darkBtn.style.color = "#fff";
darkBtn.style.cursor = "pointer";
darkBtn.style.fontSize = "20px";
darkBtn.style.zIndex = "99999";

document.body.appendChild(darkBtn);

darkBtn.onclick = () => {

    document.body.classList.toggle("dark");

};

// ---------- QUICK VIEW ----------

document.querySelectorAll(".product-card img").forEach(img=>{

img.style.cursor="pointer";

img.onclick=()=>{

const popup=window.open("","_blank","width=600,height=700");

popup.document.write(`
<html>
<head>
<title>Product Preview</title>
<style>
body{
font-family:Arial;
padding:20px;
text-align:center;
background:#fafafa;
}
img{
width:90%;
border-radius:15px;
}
</style>
</head>
<body>

<h2>${img.nextElementSibling.innerText}</h2>

<img src="${img.src}">

<p>Premium Certified Gemstone</p>

</body>
</html>
`);

}

});

// ---------- BUY NOW ----------

document.querySelectorAll(".buy-btn").forEach(btn=>{

btn.onclick=()=>{

toast("Redirecting to Checkout...");

setTimeout(()=>{

alert("Checkout page will be added later.");

},1200);

}

});

// ---------- SEARCH SUGGESTIONS ----------

const search=document.querySelector(".search-box input");

if(search){

search.setAttribute("autocomplete","off");

}

// ---------- PRODUCT HOVER ----------

document.querySelectorAll(".product-card").forEach(card=>{

card.onmouseenter=()=>{

card.style.transition=".3s";

};

});

// ---------- LOADING ----------

window.onload=()=>{

const loader=document.createElement("div");

loader.innerHTML="Welcome to AKVIA GEMS";

loader.style.position="fixed";
loader.style.inset="0";
loader.style.background="#111";
loader.style.color="#fff";
loader.style.display="flex";
loader.style.justifyContent="center";
loader.style.alignItems="center";
loader.style.fontSize="32px";
loader.style.fontWeight="bold";
loader.style.zIndex="999999";

document.body.appendChild(loader);

setTimeout(()=>{

loader.remove();

},1500);

};

// ---------- CURRENT YEAR ----------

const year=document.querySelector(".copyright");

if(year){

year.innerHTML=year.innerHTML.replace("2026",new Date().getFullYear());

}

// ---------- CONSOLE ----------

console.log("AKVIA GEMS PRO LOADED");