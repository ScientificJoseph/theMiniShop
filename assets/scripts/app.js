class Product {
    // title = 'DEFAULT';
    // imageUrl;
    // description;
    // price;

    constructor(title, image, desc, price) { // Builds instane of Product from arguments received
        this.title = title; // properties that are used to create properties for the instances of Product
        this.imageUrl = image;
        this.description = desc;
        this.price = price;
    }
}

class ProductItem {
    constructor(product) { // receives objects from product array when productItem is intantiated
        this.product = product // refers to the object that instantiated ProductItem
    }

    render() {
        const prodEl = document.createElement('li');
        prodEl.className = 'product-item';
        // this refers to the instance calling render() in productitem
        prodEl.innerHTML = `
            <div>
                <img src='${this.product.imageUrl}' alt=${this.product.title}> 
                <div class ='product-item__content'>
                    <h2>${this.product.title}</h2>
                    <h3>\$${this.product.price}</h3>
                    <p>${this.product.description}</p>
                    <button>Add To Cart</button>
                </div>
            </div>
        `; 
        return prodEl; // returns formated product list elements to render call from producItem
    }
}

class ProductList {
    products = [ // instanace properties initialized with arguments below 
        new Product('A Pillow', 'http://tiny.cc/en48vz', 'The Pillow Of Manifestation', 9.99), //pases arguments to Product constructor to build instance of Product
        new Product('A Rug', 'http://tiny.cc/co48vz', 'Like Walking On A cloud', 89.99)
    ];

    constructor() {}

    render() {
        const renderHook = document.getElementById('app');
        const prodList = document.createElement('ul');
        prodList.className = 'product-list';
        for (const prod of this.products){ // iterates through products array returning objects to prod
            const productItem = new ProductItem(prod) // instantiates productItem with objects (prod) in products array 
            const prodEl = productItem.render() // call to render method in product item to format the product cards with the values from pod
            prodList.append(prodEl) // appends the product cards to the ul
        }
        renderHook.append(prodList); // appends the ul to the app hook in the html
    }
}



const productList = new ProductList() // instance of ProductList created
productList.render()


