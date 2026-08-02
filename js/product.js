/*==================================================
BENGALURU GEMS
products.js
Version 2 - Part 1
Product Database
==================================================*/

const products = [

{
    id:1,
    name:"Natural Ruby",
    category:"Gemstone",
    price:24999,
    image:"images/products/ruby.jpg",
    rating:5,
    stock:true,
    description:"Certified Natural Ruby with excellent color and clarity."
},

{
    id:2,
    name:"Natural Emerald",
    category:"Gemstone",
    price:18999,
    image:"images/products/emerald.jpg",
    rating:5,
    stock:true,
    description:"Premium natural emerald with certification."
},

{
    id:3,
    name:"Blue Sapphire",
    category:"Gemstone",
    price:32999,
    image:"images/products/sapphire.jpg",
    rating:5,
    stock:true,
    description:"High-quality blue sapphire for astrology and jewellery."
},

{
    id:4,
    name:"Yellow Sapphire",
    category:"Gemstone",
    price:28999,
    image:"images/products/yellow-sapphire.jpg",
    rating:4.8,
    stock:true,
    description:"Certified yellow sapphire with brilliant shine."
},

{
    id:5,
    name:"Diamond Ring",
    category:"Jewellery",
    price:58999,
    image:"images/products/diamond-ring.jpg",
    rating:5,
    stock:true,
    description:"Luxury diamond ring crafted in 18K gold."
},

{
    id:6,
    name:"Gold Necklace",
    category:"Jewellery",
    price:72999,
    image:"images/products/gold-necklace.jpg",
    rating:5,
    stock:true,
    description:"Elegant handcrafted gold necklace."
},

{
    id:7,
    name:"Silver Bracelet",
    category:"Jewellery",
    price:6999,
    image:"images/products/silver-bracelet.jpg",
    rating:4.7,
    stock:true,
    description:"Premium sterling silver bracelet."
},

{
    id:8,
    name:"Diamond Earrings",
    category:"Jewellery",
    price:45999,
    image:"images/products/diamond-earrings.jpg",
    rating:5,
    stock:true,
    description:"Beautiful diamond earrings for every occasion."
},

{
    id:9,
    name:"Opal Stone",
    category:"Gemstone",
    price:14999,
    image:"images/products/opal.jpg",
    rating:4.8,
    stock:true,
    description:"Natural opal with unique fire and brilliance."
},

{
    id:10,
    name:"Pearl Necklace",
    category:"Jewellery",
    price:21999,
    image:"images/products/pearl-necklace.jpg",
    rating:4.9,
    stock:true,
    description:"Freshwater cultured pearl necklace."
},

{
    id:11,
    name:"Cat's Eye",
    category:"Gemstone",
    price:19999,
    image:"images/products/catseye.jpg",
    rating:4.8,
    stock:true,
    description:"Natural Cat's Eye gemstone with certification."
},

{
    id:12,
    name:"Pukhraj Ring",
    category:"Jewellery",
    price:38999,
    image:"images/products/pukhraj-ring.jpg",
    rating:5,
    stock:true,
    description:"Luxury yellow sapphire ring in gold."
}

];
/*==================================================
BENGALURU GEMS
product.js
Version 1
==================================================*/


let currentProduct = null;

let productQuantity = 1;



document.addEventListener("DOMContentLoaded",()=>{


    loadProductDetails();


});



/*==========================
Load Product
==========================*/


function loadProductDetails(){


    const params = new URLSearchParams(window.location.search);


    const id = Number(params.get("id"));



    currentProduct = products.find(product=>product.id === id);



    if(!currentProduct){

        return;

    }



    document.getElementById("productImage").src =
    currentProduct.image;



    document.getElementById("productName").textContent =
    currentProduct.name;



    document.getElementById("productCategory").textContent =
    currentProduct.category;



    document.getElementById("productPrice").textContent =
    "₹" + currentProduct.price.toLocaleString("en-IN");



    document.getElementById("productDescription").textContent =
    currentProduct.description;



    document.getElementById("productRating").innerHTML =
    generateRating(currentProduct.rating);



    loadRelatedProducts();



}



/*==========================
Rating Stars
==========================*/


function generateRating(rating){


    let stars="";


    for(let i=1;i<=5;i++){


        if(i<=Math.floor(rating)){


            stars += `<i class="bi bi-star-fill"></i>`;


        }
        else{


            stars += `<i class="bi bi-star"></i>`;


        }


    }


    return stars;


}



/*==========================
Quantity Change
==========================*/


function changeQuantity(value){


    productQuantity += value;



    if(productQuantity < 1){

        productQuantity = 1;

    }



    document.getElementById("quantity").value =
    productQuantity;



}



/*==========================
Add Current Product
==========================*/


function addCurrentProductToCart(){


    if(!currentProduct){

        return;

    }



    let cart =
    JSON.parse(localStorage.getItem("cart")) || [];



    let existing =
    cart.find(item=>item.id===currentProduct.id);



    if(existing){


        existing.quantity += productQuantity;


    }

    else{


        cart.push({

            ...currentProduct,

            quantity:productQuantity

        });


    }



    localStorage.setItem(

        "cart",

        JSON.stringify(cart)

    );



    updateCartCounter();



    alert(

        currentProduct.name +

        " added to cart"

    );



}



/*==========================
Buy Now
==========================*/


function buyNow(){


    addCurrentProductToCart();



    window.location.href="cart.html";


}



/*==========================
Related Products
==========================*/


function loadRelatedProducts(){


    const container =
    document.getElementById("relatedProducts");



    if(!container){

        return;

    }



    const related =
    products

    .filter(item=>{

        return item.category === currentProduct.category

        && item.id !== currentProduct.id;

    })

    .slice(0,4);



    related.forEach(product=>{



        container.innerHTML += `



<div class="col-lg-3 col-md-6">


<div class="related-card">


<img src="${product.image}"

alt="${product.name}">



<div class="related-body">


<h5>

${product.name}

</h5>


<p class="related-price">

₹${product.price.toLocaleString("en-IN")}

</p>



<a href="product.html?id=${product.id}"

class="btn btn-gold w-100">

View Product

</a>



</div>


</div>


</div>



`;



    });



}