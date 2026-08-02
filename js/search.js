/*==================================================
BENGALURU GEMS
search.js
Version 2
==================================================*/

let allProducts = [];
let currentFilter = "all";


document.addEventListener("DOMContentLoaded", function () {

    /*==========================
    Load Products
    ==========================*/

    if (typeof products !== "undefined") {

        allProducts = products;

        displayProducts(allProducts);

    } else {

        console.error("products.js not loaded.");

        return;

    }


    /*==========================
    Search Input
    ==========================*/

    const searchInput =
        document.getElementById("searchInput");

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            searchProducts
        );

    }


    /*==========================
    Filter Buttons
    ==========================*/

    document.querySelectorAll(".filter-btn").forEach(
        button => {

            button.addEventListener("click", function () {

                document.querySelectorAll(".filter-btn")
                    .forEach(btn => {

                        btn.classList.remove("btn-gold");

                        btn.classList.add(
                            "btn-outline-gold"
                        );

                    });


                this.classList.remove(
                    "btn-outline-gold"
                );

                this.classList.add("btn-gold");


                currentFilter =
                    this.dataset.filter;


                searchProducts();

            });

        }
    );

});


/*==========================
Search Function
==========================*/

function searchProducts() {

    const searchInput =
        document.getElementById("searchInput");


    if (!searchInput) {
        return;
    }


    const keyword =
        searchInput.value
            .trim()
            .toLowerCase();


    const filtered =
        allProducts.filter(product => {


            const productName =
                String(product.name || "")
                    .toLowerCase();


            const productCategory =
                String(product.category || "")
                    .toLowerCase();


            const productDescription =
                String(product.description || "")
                    .toLowerCase();


            const matchKeyword =

                productName.includes(keyword) ||

                productCategory.includes(keyword) ||

                productDescription.includes(keyword);


            const matchCategory =

                currentFilter === "all" ||

                product.category === currentFilter;


            return matchKeyword && matchCategory;

        });


    displayProducts(filtered);

}


/*==========================
Display Products
==========================*/

function displayProducts(items) {

    const results =
        document.getElementById("searchResults");


    if (!results) {

        console.error(
            "searchResults element not found."
        );

        return;

    }


    results.innerHTML = "";


    /*==========================
    No Results
    ==========================*/

    if (items.length === 0) {

        results.innerHTML = `

            <div class="col-12 text-center py-5">

                <h3>
                    No Products Found
                </h3>

                <p>
                    Try another keyword or category.
                </p>

            </div>

        `;

        return;

    }


    /*==========================
    Product Cards
    ==========================*/

    items.forEach(product => {

        results.innerHTML += `

            <div class="col-lg-3 col-md-6 mb-4">

                <div class="product-card">

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                        class="img-fluid"
                    >

                    <div class="product-body">

                        <div class="product-category">

                            ${product.category}

                        </div>


                        <h4>

                            ${product.name}

                        </h4>


                        <div class="product-rating">

                            ⭐ ${product.rating || 0}/5

                        </div>


                        <div class="product-price">

                            ₹${Number(product.price)
                                .toLocaleString("en-IN")}

                        </div>


                        <a
                            href="product.html?id=${product.id}"
                            class="btn btn-gold mt-3 w-100"
                        >

                            View Product

                        </a>

                    </div>

                </div>

            </div>

        `;

    });

}