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

class ShoppingCart { // template for object that holds props and methods for cart
    items = [];

    render() {
        const cartEl = document.createElement('section');
        cartEl.innerHTML = `
            <h2>\$${0}</h2>
            <button>Order Now!</button>
        `;
        cartEl.className = 'cart';
        return cartEl;
    }
}

class ProductItem { //used to apply html to the properties received below when productItem is instantiated
    constructor(product) { // receives objects from product array when productItem is intantiated
        this.product = product // refers to the respected 2 objects that instantiated ProductItem
    }

    addToCart() { //function triggered by addCartButton used to tally item totals dispayed in cart
        console.log('Adding Product To Cart...')
        console.log(this.product)
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
        const addCartButton = prodEl.querySelector('button');
        addCartButton.addEventListener('click', this.addToCart.bind(this)) //bind prepares the function to be executed. without bind this refers to button not object
        return prodEl; // returns formated product list elements to render call from producItem
    }
}

class ProductList { // used to build the objects that hold the props and methods used that append the product cards to the ul and app hook
    products = [ // Product instanace properties initialized with arguments/values passed tp Product class below 
        new Product('A Pillow', 'http://tiny.cc/en48vz', 'The Pillow Of Manifestation', 9.99), //pases arguments to Product constructor to build instance of Product
        new Product('A Rug', 'http://tiny.cc/co48vz', 'Like Walking On A cloud', 89.99)
    ];

    constructor() {}

    render() {
   
        const prodList = document.createElement('ul');
        prodList.className = 'product-list';
        for (const prod of this.products){ // iterates through products array returning objects to prod
            const productItem = new ProductItem(prod) // instantiates productItem with objects (prod) in products array 
            const prodEl = productItem.render() // call to render method on instance of productItem to format the product cards with the values from pod
            prodList.append(prodEl) // appends the product cards to the ul
        }
        return prodList;
        // renderHook.append(prodList); // appends the ul to the app hook in the html
    }
}

class Shop { // created to build the template that combines the properties and methods used to render the ShoppingCart and Products to the web page
    render() {
        const renderHook = document.getElementById('app');

        const cart = new ShoppingCart() // instance of ShoppingCart created (shop)
        const cartEl = cart.render() // calss render metod in cart instance that returns the cart Element
        const productList = new ProductList() // instance of ProductList created
        const prodListEl = productList.render() // calls render method in productList instance that returns the product list (ul)

        renderHook.append(cartEl) // appends ShoppingCart to app hook 
        renderHook.append(prodListEl) // appends ProductList cards to app hook

    }
}

const shop = new Shop() // instantiates shop
shop.render() //calls render method in shop instance of Shop




