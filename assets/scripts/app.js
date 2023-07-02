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

    set cartItems(value) { // value is an array of cart items
        this.items = value; // overrides existing items array
        this.totalOutput.innerHTML = `<h2>\$${this.totalAmount.toFixed(2)}</h2>` // calls totalAmount. overwrites previous value in the h2 element in ShoppingCart instance cart
    }

    get totalAmount() { // used to get cart total
        const sum = this.items.reduce((prevValue, curItem) => {
            return prevValue + curItem.price
        },0);
        return sum;
    }

    addProduct(product) { // recieves product from method call in App
        // this.items.push(product) // pushes product on to items array
        const updatedItems = [...this.items]; // copies items array
        updatedItems.push(product) //receives product from addProduct
        this.cartItems = updatedItems; // triggers cartItems and provides product objects cartItems setter
    }

    render() { 
        const cartEl = document.createElement('section');
        cartEl.innerHTML = `
            <h2>\$${0}</h2>
            <button>Order Now!</button>
        `;
        cartEl.className = 'cart';
        this.totalOutput = cartEl.querySelector('h2') //property added to ShoppingCart Class and instances. Store reference to h2 element
        return cartEl;
    }
}

class ProductItem { //used to apply html to the properties received below when productItem is instantiated
    constructor(product) { // receives objects from product array when productItem is intantiated
        this.product = product // refers to the respected 2 objects that instantiated ProductItem
    }

    addToCart() { //function triggered by addCartButton used to tally item totals dispayed in cart
        App.addProductToCart(this.product) // call addProducttoCart in App class and passes product to it
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

        // const cart = new ShoppingCart() // instance of ShoppingCart created (shop)
        this.cart = new ShoppingCart() // instance of ShoppingCart created (shop). Becomes a porperty of Shop
        const cartEl = this.cart.render() // calss render metod in cart instance that returns the cart Element (li)
        const productList = new ProductList() // instance of ProductList created (productList)
        const prodListEl = productList.render() // calls render method in productList instance that returns the product list (ul)

        renderHook.append(cartEl) // appends ShoppingCart to app hook 
        renderHook.append(prodListEl) // appends ProductList cards to app hook

    }
}

class App { // created to hold overall app and allow classes to share data. props and methods operate directly on the class, not an instance therfore methods can be called globally
    static cart;

    static init() {
        const shop = new Shop() // instantiates shop
        shop.render() //calls render method in shop instance of Shop
        this.cart = shop.cart // access to ShoopinCart instance cart (has the method addProduct) in Shop class by referring to property on shop
        
    }

    static addProductToCart(product) { // gets called in ProductItem class and receives product argument 
        this.cart.addProduct(product) // receives product from the call to addProductToCart from instance of ProductItem and passes product to addProduct method in cart instance of ShoppingCart
    }
}

App.init() // calls App to execute init method







