/*==================================================
BENGALURU GEMS
wishlist.js
Version 1
==================================================*/






document.addEventListener(

    "DOMContentLoaded",

    function(){

        loadWishlist();

    }

);



/*==========================
Load Wishlist
==========================*/

function loadWishlist(){


    wishlist = JSON.parse(

        localStorage.getItem(

            "wishlist"

        )

    ) || [];



    if(wishlist.length===0){

        showEmptyWishlist();

        return;

    }



    displayWishlist();



    updateCartCounter();

}



/*==========================
Display Wishlist
==========================*/

function displayWishlist(){

    const container = document.getElementById("wishlistContainer");

    container.innerHTML = "";

    wishlist.forEach(function(id){

        const product = products.find(function(item){

            return item.id === id;

        });

        if(!product){

            return;

        }

        container.innerHTML += `

<div class="col-lg-4 col-md-6">

<div class="wishlist-card">

<img src="${product.image}" alt="${product.name}">

<div class="wishlist-body">

<h4>${product.name}</h4>

<p class="wishlist-price">
₹${product.price.toLocaleString("en-IN")}
</p>

<button class="btn btn-gold"
onclick="moveToCart(${product.id})">

Move To Cart

</button>

<button class="btn btn-danger mt-2"
onclick="removeWishlist(${product.id})">

Remove

</button>

</div>

</div>

</div>

`;

    });

}



/*==========================
Empty Wishlist
==========================*/

function showEmptyWishlist(){


    document.getElementById(

        "wishlistContainer"

    ).style.display="none";



    document.getElementById(

        "emptyWishlist"

    ).classList.remove(

        "d-none"

    );

}
/*==========================
Move To Cart
==========================*/

function moveToCart(id){


    const product = products.find(function(item){

    return item.id === id;

});
console.log(id);
console.log(product);

    if(!product){

        return;

    }



    let cart = JSON.parse(

        localStorage.getItem(

            "cart"

        )

    ) || [];



    const existing =

    cart.find(

        item=>item.id===id

    );



    if(existing){

        existing.quantity += 1;

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



    removeWishlist(

        id,

        false

    );



    updateCartCounter();



    alert(

        product.name +

        " moved to cart."

    );

}



/*==========================
Remove Wishlist
==========================*/

function removeWishlist(


    id,

    showMessage=true


){


    wishlist = wishlist.filter(function(item){

    return item !== id;

});



    localStorage.setItem(

        "wishlist",

        JSON.stringify(wishlist)

    );



    if(showMessage){

        alert(

            "Product removed from wishlist."

        );

    }



    if(wishlist.length===0){

        showEmptyWishlist();

    }

    else{

        displayWishlist();

    }

}
/*==========================
Update Cart Counter
==========================*/

function updateCartCounter(){


    const counter =

    document.querySelector(

        ".cart-count"

    );



    if(!counter){

        return;

    }



    const cart = JSON.parse(

        localStorage.getItem(

            "cart"

        )

    ) || [];



    let totalItems = 0;



    cart.forEach(item=>{

        totalItems += item.quantity;

    });



    counter.textContent = totalItems;

}






/*==========================
Save Wishlist
==========================*/

function saveWishlist(){


    localStorage.setItem(

        "wishlist",

        JSON.stringify(wishlist)

    );

}



/*==========================
Clear Wishlist
==========================*/

function clearWishlist(){


    if(

        !confirm(

            "Are you sure you want to clear your wishlist?"

        )

    ){

        return;

    }



    wishlist = [];



    localStorage.removeItem(

        "wishlist"

    );



    showEmptyWishlist();

}



/*==========================
Go To Shop
==========================*/

function continueShopping(){

    window.location.href =

    "shop.html";

}