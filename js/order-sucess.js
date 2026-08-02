/*==================================================
BENGALURU GEMS
order-success.js
Version 1
==================================================*/



let order = {};



document.addEventListener(

    "DOMContentLoaded",

    function(){

        loadOrder();

    }

);



/*==========================
Load Order
==========================*/

function loadOrder(){


    order = JSON.parse(

        localStorage.getItem(

            "lastOrder"

        )

    );



    if(!order){

        window.location.href="shop.html";

        return;

    }



    displayCustomer();



    displayProducts();



    displaySummary();



    generateOrderInfo();

}



/*==========================
Customer Details
==========================*/

function displayCustomer(){


    document.getElementById(

        "customerName"

    ).textContent =

    order.customer.fullName;



    document.getElementById(

        "customerEmail"

    ).textContent =

    order.customer.email;



    document.getElementById(

        "customerPhone"

    ).textContent =

    order.customer.phone;



    document.getElementById(

        "customerAddress"

    ).textContent =

    order.customer.address +

    ", " +

    order.customer.city +

    ", " +

    order.customer.state +

    " - " +

    order.customer.pincode;

}
/*==========================
Display Ordered Products
==========================*/

function displayProducts(){


    const container =

    document.getElementById(

        "orderedProducts"

    );



    container.innerHTML = "";



    order.cart.forEach(product=>{



        container.innerHTML += `

<div class="ordered-product">

<img

src="${product.image}"

alt="${product.name}">



<div class="flex-grow-1">

<h5>

${product.name}

</h5>

<p>

₹${product.price.toLocaleString("en-IN")}

</p>

<small>

Quantity : ${product.quantity}

</small>

</div>



<div>

<strong>

₹${(

product.price *

product.quantity

).toLocaleString("en-IN")}

</strong>

</div>

</div>

`;



    });



}



/*==========================
Order Summary
==========================*/

function displaySummary(){


    document.getElementById(

        "summarySubtotal"

    ).textContent =

    "₹" +

    Number(

        order.subtotal

    ).toLocaleString(

        "en-IN"

    );



    document.getElementById(

        "summaryShipping"

    ).textContent =

    order.shipping===0

    ?

    "FREE"

    :

    "₹"+

    Number(

        order.shipping

    ).toLocaleString(

        "en-IN"

    );



    document.getElementById(

        "summaryTax"

    ).textContent =

    "₹"+

    Number(

        order.tax

    ).toLocaleString(

        "en-IN",

        {

            maximumFractionDigits:0

        }

    );



    document.getElementById(

        "summaryTotal"

    ).textContent =

    "₹"+

    Number(

        order.total

    ).toLocaleString(

        "en-IN",

        {

            maximumFractionDigits:0

        }

    );

}
/*==========================
Generate Order Info
==========================*/

function generateOrderInfo(){


    const orderId =

    "BG" +

    Date.now();




    document.getElementById(

        "orderId"

    ).textContent =

    orderId;




    document.getElementById(

        "orderDate"

    ).textContent =

    order.orderDate;

}



/*==========================
Copy Order ID
==========================*/

function copyOrderId(){


    const orderId =

    document.getElementById(

        "orderId"

    ).textContent;



    navigator.clipboard.writeText(

        orderId

    );



    alert(

        "Order ID copied successfully."

    );

}



/*==========================
Print Invoice
==========================*/

function printInvoice(){

    window.print();

}



/*==========================
Continue Shopping
==========================*/

function continueShopping(){

    window.location.href="shop.html";

}



/*==========================
Back To Home
==========================*/

function goHome(){

    window.location.href="index.html";

}



/*==========================
Clear Last Order (Optional)
==========================*/

function clearLastOrder(){

    localStorage.removeItem(

        "lastOrder"

    );

}