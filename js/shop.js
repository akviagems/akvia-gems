/*==================================================
BENGALURU GEMS
shop.js
Version 1
==================================================*/


document.addEventListener("DOMContentLoaded",()=>{


    loadShopProducts();


    searchProducts();


    filterProducts();


    sortProducts();


});



/*==========================
Display Products
==========================*/


function loadShopProducts(list = products){


    const container = document.getElementById("shopProducts");


    if(!container) return;



    container.innerHTML="";



    if(list.length === 0){


        container.innerHTML = `


        <div class="col-12">


        <div class="no-products">


        <i class="bi bi-search"></i>


        <h3>

        No Products Found

        </h3>


        </div>


        </div>


        `;


        return;


    }



    list.forEach(product=>{


        container.innerHTML += `



<div class="col-lg-4 col-md-6">


<div class="shop-product-card">



<img src="${product.image}"

alt="${product.name}">



<div class="shop-product-body">


<p class="shop-category">

${product.category}

</p>



<h5>

${product.name}

</h5>



<div class="rating">


${createStars(product.rating)}


</div>



<p class="shop-price">

₹${product.price.toLocaleString("en-IN")}

</p>



<button

class="btn btn-gold w-100"

onclick="addToCart(${product.id})">


<i class="bi bi-cart-plus"></i>

Add To Cart


</button>


<a

href="product.html?id=${product.id}"

class="btn btn-outline-light w-100 mt-2">


View Details


</a>



</div>


</div>


</div>



        `;


    });


}



/*==========================
Stars
==========================*/


function createStars(rating){


    let stars="";


    for(let i=1;i<=5;i++){


        if(i <= Math.floor(rating)){


            stars += `<i class="bi bi-star-fill"></i>`;


        }

        else{


            stars += `<i class="bi bi-star"></i>`;


        }


    }


    return stars;


}



/*==========================
Search
==========================*/


function searchProducts(){


const search =
document.getElementById("searchProduct");



if(!search) return;



search.addEventListener("input",()=>{


const value =
search.value.toLowerCase();



const result = products.filter(product=>{


return product.name
.toLowerCase()
.includes(value);



});



loadShopProducts(result);



});


}




/*==========================
Category Filter
==========================*/


function filterProducts(){


const filter =
document.getElementById("categoryFilter");



if(!filter) return;



filter.addEventListener("change",()=>{


const value =
filter.value;



if(value==="all"){


loadShopProducts(products);


}

else{


const result =
products.filter(product=>{


return product.category === value;


});


loadShopProducts(result);


}



});


}




/*==========================
Sort Products
==========================*/


function sortProducts(){


const sort =
document.getElementById("sortProduct");



if(!sort) return;



sort.addEventListener("change",()=>{


let sorted=[...products];



if(sort.value==="low"){


sorted.sort((a,b)=>{


return a.price-b.price;


});


}



if(sort.value==="high"){


sorted.sort((a,b)=>{


return b.price-a.price;


});


}



loadShopProducts(sorted);



});


}