/*==================================================
BENGALURU GEMS
checkout.js
Version 1
==================================================*/




let subtotal = 0;

let shipping = 0;

let tax = 0;

let total = 0;



document.addEventListener(

    "DOMContentLoaded",

    function(){

        loadCheckout();

    }

);



/*==========================
Load Checkout
==========================*/

function loadCheckout(){


    cart = JSON.parse(

        localStorage.getItem("cart")

    ) || [];



    if(cart.length===0){

        emptyCheckout();

        return;

    }



    displayCheckoutItems();



    calculateTotal();



    updateCartCounter();

}



/*==========================
Display Products
==========================*/

function displayCheckoutItems(){


    const container =

    document.getElementById(

        "checkoutItems"

    );



    container.innerHTML = "";



    cart.forEach(product=>{



        container.innerHTML += `

<div class="checkout-item">

<img src="${product.image}"

alt="${product.name}">

<div>

<h6>

${product.name}

</h6>

<p>

₹${product.price.toLocaleString("en-IN")}

</p>

<small>

Qty : ${product.quantity}

</small>

</div>

</div>

`;



    });



}



/*==========================
Empty Checkout
==========================*/

function emptyCheckout(){


    document.getElementById(

        "checkoutItems"

    ).innerHTML = `

<div class="empty-order">

<i class="bi bi-cart-x"></i>

<h4>

Your Cart is Empty

</h4>

<p>

Please add products before checkout.

</p>

<a

href="shop.html"

class="btn btn-gold mt-3">

Go Shopping

</a>

</div>

`;

}
/*==========================
Calculate Total
==========================*/

function calculateTotal(){


    subtotal = 0;



    cart.forEach(product=>{

        subtotal +=

        product.price *

        product.quantity;

    });



    /* GST 3% */

    tax = subtotal * 0.03;



    /* Shipping */

    if(subtotal >= 50000){

        shipping = 0;

    }

    else{

        shipping = 499;

    }



    total =

    subtotal +

    tax +

    shipping;



    document.getElementById(

        "checkoutSubtotal"

    ).textContent =

    "₹" +

    subtotal.toLocaleString("en-IN");



    document.getElementById(

        "checkoutTax"

    ).textContent =

    "₹" +

    tax.toLocaleString(

        "en-IN",

        {

            maximumFractionDigits:0

        }

    );



    document.getElementById(

        "checkoutShipping"

    ).textContent =

    shipping===0

    ?

    "FREE"

    :

    "₹" +

    shipping.toLocaleString("en-IN");



    document.getElementById(

        "checkoutTotal"

    ).textContent =

    "₹" +

    total.toLocaleString(

        "en-IN",

        {

            maximumFractionDigits:0

        }

    );

}



/*==========================
Apply Coupon
==========================*/

function applyCoupon(){


    const coupon =

    document.getElementById(

        "couponCode"

    ).value

    .trim()

    .toUpperCase();



    if(coupon==="GEMS10"){

        total = total * 0.90;

    }

    else if(coupon==="AKVIA500"){

        total = total - 500;

    }

    else{

        alert(

            "Invalid Coupon Code"

        );

        return;

    }



    if(total < 0){

        total = 0;

    }



    document.getElementById(

        "checkoutTotal"

    ).textContent =

    "₹" +

    total.toLocaleString(

        "en-IN",

        {

            maximumFractionDigits:0

        }

    );



    alert(

        "Coupon Applied Successfully"

    );

}
/*==========================
Place Order
==========================*/

function placeOrder(){


    const fullName =
    document.getElementById("fullName").value.trim();

    const email =
    document.getElementById("email").value.trim();

    const phone =
    document.getElementById("phone").value.trim();

    const address =
    document.getElementById("address").value.trim();

    const city =
    document.getElementById("city").value.trim();

    const state =
    document.getElementById("state").value.trim();

    const pincode =
    document.getElementById("pincode").value.trim();



    if(

        fullName==="" ||

        email==="" ||

        phone==="" ||

        address==="" ||

        city==="" ||

        state==="" ||

        pincode===""

    ){

        alert(

            "Please fill all required fields."

        );

        return;

    }



    const order={

        customer:{

            fullName,

            email,

            phone,

            address,

            city,

            state,

            pincode

        },

        cart,

        subtotal,

        shipping,

        tax,

        total,

        orderDate:new Date().toLocaleString()

    };



    localStorage.setItem(

        "lastOrder",

        JSON.stringify(order)

    );



    localStorage.removeItem(

        "cart"

    );



    alert(

        "Order placed successfully!\nThank you for shopping with Bengaluru Gems."

    );



    

}



/*==========================
Update Cart Counter
==========================*/

function updateCartCounter(){


    const counter =

    document.getElementById(

        "cartCount"

    );



    if(!counter){

        return;

    }



    let count = 0;



    cart.forEach(item=>{

        count += item.quantity;

    });



    counter.textContent = count;

}



/*==========================
Optional WhatsApp Order
==========================*/

function orderOnWhatsApp(){


    let message =

`Hello Bengaluru Gems,

I would like to place an order.

Name: ${document.getElementById("fullName").value}

Total: ₹${total.toLocaleString("en-IN")}

Thank you.`;



    const whatsappNumber =

    "919876543210"; // Replace with your WhatsApp number



    window.open(

        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,

        "_blank"

    );

}
