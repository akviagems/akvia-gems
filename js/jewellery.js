/*==================================================
BENGALURU GEMS
jewellery.js
Version 1
==================================================*/



let jewelleryProducts = [];

let filteredJewellery = [];

let currentPage = 1;

const productsPerPage = 8;



document.addEventListener(

    "DOMContentLoaded",

    function(){

        loadJewellery();

        initializeFilters();

    }

);



/*==========================
Load Jewellery
==========================*/

function loadJewellery(){


    if(typeof products==="undefined"){

        console.error(

            "products.js not loaded."

        );

        return;

    }



    jewelleryProducts =

    products.filter(function(product){

        return product.category==="Jewellery";

    });



    filteredJewellery=[...jewelleryProducts];



    renderJewellery();

}



/*==========================
Initialize Filters
==========================*/

function initializeFilters(){


    const search =

    document.getElementById(

        "searchJewellery"

    );



    const category =

    document.getElementById(

        "jewelleryCategory"

    );



    const sort =

    document.getElementById(

        "sortJewellery"

    );



    if(search){

        search.addEventListener(

            "input",

            filterJewellery

        );

    }



    if(category){

        category.addEventListener(

            "change",

            filterJewellery

        );

    }



    if(sort){

        sort.addEventListener(

            "change",

            filterJewellery

        );

    }

}
/*==========================
Search, Filter & Sort
==========================*/

function filterJewellery(){


    const searchText =

    document.getElementById(

        "searchJewellery"

    ).value.toLowerCase();



    const category =

    document.getElementById(

        "jewelleryCategory"

    ).value;



    const sort =

    document.getElementById(

        "sortJewellery"

    ).value;



    filteredJewellery =

    jewelleryProducts.filter(function(product){


        const matchSearch =

        product.name.toLowerCase().includes(searchText);



        const matchCategory =

            category==="all" ||

            product.type===category ||

            product.subCategory===category ||

            product.name.toLowerCase().includes(category.toLowerCase());



        return(

            matchSearch &&

            matchCategory

        );


    });



    if(sort==="low"){

        filteredJewellery.sort(function(a,b){

            return a.price-b.price;

        });

    }



    if(sort==="high"){

        filteredJewellery.sort(function(a,b){

            return b.price-a.price;

        });

    }



    if(sort==="rating"){

        filteredJewellery.sort(function(a,b){

            return b.rating-a.rating;

        });

    }



    currentPage = 1;



    renderJewellery();

}
/*==========================
Render Jewellery
==========================*/

function renderJewellery(){

    const container =

    document.getElementById(

        "jewelleryContainer"

    );



    const noProducts =

    document.getElementById(

        "noJewellery"

    );



    container.innerHTML="";



    if(filteredJewellery.length===0){

        noProducts.classList.remove("d-none");

        document.getElementById("pagination").innerHTML="";

        return;

    }



    noProducts.classList.add("d-none");



    const start =

    (currentPage-1)*productsPerPage;



    const end =

    start+productsPerPage;



    const pageProducts =

    filteredJewellery.slice(start,end);



    pageProducts.forEach(function(product){



        container.innerHTML += `

        <div class="col-lg-3 col-md-6 mb-4">

            <div class="jewellery-card">

                <img

                src="${product.image}"

                alt="${product.name}">



                <div class="jewellery-body">

                    <div class="jewellery-category">

                        ${product.type || product.category}

                    </div>



                    <h4 class="jewellery-title">

                        ${product.name}

                    </h4>



                    <p class="jewellery-description">

                        ${product.description}

                    </p>



                    <div class="jewellery-rating">

                        ⭐ ${product.rating}/5

                    </div>



                    <div class="jewellery-price">

                        ₹${product.price.toLocaleString("en-IN")}

                    </div>



                    <div class="jewellery-actions">

                        <a

                        href="product.html?id=${product.id}"

                        class="btn btn-outline-warning">

                        View

                        </a>



                        <button

                        class="btn btn-warning"

                        onclick="addToCart(${product.id})">

                        Add to Cart

                        </button>



                        <button

                        class="btn btn-outline-danger"

                        onclick="addToWishlist(${product.id})">

                        <i class="bi bi-heart"></i>

                        </button>

                    </div>

                </div>

            </div>

        </div>

        `;

    });



    renderPagination();

}
/*==========================
Pagination
==========================*/

function renderPagination(){

    const pagination =

    document.getElementById(

        "pagination"

    );



    pagination.innerHTML="";



    const totalPages =

    Math.ceil(

        filteredJewellery.length/

        productsPerPage

    );



    if(totalPages<=1){

        return;

    }



    for(

        let i=1;

        i<=totalPages;

        i++

    ){

        pagination.innerHTML +=

        `

        <button

        class="${
            currentPage===i
            ?
            "active"
            :
            ""
        }"

        onclick="changePage(${i})">

        ${i}

        </button>

        `;

    }

}



/*==========================
Change Page
==========================*/

function changePage(page){

    currentPage = page;

    renderJewellery();



    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}



/*==========================
Wishlist
==========================*/

function addToWishlist(id){

    let wishlist =

    JSON.parse(

        localStorage.getItem(

            "wishlist"

        )

    ) || [];



    if(!wishlist.includes(id)){

        wishlist.push(id);



        localStorage.setItem(

            "wishlist",

            JSON.stringify(

                wishlist

            )

        );



        alert(

            "Added to Wishlist ❤️"

        );

    }

    else{

        alert(

            "Already in Wishlist"

        );

    }

}



/*==========================
Reset Filters
==========================*/

function resetJewelleryFilters(){

    document.getElementById(

        "searchJewellery"

    ).value="";



    document.getElementById(

        "jewelleryCategory"

    ).value="all";



    document.getElementById(

        "sortJewellery"

    ).value="default";



    filteredJewellery=[...jewelleryProducts];



    currentPage=1;



    renderJewellery();

}



/*==========================
Helper Functions
==========================*/

function refreshJewellery(){

    renderJewellery();

}