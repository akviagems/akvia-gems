/*==================================================
BENGALURU GEMS
script.js
Version 2
Main Script
==================================================*/



/*==========================
Global Variables
==========================*/

let cart = JSON.parse(

    localStorage.getItem("cart")

) || [];



let wishlist = JSON.parse(

    localStorage.getItem("wishlist")

) || [];



/*==========================
DOM Ready
==========================*/

document.addEventListener(

    "DOMContentLoaded",

    function(){

        initializeWebsite();

    }

);



/*==========================
Initialize Website
==========================*/

function initializeWebsite(){

    updateCartCounter();

    updateWishlistCounter();

    stickyNavbar();

    smoothScrolling();

    newsletterForm();

    scrollTopButton();

    displayBestSellers();

    displayNewArrivals();

}



/*==========================
Sticky Navbar
==========================*/

function stickyNavbar(){

    const navbar =

    document.querySelector(

        ".custom-navbar"

    ) ||

    document.querySelector(

        ".luxury-navbar"

    );



    if(!navbar){

        return;

    }



    window.addEventListener(

        "scroll",

        function(){


            if(window.scrollY>80){

                navbar.classList.add(

                    "navbar-scrolled"

                );

            }

            else{

                navbar.classList.remove(

                    "navbar-scrolled"

                );

            }


        }

    );

}



/*==========================
Smooth Scroll
==========================*/

function smoothScrolling(){

    document

    .querySelectorAll(

        'a[href^="#"]'

    )

    .forEach(function(link){


        link.addEventListener(

            "click",

            function(event){


                const target =

                document.querySelector(

                    this.getAttribute(

                        "href"

                    )

                );



                if(!target){

                    return;

                }



                event.preventDefault();



                target.scrollIntoView({

                    behavior:"smooth"

                });


            }

        );


    });

}



/*==========================
Newsletter
==========================*/

function newsletterForm(){

    const form =

    document.querySelector(

        ".newsletter-form"

    );



    if(!form){

        return;

    }



    form.addEventListener(

        "submit",

        function(event){


            event.preventDefault();



            const email =

            form.querySelector(

                "input"

            ).value.trim();



            if(email===""){

                alert(

                    "Please enter your email."

                );

                return;

            }



            alert(

                "Thank you for subscribing!"

            );



            form.reset();


        }

    );

}
/*==========================
Scroll To Top Button
==========================*/

function scrollTopButton(){

    let button =

    document.querySelector(

        ".scroll-top"

    );



    if(!button){

        button =

        document.createElement(

            "button"

        );



        button.className =

        "scroll-top";



        button.innerHTML =

        '<i class="bi bi-arrow-up"></i>';



        document.body.appendChild(

            button

        );

    }



    window.addEventListener(

        "scroll",

        function(){

            if(window.scrollY>300){

                button.classList.add(

                    "show"

                );

            }

            else{

                button.classList.remove(

                    "show"

                );

            }

        }

    );



    button.addEventListener(

        "click",

        function(){

            window.scrollTo({

                top:0,

                behavior:"smooth"

            });

        }

    );

}



/*==========================
Loading Animation
==========================*/

window.addEventListener(

    "load",

    function(){

        document.body.classList.add(

            "loaded"

        );

    }

);



/*==========================
Utility Functions
==========================*/

function formatPrice(price){

    return "₹"+

    Number(price)

    .toLocaleString(

        "en-IN"

    );

}



function showMessage(message){

    alert(message);

}



/*==========================
Wishlist
==========================*/

function addToWishlist(id){

    if(

        wishlist.includes(id)

    ){

        alert(

            "Already in Wishlist ❤️"

        );

        return;

    }



    wishlist.push(id);



    localStorage.setItem(

        "wishlist",

        JSON.stringify(

            wishlist

        )

    );



    updateWishlistCounter();



    alert(

        "Added to Wishlist ❤️"

    );

}



function updateWishlistCounter(){

    const counter =

    document.querySelector(

        ".wishlist-count"

    );



    if(counter){

        counter.textContent =

        wishlist.length;

    }

}



/*==========================
Cart Counter
==========================*/

function updateCartCounter(){

    cart = JSON.parse(

        localStorage.getItem(

            "cart"

        )

    ) || [];



    let total = 0;



    cart.forEach(function(item){

        total +=

        item.quantity;

    });



    const counter =

    document.querySelector(

        ".cart-count"

    );



    if(counter){

        counter.textContent =

        total;

    }

}
/*==========================
Add To Cart
==========================*/

function addToCart(id){

    if(typeof products==="undefined"){

        console.error(

            "products.js not loaded."

        );

        return;

    }



    const product =

    products.find(function(item){

        return item.id===id;

    });



    if(!product){

        alert("Product not found.");

        return;

    }



    cart = JSON.parse(

        localStorage.getItem("cart")

    ) || [];



    const existing =

    cart.find(function(item){

        return item.id===id;

    });



    if(existing){

        existing.quantity++;

    }

    else{

        cart.push({

            ...product,

            quantity:1

        });

    }



    localStorage.setItem(

        "cart",

        JSON.stringify(cart)

    );



    updateCartCounter();



    alert(

        product.name +

        " added to cart."

    );

}



/*==========================
Remove From Cart
==========================*/

function removeFromCart(id){

    cart = JSON.parse(

        localStorage.getItem("cart")

    ) || [];



    cart = cart.filter(function(item){

        return item.id!==id;

    });



    localStorage.setItem(

        "cart",

        JSON.stringify(cart)

    );



    updateCartCounter();

}



/*==========================
Clear Cart
==========================*/

function clearCart(){

    localStorage.removeItem(

        "cart"

    );



    cart=[];



    updateCartCounter();



    if(typeof loadCart==="function"){

        loadCart();

    }

}



/*==========================
Get Cart
==========================*/

function getCart(){

    return JSON.parse(

        localStorage.getItem("cart")

    ) || [];

}



/*==========================
Increase Quantity
==========================*/

function increaseQuantity(id){

    cart = getCart();



    cart.forEach(function(item){

        if(item.id===id){

            item.quantity++;

        }

    });



    localStorage.setItem(

        "cart",

        JSON.stringify(cart)

    );



    updateCartCounter();



    if(typeof loadCart==="function"){

        loadCart();

    }

}



/*==========================
Decrease Quantity
==========================*/

function decreaseQuantity(id){

    cart = getCart();



    cart.forEach(function(item){

        if(

            item.id===id &&

            item.quantity>1

        ){

            item.quantity--;

        }

    });



    localStorage.setItem(

        "cart",

        JSON.stringify(cart)

    );



    updateCartCounter();



    if(typeof loadCart==="function"){

        loadCart();

    }

}
/*==========================
Create Product Card
==========================*/

function createProductCard(product){

    return `

    <div class="col-lg-3 col-md-6 mb-4">

        <div class="product-card h-100">

            <div class="product-image">

                <img

                src="${product.image}"

                alt="${product.name}"

                class="img-fluid">

            </div>

            <div class="product-body">

                <p class="product-category">

                    ${product.category}

                </p>

                <h5 class="product-title">

                    ${product.name}

                </h5>

                <div class="product-rating">

                    ⭐ ${product.rating}/5

                </div>

                <h4 class="product-price">

                    ${formatPrice(product.price)}

                </h4>

                <div class="d-grid gap-2 mt-3">

                    <a

                    href="product.html?id=${product.id}"

                    class="btn btn-outline-warning">

                    View Details

                    </a>

                    <button

                    class="btn btn-warning"

                    onclick="addToCart(${product.id})">

                    <i class="bi bi-bag-plus"></i>

                    Add To Cart

                    </button>

                </div>

            </div>

        </div>

    </div>

    `;

}



/*==========================
Best Sellers
==========================*/

function displayBestSellers(){

    const container =

    document.getElementById(

        "featuredProducts"

    ) ||

    document.getElementById(

        "featuredproducts"

    );



    if(

        !container ||

        typeof products==="undefined"

    ){

        return;

    }



    container.innerHTML="";



    products

    .slice(0,8)

    .forEach(function(product){

        container.innerHTML +=

        createProductCard(product);

    });

}



/*==========================
New Arrivals
==========================*/

function displayNewArrivals(){

    const container =

    document.getElementById(

        "newArrivalProducts"

    );



    if(

        !container ||

        typeof products==="undefined"

    ){

        return;

    }



    container.innerHTML="";



    products

    .slice(-4)

    .forEach(function(product){

        container.innerHTML +=

        createProductCard(product);

    });

}



/*==========================
Search Helper
==========================*/

function searchProducts(keyword){

    if(typeof products==="undefined"){

        return [];

    }



    keyword =

    keyword.toLowerCase();



    return products.filter(function(product){

        return(

            product.name

            .toLowerCase()

            .includes(keyword)

            ||

            product.category

            .toLowerCase()

            .includes(keyword)

        );

    });

}



/*==========================
Console
==========================*/

console.log(

    "%cBENGALURU GEMS",

    "color:#d4af37;font-size:22px;font-weight:bold;"

);

console.log(

    "Website Loaded Successfully."

);

console.log(

    "Version 2 Ready"

);