const productDOM = document.querySelector('.product');
const url = 'https://course-api.com/javascript-store-single-product';



// functions:
// this function fetch/get and return the data. It also handle the loading and the error
const fetchProduct = async()=>{
    try {
        //loader
        productDOM.innerHTML = `<h4 class="product-loading">Loading...</h4>`;

        // let's user 'window.location.search' to search the id property 
        // console.log(window.location.search)
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');
       
        // fetch & data
        const res = await fetch(`${url}?id=${id}`);
        const data = await res.json();
        return data;
    } catch (error) {
         productDOM.innerHTML = `<p class="error">Produit Indisponible </p>`;
    }
}

// this function take care of rendering the products on the screen
const displayProduct = (product)=>{
    // let's fetch: company, description, name: title, price & image (url: img)
    const {
        company, 
        colors, 
        description, 
        name: title, 
        price, 
        image
    } = product.fields;
    const {url: img} = image[0];
    document.title = title.toUpperCase();

    // colors
    const colorsList = colors.map((color)=>{
        return `
        <span class="product-color" style="background: ${color}"></span>
        `;
    }).join('');

    productDOM.innerHTML = `
    <div class="product-wrapper">
    <img src="${img}" alt="${title}" class="img">
    <div class="product-info">
        <h3>${title}</h3>
        <h5>${company}</h5>
        <span>€${price / 100}</span>
        <div class="colors">${colorsList}</div>
        <p> ${description}</p>
        <button class="btn">Ajouter dans le Panier</button>
    </div>
</div>
    `;
}

// this function fetched the data and pass it to display projducts
const start = async()=>{
     const data = await fetchProduct();
     displayProduct(data)
}
start()