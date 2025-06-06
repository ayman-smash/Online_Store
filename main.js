
let url = "https://dummyjson.com/products";
let limit = 0;
let skip = 0;

let selectedValue = ''; 

function fetchData () {
    fetch(`${url}?limit=${limit}&skip=${skip}`)
    .then((response) => response.json())
    .then((data) => {

        let reloadCart = JSON.parse(localStorage.getItem('cart')) || [];

        let marketContent = document.querySelector(".market-content");

        function renderProducts(products) {
            marketContent.innerHTML = "";

            products.forEach((item) => {

                let isInCart = reloadCart.some(cartItem => cartItem.id === item.id);

                let cardDiv = document.createElement("div");
                cardDiv.classList.add("card");
                marketContent.appendChild(cardDiv);

                let newImage = document.createElement("img");
                newImage.classList.add("img");
                newImage.src = item.thumbnail;
                cardDiv.appendChild(newImage);

                let infoDiv = document.createElement("div");
                infoDiv.classList.add("info");
                cardDiv.appendChild(infoDiv);

                let myH3 = document.createElement("h3");
                myH3.classList.add("title");
                myH3.innerHTML = item.title;
                infoDiv.appendChild(myH3);

                let pricePara = document.createElement("p");
                pricePara.classList.add("price");
                pricePara.innerHTML = `${item.price} $`;
                infoDiv.appendChild(pricePara);

                let myUl = document.createElement("ul");
                myUl.classList.add("stars");
                infoDiv.appendChild(myUl);

                for (let i = 0; i < 5; i++) {
                    let myLi = document.createElement("li");
                    myLi.innerHTML = `<i class="fa-solid fa-star"></i>`;
                    myUl.appendChild(myLi);
                }

                let stars = myUl.children;
                let myRating = Math.round(item.rating);

                for (let i = 0; i < myRating; i++) {
                    stars[i].children[0].classList.add("active");
                };

                let ratingPara = document.createElement("p");
                ratingPara.classList.add("rating");
                ratingPara.innerHTML = `Average Rating: ${item.rating}`;
                infoDiv.appendChild(ratingPara);

                let myButton = document.createElement("button");
                myButton.innerHTML = `ADD TO CART`;
                if (isInCart) {
                    myButton.classList.add('active-btn');
                    myButton.innerHTML = `ITEM IN CART`;
                };
                myButton.setAttribute('data-id', `${item.id}`);
                infoDiv.appendChild(myButton);
            });

            let addToCartButton = document.querySelectorAll(".card button");
            addToCartButton.forEach(button => {
                button.addEventListener("click", (event) => {
                    let productId = event.target.getAttribute("data-id");
                    let selectedProduct = data.products.find(product => product.id == productId);  
                    addToCart(selectedProduct); 

                    let allMatchingButtons = document.querySelectorAll(`.card button[data-id="${productId}"]`);
                    allMatchingButtons.forEach(btnClicked => {
                        btnClicked.classList.add("active-btn");
                        btnClicked.innerHTML = `ITEM IN CART`;
                    })
                })
            })
        }

        renderProducts(data.products.sort((a, b) => a.title.localeCompare(b.title)));

        let sortingList = document.getElementById("sort-by");
        sortingList.addEventListener('change', (e) => {
            let selectedValue = e.target.value;

            let sortedProducts;
            if (selectedValue === 'a-z') {
                sortedProducts = data.products.sort((a, b) => a.title.localeCompare(b.title));
            } else if (selectedValue === 'z-a') {
                sortedProducts = data.products.sort((a, b) => b.title.localeCompare(a.title));
            } else if (selectedValue === 'l-h') {
                sortedProducts = data.products.sort((a, b) => a.price - b.price);
            } else if (selectedValue === 'h-l') {
                sortedProducts = data.products.sort((a, b) => b.price - a.price);
            }
            renderProducts(sortedProducts);
        })
    })
};

fetchData();


var cart = document.querySelector(".cart");

function openCloseCart () {
    cart.classList.toggle("active-cart");
};


function addToCart (product) {
    // console.log(product);

    let cartLs = JSON.parse(localStorage.getItem('cart')) || [];

    cartLs.push({... product , quantity: 1});

    localStorage.setItem('cart' , JSON.stringify(cartLs));

    updateCart();

};


function updateCart () {

    let cartItemsContainer = document.getElementById("cart-items");

    let cartUp = JSON.parse(localStorage.getItem('cart')) || [];


    var totalPrice = 0;
    var totalCount = 0;


    cartItemsContainer.innerHTML = "";
    cartUp.forEach((item , index) => {

        let totalPriceItem = (item.price * item.quantity).toFixed(2);

        totalPrice += parseFloat(totalPriceItem);

        totalCount += item.quantity;


        cartItemsContainer.innerHTML += `
            <div class="item-cart">
                <img src="${item.thumbnail}" alt="">
                <div class="content">
                    <h4>${item.title}</h4>
                    <p class="price-cart">${totalPriceItem} $</p>
                    <div class="quantity-control">
                        <button class="decrease-quantity" data-index="${index}">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="increase-quantity" data-index="${index}">+</button>
                    </div>
                </div>

                <button class="delete-item" data-index="${index}"><i class="fa-solid fa-trash-can"></i></button> 
            </div>
        `
    })



    let priceCartTotal = document.querySelector(".price-cart-total");

    let countItemCart = document.querySelector(".count-item-cart");

    let countItemIcon = document.querySelector(".cart-counter");

    priceCartTotal.innerHTML = `${totalPrice.toFixed(2)} $`;

    countItemCart.innerHTML = totalCount;

    countItemIcon.innerHTML = totalCount;

    if (countItemIcon.innerHTML > 99) {
        countItemIcon.innerHTML = `99+`;
    };





    let increaseButton = document.querySelectorAll(".increase-quantity");
    let decreaseButton = document.querySelectorAll(".decrease-quantity");


    increaseButton.forEach(button => {
        button.addEventListener("click", (event) => {
            let itemIndex = event.target.getAttribute("data-index");
            increaseQuantity(itemIndex);
        })
    });




    decreaseButton.forEach(button => {
        button.addEventListener("click", (event) => {
            let itemIndex = event.target.getAttribute("data-index");
            decreaseQuantity(itemIndex);
        })
    });



    function increaseQuantity (index) {
        let cartI = JSON.parse(localStorage.getItem('cart')) || [];
        cartI[index].quantity += 1;
        localStorage.setItem("cart" , JSON.stringify(cartI));
        updateCart();
    };


    function decreaseQuantity (index) {
        let cartD = JSON.parse(localStorage.getItem('cart')) || [];

        if (cartD[index].quantity > 1) {
            cartD[index].quantity -= 1;
        };

        localStorage.setItem("cart" , JSON.stringify(cartD));
        updateCart();
    };




    let deleteButtons = document.querySelectorAll(".delete-item");

    deleteButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            let itemIndex = event.target.closest("button").getAttribute("data-index");

            removeFromCart(itemIndex);
        })
    })

};



function removeFromCart (index) {
    let cartRemove = JSON.parse(localStorage.getItem('cart')) || [];

    let removeProduct = cartRemove.splice(index , 1)[0];
    localStorage.setItem("cart", JSON.stringify(cartRemove));
    updateCart();
    updateButtonsState(removeProduct.id);
};




function updateButtonsState (productId) {
    let allClickedButtons = document.querySelectorAll(`.card button[data-id="${productId}"]`);

    allClickedButtons.forEach(button => {
        button.classList.remove("active-btn");
        button.innerHTML = `ADD TO CART`;
    })
};



updateCart();