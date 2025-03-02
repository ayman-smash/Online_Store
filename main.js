fetch("https://dummyjson.com/products?limit=15&skip=0")
.then((result) => {
    // console.log(result);
    let myData = result.json();
    // console.log(myData);
    return myData;
})

.then ((item) => {

    let productsArr =Array.from(item.products);
    // console.log(productsArr.length);
    

    for (let i = 0; i < productsArr.length; i++) {

        let myImage = document.querySelector(`#img-${i+1}`);
        let myTitle = document.querySelector(`#title-${i+1}`);
        let myPrice = document.querySelector(`#price-${i+1}`);
        let myRating = document.querySelector(`#rating-${i+1}`);
        

        let allLis = document.querySelectorAll(`#stars-${i+1} li i`);
        let arrOfAllLis = Array.from(allLis);
        // console.log(arrOfAllLis);
        let rates = Math.round(item.products[i].rating);
        arrOfAllLis.forEach(function (ele, index) {
            // console.log(index);
            if (index < rates) {
                ele.classList.add("active");
            }
        });
        
        myImage.src = item.products[i].thumbnail;
        myTitle.innerHTML = item.products[i].title;
        myPrice.innerHTML = `${item.products[i].price} $`;
        myRating.innerHTML = `Average Rating: ${item.products[i].rating}`;

    }

});



let url = "https://dummyjson.com/products";
let limit = 15;
let skip = 0;


let cardIndex = 15;
let imgIndex = 15;
let infoIndex = 15;
let titleIndex = 15;
let priceIndex = 15;
let UlIndex = 15;
let ratingIndex = 15;



// window.onscroll = function () {
//     if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
//         skip += limit;
//         fetchData();
//     };
// };

window.onscroll = function () {
    if (window.scrollY + window.innerHeight >= document.body.offsetHeight * 0.8) {
        skip += limit;
        fetchData();
    }
};


function fetchData () {
    fetch(`${url}?limit=${limit}&skip=${skip}`)
    .then((response) => {
        // console.log(response);
        let data = response.json();
        // console.log(data);
        return data;
    })

    .then((card) => {

        let productsListArr =Array.from(card.products);
        // console.log(productsListArr);

        for (let j = 0; j < productsListArr.length; j++) {

            // create card div
            let marketContent = document.querySelector(".market-content");

            let cardDiv = document.createElement("div");
            cardDiv.classList.add("card");
            cardDiv.classList.add(`card-${cardIndex + 1}`);
            marketContent.appendChild(cardDiv);
            cardIndex++;
            

            let newImage = document.createElement("img");
            newImage.classList.add("img");
            newImage.classList.add(`img-${imgIndex + 1}`);
            newImage.src = card.products[j].thumbnail;
            cardDiv.appendChild(newImage);
            imgIndex++;


            let infoDiv = document.createElement("div");
            infoDiv.classList.add("info");
            infoDiv.classList.add(`info-${infoIndex + 1}`);
            cardDiv.appendChild(infoDiv);
            infoIndex++;

            
            let myH3 = document.createElement("h3");
            myH3.classList.add("title");
            myH3.classList.add(`title-${titleIndex + 1}`);
            myH3.innerHTML = card.products[j].title;
            infoDiv.appendChild(myH3);
            titleIndex++;


            let pricePara = document.createElement("p");
            pricePara.classList.add("price");
            pricePara.classList.add(`pricePara-${priceIndex + 1}`);
            pricePara.innerHTML = `${card.products[j].price} $`;
            infoDiv.appendChild(pricePara);
            priceIndex++;


            let myUl = document.createElement("ul");
            myUl.classList.add(`stars-${UlIndex + 1}`);
            infoDiv.appendChild(myUl);
            UlIndex++


            let myLiOne = document.createElement("li");
            myLiOne.innerHTML = `<i class="fa-solid fa-star"></i>`;
            myUl.appendChild(myLiOne);

            let myLiTwo = document.createElement("li");
            myLiTwo.innerHTML = `<i class="fa-solid fa-star"></i>`;
            myUl.appendChild(myLiTwo);
            
            let myLiThree = document.createElement("li");
            myLiThree.innerHTML = `<i class="fa-solid fa-star"></i>`;
            myUl.appendChild(myLiThree);

            let myLiFour = document.createElement("li");
            myLiFour.innerHTML = `<i class="fa-solid fa-star"></i>`;
            myUl.appendChild(myLiFour);

            let myLiFive = document.createElement("li");
            myLiFive.innerHTML = `<i class="fa-solid fa-star"></i>`;
            myUl.appendChild(myLiFive);


            
            let myLis = document.querySelectorAll(`.stars-${UlIndex} li i`);
            let myArr = Array.from(myLis);
            // console.log(myLis);
            let myRates = Math.round(card.products[j].rating);
            myArr.forEach(function (ele, index) {
                // console.log(index);
                if (index < myRates) {
                    ele.classList.add("active");
                }
            });




            let ratingPara = document.createElement("p");
            ratingPara.classList.add("rating");
            ratingPara.classList.add(`rating-${ratingIndex + 1}`);
            ratingPara.innerHTML = `Average Rating: ${card.products[j].rating}`;
            infoDiv.appendChild(ratingPara);
            ratingIndex++;



            
            let myButton = document.createElement("button");
            myButton.innerHTML = `ADD TO CART`;
            infoDiv.appendChild(myButton);
            


        }

    })
};
