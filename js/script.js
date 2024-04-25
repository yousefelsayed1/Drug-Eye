let productNameInput = document.getElementById("productName");
let productPriceInput = document.getElementById("productPrice");
let productCategoryInput = document.getElementById("productCategory");
let productExpInput = document.getElementById("productExp");
let searchInputInput = document.getElementById("searchInput");
let mainBtn = document.getElementById("main-btn");
let emptyTable = document.getElementById("empty-table");
let productContainer;
let productIndex;

/////local storage checking to display products
if (localStorage.getItem("Productslist") == null) {
    productContainer = [];
    emptyTable.innerHTML = "Enter your products now";
    document.getElementById("table").classList.add("empty");
} else {
    productContainer = JSON.parse(localStorage.getItem("Productslist"))
    displayProduct();
}


/////Adding new product to local storage ,display it in products table and clear form to add new one.
function addProduct() {

    if (formValidation() == true) {
        var product = {
            name: productNameInput.value,
            price: productPriceInput.value,
            category: productCategoryInput.value,
            desc: productExpInput.value
        }
        productContainer.push(product);
        localStorage.setItem("Productslist", JSON.stringify(productContainer))
        displayProduct();
        clearform();
    }

}

function clearform() {
    productName.value = "";
    productPrice.value = "";
    productCategory.value = "";
    productExp.value = "";
}


function displayProduct() {
    var container = ``;
    for (i = 0; i < productContainer.length; i++) {
        container += `<tr>
        <td>${i+1}</td>
        <td>${productContainer[i].name}</td>
        <td>${productContainer[i].price}</td>
        <td>${productContainer[i].category}</td>
        <td>${productContainer[i].desc}</td>
        <td class="phone"><button onclick ="getProduct(${i})" class="btn btn-outline-success">Update</button></td>
        <td class="phone"><button onclick ="DeleteProduct(${i})" class=" btn btn-outline-danger">Delete</button></td>
    </tr>`
    }
    document.getElementById("tableBody").innerHTML = container;
    document.getElementById("table").classList.remove("empty");
    emptyTable.innerHTML = "";

}


////Search product by for loop on productContainer by the term and display it 
searchInputInput.onkeyup = function searchProduct() {
    var term = searchInputInput.value;
    var container = ``;
    for (var i = 0; i < productContainer.length; i++) {
        if (productContainer[i].name.toLowerCase().includes(term.toLowerCase()) == true) {
            container += `<tr>
            <td>${i+1}</td>
            <td>${productContainer[i].name}</td>
            <td>${productContainer[i].price}</td>
            <td>${productContainer[i].category}</td>
            <td>${productContainer[i].desc}</td>
            <td class="phone"><button onclick ="getProduct(${i})" class="btn btn-outline-success">Update</button></td>
            <td class="phone"><button onclick ="DeleteProduct(${i})" class=" btn btn-outline-danger">Delete</button></td>`
        }
    }
    document.getElementById("tableBody").innerHTML = container;
}

////////////Delete Product by splicing it form productContainer 
function DeleteProduct(index) {
    productContainer.splice(index, 1);
    localStorage.setItem("Productslist", JSON.stringify(productContainer));
    displayProduct();
}


/////update Product
//getting product and display it in the form
function getProduct(index) {
    var currentProducts = productContainer[index]
    productNameInput.value = currentProducts.name;
    productCategoryInput.value = currentProducts.category;
    productPriceInput.value = currentProducts.price;
    productExpInput.value = currentProducts.desc;

    mainBtn.innerHTML = "Update";
    productIndex = index;
}
///update product by setting new values after validation
function updateProduct() {
    if (formValidation() == true) {
        var product = {
            name: productNameInput.value,
            price: productPriceInput.value,
            category: productCategoryInput.value,
            desc: productExpInput.value
        }
        productContainer[productIndex] = product;
        localStorage.setItem("Productslist", JSON.stringify(productContainer));
        mainBtn.innerHTML = "Add product";
        clearform();
    }
}

mainBtn.onclick = function() {
    if (mainBtn.innerHTML == "Add product") {
        addProduct();
    } else {
        updateProduct();
    }
    displayProduct();
}

////////////Validation///////////////

function validateProductName() {
    let regex = /^[a-zA-Z]{3,30}\s?[0-9\\A-Z\sa-z]{0,30}$/;
    let nameError = document.getElementById("name-error");
    if (productNameInput.value.length == 0) {
        nameError.innerHTML = "name is required";
        return false;
    }
    if (!productNameInput.value.match(regex)) {
        nameError.innerHTML = "Invalid name";
        return false;
    }
    nameError.innerHTML = `<i class="fa fa-check-circle"></i>`;
    return true;
}

function validateProductPrice() {
    let regex = /[0-9]+([\,|\.]{0,1}[0-9]{2}){0,1}$/
    let priceError = document.getElementById("price-error");
    if (productPriceInput.value.length == 0) {
        priceError.innerHTML = "price is required";
        return false;
    }
    if (!productPriceInput.value.match(regex)) {
        priceError.innerHTML = "Invalid price";
        return false;
    }
    priceError.innerHTML = `<i class="fa fa-check-circle"></i>`;
    return true;
}

function validateProductCategory() {
    var regex = /^[A-Z\sa-z]{3,30}$/;
    let categError = document.getElementById("categ-error");
    if (productCategoryInput.value.length == 0) {
        categError.innerHTML = "category is required";
        return false;
    }
    if (!productCategoryInput.value.match(regex)) {
        categError.innerHTML = "Invalid category";
        return false;
    }
    categError.innerHTML = `<i class="fa fa-check-circle"></i>`;
    return true;
}

function formValidation() {
    let submitError = document.getElementById("submit-error");
    if (!validateProductName() || !validateProductPrice() || !validateProductCategory()) {
        submitError.style.display = "block";
        submitError.innerHTML = "please fix Errors to submit";
        setTimeout(function() { submitError.style.display = "none"; }, 3000);
        return false;
    }
    return true;
}