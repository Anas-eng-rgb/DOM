const productName = document.getElementById('productName');
const productCategory = document.getElementById('productCategory');
const productPrice = document.getElementById('productPrice');
const productDiscount = document.getElementById('productDiscount');
const productQuantity = document.getElementById('productQuantity');
const productDescription = document.getElementById('productDescription');
const addProductBtn = document.getElementById('addProductBtn');
const updateProductBtn = document.getElementById('updateProductBtn')
const showData = document.getElementById('showData');
const inputSearch = document.getElementById('inputSearch');
let productContainer = [];


//Display Data From Local Storage
if(localStorage.getItem('products')) {
  productContainer = JSON.parse(localStorage.getItem('products'));
  displayProduct();
}

//Start Add Product Logic
function addProduct() {
  if(checkProductName()) {
  const product = {
    name: productName.value,
    category: productCategory.value,
    price: productPrice.value,
    discount: productDiscount.value,
    quantity: productQuantity.value,
    description: productDescription.value,
  }
  productContainer.push(product);
  localStorage.setItem('products' , JSON.stringify(productContainer));
  displayProduct();
  clearInputs();
 }
 else {
  alert('Sorry');
 }
}


addProductBtn.addEventListener('click' , addProduct);


//Display Products
function displayProduct() {
  let display = ``;
  for (let i = 0 ; i < productContainer.length ; i++) {
    display += `
    <tr>
      <td>${productContainer[i].name}</td>
      <td>${productContainer[i].category}</td>
      <td>${productContainer[i].price}</td>
      <td>${productContainer[i].discount}</td>
      <td>${productContainer[i].quantity}</td>
      <td>${productContainer[i].description}</td>
      <td>
          <button onclick='setForm(${i})' class="btn btn-success"><i class="fa-solid fa-pen-to-square"></i></button>
      </td>
      <td>
          <button onclick='deleteProduct(${i})' class="btn btn-danger"><i class="fa-solid fa-delete-left"></i></button>
      </td>
    </tr>
    `
  }
  document.getElementById('showData').innerHTML = display;
}



//Remove Products 
function deleteProduct(productIndex) {
  productContainer.splice(productIndex , 1);
  localStorage.setItem('products' , JSON.stringify(productContainer));
  displayProduct();
}


//Clear Products 
function clearInputs() {
  productName.value = '';
  productCategory.value = '';
  productPrice.value = '';
  productDiscount.value = '';
  productQuantity.value = '';
  productDescription.value = '';
}



//Search Products 
function searchProduct(term) {
  let display = ``;
  for (let i = 0 ; i < productContainer.length ; i++) {
    if(productContainer[i].name.toLowerCase().includes(term.toLowerCase())) {
      display += `
    <tr>
      <td>${productContainer[i].name}</td>
      <td>${productContainer[i].category}</td>
      <td>${productContainer[i].price}</td>
      <td>${productContainer[i].discount}</td>
      <td>${productContainer[i].quantity}</td>
      <td>${productContainer[i].description}</td>
      <td>
          <button class="btn btn-success"><i class="fa-solid fa-pen-to-square"></i></button>
      </td>
      <td>
          <button onclick='deleteProduct(${i})' class="btn btn-danger"><i class="fa-solid fa-delete-left"></i></button>
      </td>
    </tr>
    `}
  }
  document.getElementById('showData').innerHTML = display;
}


inputSearch.addEventListener('input' , () => {
  searchProduct(inputSearch.value);
});



//Set Form 
let x = 0;
function setForm(productIndex) {
  x = productIndex;
  productName.value = productContainer[productIndex].name;
  productCategory.value = productContainer[productIndex].category;
  productPrice.value = productContainer[productIndex].price;
  productDiscount.value = productContainer[productIndex].discount;
  productQuantity.value = productContainer[productIndex].quantity;
  productDescription.value = productContainer[productIndex].description;
  addProductBtn.classList.add('d-none');
  updateProductBtn.classList.remove('d-none');
}



//Update Products 
function updateProducts() {
  productContainer[x].name = productName.value;
  productContainer[x].category = productCategory.value;
  productContainer[x].price = productPrice.value;
  productContainer[x].discount = productDiscount.value;
  productContainer[x].quantity = productQuantity.value;
  productContainer[x].description = productDescription.value;
  addProductBtn.classList.remove('d-none');
  updateProductBtn.classList.add('d-none');
  localStorage.setItem('products' , JSON.stringify(productContainer));
  displayProduct();
  clearInputs();
}

updateProductBtn.addEventListener('click' , updateProducts)


//Regex 
function checkProductName() {
  let regex = /^\w{4,15}$/;
  if(regex.test(productName.value)) {
    return true;
  }
  else {
    return false;
  }
}