/*==================================================
BENGALURU GEMS
ADMIN PANEL
==================================================*/

let adminProducts =
JSON.parse(
localStorage.getItem("adminProducts")
) || [...products];

/*==========================
DOM Ready
==========================*/

document.addEventListener(

"DOMContentLoaded",

function(){

loadDashboard();

loadProducts();

document.getElementById(

"searchProduct"

).addEventListener(

"keyup",

searchProducts

);

document.getElementById(

"saveProduct"

).addEventListener(

"click",

saveProduct

);

}

);

/*==========================
Dashboard
==========================*/

function loadDashboard(){

document.getElementById(

"productCount"

).textContent=

adminProducts.length;

const orders=

JSON.parse(

localStorage.getItem(

"orders"

)

)||[];

document.getElementById(

"orderCount"

).textContent=

orders.length;

const wishlist=

JSON.parse(

localStorage.getItem(

"wishlist"

)

)||[];

document.getElementById(

"wishlistCount"

).textContent=

wishlist.length;

document.getElementById(

"customerCount"

).textContent=

orders.length;

}

/*==========================
Load Products
==========================*/

function loadProducts(){

const table=

document.getElementById(

"productTable"

);

table.innerHTML="";

adminProducts.forEach(

function(product,index){

table.innerHTML+=`

<tr>

<td>${product.id}</td>

<td>

<img
src="${product.image}"
style="width:70px;height:70px;object-fit:cover;">

</td>

<td>${product.name}</td>

<td>${product.category}</td>

<td>₹${product.price.toLocaleString("en-IN")}</td>

<td>${product.rating}</td>

<td>

${product.stock?"In Stock":"Out"}

</td>

<td>

<button
class="btn btn-primary btn-sm"
onclick="editProduct(${index})">

<i class="bi bi-pencil"></i>

</button>

<button
class="btn btn-danger btn-sm"
onclick="deleteProduct(${index})">

<i class="bi bi-trash"></i>

</button>

</td>

</tr>

`;

}

);

}

/*==========================
Search
==========================*/

function searchProducts(){

const keyword=

document.getElementById(

"searchProduct"

).value.toLowerCase();

const rows=

document.querySelectorAll(

"#productTable tr"

);

rows.forEach(function(row){

if(

row.innerText.toLowerCase().includes(

keyword

)

){

row.style.display="";

}

else{

row.style.display="none";

}

});

}

/*==========================
Save Product
==========================*/

function saveProduct(){

const product={

id:adminProducts.length+1,

name:

document.getElementById(

"productName"

).value,

category:

document.getElementById(

"productCategory"

).value,

price:Number(

document.getElementById(

"productPrice"

).value

),

rating:Number(

document.getElementById(

"productRating"

).value

),

image:

document.getElementById(

"productImage"

).value,

stock:

document.getElementById(

"productStock"

).value==="true",

description:

document.getElementById(

"productDescription"

).value

};

adminProducts.push(product);

localStorage.setItem(

"adminProducts",

JSON.stringify(adminProducts)

);

bootstrap.Modal.getInstance(

document.getElementById(

"productModal"

)

).hide();

loadProducts();

loadDashboard();

clearForm();

alert("Product Added Successfully");

}

/*==========================
Delete Product
==========================*/

function deleteProduct(index){

if(

confirm(

"Delete this product?"

)

){

adminProducts.splice(index,1);

localStorage.setItem(

"adminProducts",

JSON.stringify(adminProducts)

);

loadProducts();

loadDashboard();

}

}

/*==========================
Edit Product
==========================*/

function editProduct(index){

const product=

adminProducts[index];

document.getElementById(

"productName"

).value=

product.name;

document.getElementById(

"productCategory"

).value=

product.category;

document.getElementById(

"productPrice"

).value=

product.price;

document.getElementById(

"productRating"

).value=

product.rating;

document.getElementById(

"productImage"

).value=

product.image;

document.getElementById(

"productStock"

).value=

product.stock;

document.getElementById(

"productDescription"

).value=

product.description;

adminProducts.splice(index,1);

bootstrap.Modal.getOrCreateInstance(

document.getElementById(

"productModal"

)

).show();

}

/*==========================
Clear Form
==========================*/

function clearForm(){

document.getElementById(

"productName"

).value="";

document.getElementById(

"productCategory"

).selectedIndex=0;

document.getElementById(

"productPrice"

).value="";

document.getElementById(

"productRating"

).value="";

document.getElementById(

"productImage"

).value="";

document.getElementById(

"productDescription"

).value="";

document.getElementById(

"productStock"

).selectedIndex=0;

}