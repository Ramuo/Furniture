const url = 'https://course-api.com/javascript-store-products';

const productsDOM = document.querySelector('.products-center');


// functions:

// this function fetch/get and return the data. It also handle the loading and the error
const fetchProducts = async()=>{
    productsDOM.innerHTML = `<div class="loading"></div>`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        return data;
        
    } catch (error) {
        productsDOM.innerHTML = `<p class="error">there was an error</p>`;
    }
}

// this function take care of rendering the products on the screen
const displayProducts = (list)=>{
    const productList = list.map((product)=>{
        const {id} = product;
        const {name: title, price} = product.fields;
        const {url:img}= product.fields.image[0];
        const formatPrice = price / 100;
        //we will pullout from data: id; image, name, title & price.
        return `
        <a class="single-product" href="product.html?id=${id}">
        <img src="${img}" alt="${title}" class="single-product-img img">
        <footer>
          <h5 class="name">${title}</h5>
          <span class="price">€${formatPrice}</span>
        </footer>
      </a>
        `; 
    }).join('');
    productsDOM.innerHTML = `<div class="products-container">
        ${productList}
    </div>`;
}

// this function fetched the data and pass it to display projducts
const start = async ()=>{
    const data = await fetchProducts();
    displayProducts(data)
}

start();

// Event listerners:
