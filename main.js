
let url = "https://dummyjson.com/products";
let limit = 15;
let skip = 0;

let isFetching = false;


function fetchData () {
    fetch(`${url}?limit=${limit}&skip=${skip}`)
    .then((response) => {
        // console.log(response);
        let data = response.json();
        // console.log(data);
        return data;
    })

    .then((card) => {

        isFetching = false;

        let marketContent = document.querySelector(".market-content");

        card.products.forEach((item) => {

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
        pricePara.classList.add("price");;
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


    // color rating stars
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
        infoDiv.appendChild(myButton);
        
    })
    })
};

window.onscroll = function () {
        if (window.scrollY + window.innerHeight >= document.body.offsetHeight * 0.8 && isFetching === false) {
            isFetching = true;
            skip += limit;
            fetchData();
        }
    };


// Initial fetch
fetchData();