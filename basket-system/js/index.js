let carts = document.querySelectorAll(".add-cart");

let products = [
    {
        name: "Hanging Flower",
        tag: 'flower_1',
        price: 9.99 + "$",
        inCart : 0
    },
    {
        name: "Basic Plant",
        tag: 'flower_2',
        price: 9.99 + "$",
        inCart : 0
    },
    {
        name: "Branched Plant",
        tag: 'flower_3',
        price: 9.99 + "$",
        inCart : 0
    }
]
for(let i=0; i<carts.length; i++){
    carts[i].addEventListener("click", ()=>{
        cartCounts(products[i]);
        totalCost(products[i]);
    })
}
// let removeBtn = document.querySelector(".close-icon")
// removeBtn.addEventListener("click",()=>{
//     Storage.removeItem(removeBtn);
// })

function onLoadCartCounts(){
    let productCount = localStorage.getItem('cartCounts');
    if (productCount) {
        document.querySelector(".basket-part span").textContent = productCount;
    }
}

function cartCounts(product) {
    let productCount = localStorage.getItem('cartCounts');
    productCount = parseInt(productCount);
    if (productCount ) {
        localStorage.setItem('cartCounts', productCount + 1);
        document.querySelector(".basket-part span").textContent = productCount + 1;
    }
    else{
        localStorage.setItem('cartCounts', 1);
        document.querySelector(".basket-part span").textContent = 1;
    }
    setItems(product);
}

function setItems(product){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    if (cartItems != null) {
        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart +=1;
    }
    else{
        product.inCart = 1;
         cartItems = {
            [product.tag] : product
        }
    }
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}


function totalCost(product){
    let cartCost = localStorage.getItem("totalCost");
    
    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost",cartCost+ product.price)
    }
    else{
        localStorage.setItem("totalCost", product.price);
    }
}

function displayCart(){
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    if (cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item =>{
            productContainer.innerHTML += `
            <div class="image d-flex align-items-center justify-content-between">
            <div class="close-icon"><i class="far fa-times-circle"></i></div>
                    <div class="image-item mx-2">
                    <img class= "new-images" src="assets/images/${item.tag}.jpg">
                    </div>
                    
                    <div class="my-name">${item.name}</div>
                    <div class="price mx-3">${"$" + item.price}</div>
                    <div class="quantity">
                    <span>${item.inCart}</span>
                    </div>
                    <div class="total">${"$" + item.inCart * item.price }</div>
            </div>
            `
        });
    }
}

onLoadCartCounts();
displayCart();