/*==================================================
BENGALURU GEMS
gemstones.js
Version 1
==================================================*/



let gemstones = [];

let filteredGemstones = [];

let currentPage = 1;

const productsPerPage = 8;



document.addEventListener(

    "DOMContentLoaded",

    function(){

        loadGemstones();

        initializeFilters();

    }

);



/*==========================
Load Gemstones
==========================*/

function loadGemstones(){


    if(typeof products==="undefined"){

        console.error(

            "products.js not loaded."

        );

        return;

    }



    gemstones =

    products.filter(function(product){

        return product.category==="Gemstone";

    });



    filteredGemstones=[...gemstones];



    renderGemstones();

}



/*==========================
Initialize Filters
==========================*/

function initializeFilters(){


    const search =

    document.getElementById(

        "searchGem"

    );



    const category =

    document.getElementById(

        "gemCategory"

    );



    const sort =

    document.getElementById(

        "sortGem"

    );



    if(search){

        search.addEventListener(

            "input",

            filterGemstones

        );

    }



    if(category){

        category.addEventListener(

            "change",

            filterGemstones

        );

    }



    if(sort){

        sort.addEventListener(

            "change",

            filterGemstones

        );

    }

}
/*==========================
Search, Filter & Sort
==========================*/

function filterGemstones(){


    const searchText =

    document.getElementById(

        "searchGem"

    ).value.toLowerCase();



    const category =

    document.getElementById(

        "gemCategory"

    ).value;



    const sort =

    document.getElementById(

        "sortGem"

    ).value;



    filteredGemstones =

    gemstones.filter(function(product){


        const matchSearch =

        product.name.toLowerCase().includes(searchText);



        const matchCategory =

        category==="all" ||

        product.name===category;



        return(

            matchSearch &&

            matchCategory

        );


    });



    if(sort==="low"){

        filteredGemstones.sort(function(a,b){

            return a.price-b.price;

        });

    }



    if(sort==="high"){

        filteredGemstones.sort(function(a,b){

            return b.price-a.price;

        });

    }



    if(sort==="rating"){

        filteredGemstones.sort(function(a,b){

            return b.rating-a.rating;

        });

    }



    currentPage = 1;



    renderGemstones();

}
/*==========================
Render Gemstones
==========================*/

function renderGemstones(){

    const container =

    document.getElementById(

        "gemstoneContainer"

    );



    const noProducts =

    document.getElementById(

        "noGemstones"

    );



    container.innerHTML="";



    if(filteredGemstones.length===0){

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

    filteredGemstones.slice(start,end);



    pageProducts.forEach(function(product){



        container.innerHTML += `

        <div class="col-lg-3 col-md-6 mb-4">

            <div class="gem-card">

                <img

                src="${product.image}"

                alt="${product.name}">



                <div class="gem-body">

                    <div class="gem-category">

                        ${product.category}

                    </div>



                    <h4 class="gem-title">

                        ${product.name}

                    </h4>



                    <p class="gem-description">

                        ${product.description}

                    </p>



                    <div class="gem-rating">

                        ⭐ ${product.rating}/5

                    </div>



                    <div class="gem-price">

                        ₹${product.price.toLocaleString("en-IN")}

                    </div>



                    <div class="gem-actions">

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

        filteredGemstones.length/

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

    currentPage=page;

    renderGemstones();



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
Helper Functions
==========================*/

function refreshGemstones(){

    renderGemstones();

}



function resetGemFilters(){

    document.getElementById(

        "searchGem"

    ).value="";



    document.getElementById(

        "gemCategory"

    ).value="all";



    document.getElementById(

        "sortGem"

    ).value="default";



    filteredGemstones=[...gemstones];



    currentPage=1;



    renderGemstones();

}