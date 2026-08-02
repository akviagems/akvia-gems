/*==================================================
BENGALURU GEMS
cart.js
Version 1 - Part 1
==================================================*/


document.addEventListener("DOMContentLoaded", () => {

    loadCart();

});



/*====================================
Load Cart
====================================*/

function loadCart() {

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const tbody = document.getElementById("cartItems");

    if (!tbody) return;

    tbody.innerHTML = "";

    if (cart.length === 0) {

        tbody.innerHTML = `

        <tr>

            <td colspan="5">

                <div class="empty-cart">

                    <i class="bi bi-cart-x"></i>

                    <h2>Your Cart is Empty</h2>

                    <p>

                        Add some beautiful gemstones to begin shopping.

                    </p>

                    <a href="index.html"

                       class="btn btn-gold">

                        Continue Shopping

                    </a>

                </div>

            </td>

        </tr>

        `;

        calculateTotal();

        return;

    }



    cart.forEach(product => {

        tbody.innerHTML += `

<tr>

<td>

<div class="cart-product">

<img src="${product.image}"

alt="${product.name}">

<div>

<h6>${product.name}</h6>

<p>${product.category}</p>

</div>

</div>

</td>

<td class="cart-price">

₹${product.price.toLocaleString("en-IN")}

</td>

<td>

<div class="quantity-box">

<button

class="quantity-btn"

onclick="decreaseQuantity(${product.id})">

-

</button>

<span class="quantity-value">

${product.quantity}

</span>

<button

class="quantity-btn"

onclick="increaseQuantity(${product.id})">

+

</button>

</div>

</td>

<td class="cart-price">

₹${(product.price * product.quantity).toLocaleString("en-IN")}

</td>

<td>

<button

class="remove-btn"

onclick="removeItem(${product.id})">

<i class="bi bi-trash"></i>

</button>

</td>

</tr>

`;

    });

    calculateTotal();

}
/*==================================================
Quantity Controls
==================================================*/


function increaseQuantity(id) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const product = cart.find(item => item.id === id);

    if (!product) return;

    product.quantity++;

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCounter();

    loadCart();

}



function decreaseQuantity(id) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const product = cart.find(item => item.id === id);

    if (!product) return;

    if (product.quantity > 1) {

        product.quantity--;

    } else {

        cart = cart.filter(item => item.id !== id);

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCounter();

    loadCart();

}



/*==================================================
Remove Item
==================================================*/

function removeItem(id) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart = cart.filter(item => item.id !== id);

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCounter();

    loadCart();

}



/*==================================================
Calculate Totals
==================================================*/

function calculateTotal() {

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    let subtotal = 0;

    cart.forEach(item => {

        subtotal += item.price * item.quantity;

    });

    const gst = subtotal * 0.18;

    const grandTotal = subtotal + gst;

    document.getElementById("subtotal").textContent =
        "₹" + subtotal.toLocaleString("en-IN");

    document.getElementById("gst").textContent =
        "₹" + gst.toLocaleString("en-IN", {

            maximumFractionDigits: 2

        });

    document.getElementById("grandTotal").textContent =
        "₹" + grandTotal.toLocaleString("en-IN", {

            maximumFractionDigits: 2

        });

}
/*==================================================
Coupon System
==================================================*/

let discountApplied = false;


function applyCoupon() {

    const couponInput = document.querySelector(".coupon-box input");

    if (!couponInput) return;


    const coupon = couponInput.value.trim().toUpperCase();


    if (coupon === "GEMS10") {

        discountApplied = true;

        alert("Coupon Applied! 10% discount added.");

        calculateTotal();

    } 
    else {

        discountApplied = false;

        alert("Invalid Coupon Code.");

    }

}



/*==================================================
Updated Total Calculation With Discount
==================================================*/

function calculateTotal() {


    const cart = JSON.parse(localStorage.getItem("cart")) || [];


    let subtotal = 0;


    cart.forEach(item => {

        subtotal += item.price * item.quantity;

    });


    let discount = 0;


    if (discountApplied) {

        discount = subtotal * 0.10;

    }


    const afterDiscount = subtotal - discount;


    const gst = afterDiscount * 0.18;


    const grandTotal = afterDiscount + gst;



    const subtotalElement = document.getElementById("subtotal");

    const gstElement = document.getElementById("gst");

    const totalElement = document.getElementById("grandTotal");



    if(subtotalElement){

        subtotalElement.textContent =
        "₹" + subtotal.toLocaleString("en-IN");

    }


    if(gstElement){

        gstElement.textContent =
        "₹" + gst.toLocaleString("en-IN",{

            maximumFractionDigits:2

        });

    }


    if(totalElement){

        totalElement.textContent =
        "₹" + grandTotal.toLocaleString("en-IN",{

            maximumFractionDigits:2

        });

    }

}



/*==================================================
WhatsApp Order
==================================================*/

function orderOnWhatsApp(){

    const cart = JSON.parse(localStorage.getItem("cart")) || [];


    if(cart.length === 0){

        alert("Your cart is empty.");

        return;

    }



    let message = "Hello Bengaluru Gems,%0A%0A";

    message += "I want to order:%0A%0A";



    cart.forEach(item=>{

        message +=
        `${item.name} x ${item.quantity} = ₹${item.price * item.quantity}%0A`;

    });



    message += "%0AThank you.";



    const phone = "919876543210";


    window.open(

        `https://wa.me/${phone}?text=${message}`,

        "_blank"

    );

}



/*==================================================
Cart Notification
==================================================*/

function cartMessage(text){


    const message = document.createElement("div");


    message.className = "cart-message";


    message.innerHTML = text;


    document.body.appendChild(message);



    setTimeout(()=>{

        message.remove();

    },2500);


}

