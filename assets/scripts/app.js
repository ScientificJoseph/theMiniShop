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

class ElementAttribute {
    constructor(attrName, attrValue) { // store data recieved in properties
        this.name = attrName;
        this.value = attrValue
    }
}

class Component { // created to output diferent components of web page
    constructor(renderHookId, shouldRender = true) { // receives hrenderHookId from super constructor
        this.hookId = renderHookId // property to store renderHookId
        if (shouldRender) {
            this.render() // used to call the render method in the object instance being created
    }
}

    render() {

    }

    createRootElement(tag, cssClasses, attributes) { // attributes expected to be an array of objects created from ElementaAtribute
        const rootElement = document.createElement(tag)
        if (cssClasses) {
            rootElement.className = cssClasses;
        }
        if(attributes && attributes.length > 0) {
            for (const attr of attributes) {
                rootElement.setAttribute(attr.name, attr.value); // used to set attributes on root element
            }
        }
        document.getElementById(this.hookId).append(rootElement) // appends the created rootElement to the id of the element that it will be rendered with
        console.log(this.hookId, rootElement)
        
        return rootElement; //returns created element to the method that called it which sets it's innerHTML
    }
}

class ShoppingCart extends Component { // template for object that holds props and methods for cart
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

    constructor(renderHookId) { // gets called and receives renderHookId on instantiation
        super(renderHookId, false); // calls and passes renderHookId to the constructor in the parent class (Compnent)
        this.orderProducts = () => {
            console.log('Ordering...')
            console.log(this.items)  
       }
       this.render()
    }

    addProduct(product) { // recieves product from method call in App
        const updatedItems = [...this.items]; // copies items array
        updatedItems.push(product) //receives product from addProduct
        this.cartItems = updatedItems; // triggers cartItems and provides product objects cartItems setter
    }

    // orderProducts() {
    //   console.log('Ordering...')
    //   console.log(this.items)  
    // }

    render() { 
        const cartEl = this.createRootElement('section', 'cart') //function used to set the innerHTML of the created Element section. this refers to Component
        cartEl.innerHTML = `
            <h2>\$${0}</h2>
            <button>Order Now!</button>
        `;
        const orderButton = cartEl.querySelector('button');
        // orderButton.addEventListener('click', () => this.orderProducts())
        orderButton.addEventListener('click', this.orderProducts)
        this.totalOutput = cartEl.querySelector('h2') //property added to ShoppingCart Class and instances. Store reference to h2 element
    }
}

class ProductItem extends Component { //used to apply html to the properties received below when productItem is instantiated
    constructor(product, renderHookId) { // receives objects from product array and ul hookId when productItem is intantiated
        super(renderHookId, false) // passes ul hookId prod-list to Component for li to append to. false pased to component so the render method can be called localy
        this.product = product // refers to the respected 2 objects that instantiated ProductItem
        this.render()
    }

    addToCart() { //function triggered by addCartButton used to tally item totals dispayed in cart
        App.addProductToCart(this.product) // call addProducttoCart in App class and passes product to it
    }

    render() {
        const prodEl = this.createRootElement('li', 'product-item') //function used to set the innerHTML of the created Element li. this refers to Component
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
    }
}

class ProductList extends Component { // used to build the objects that hold the props and methods used that append the product cards to the ul and app hook
    products = []; // Product instanace properties initialized with arguments/values passed tp Product class below 

    constructor(renderHookId) {
        super(renderHookId) //calls Component and passes app hookId app to Component for ul to append to
        this.fetchProducts(); // fields created after call to super constuctor
    }

    fetchProducts() {
        this.products = [ // get created after super is executed
            new Product('A Pillow', 'http://tiny.cc/en48vz', 'The Pillow Of Manifestation', 9.99), //pases arguments to Product constructor to build instance of Product
            new Product('A Rug', 'http://tiny.cc/co48vz', 'Like Walking On A cloud', 89.99)
        ]
        this.renderProducts()
    }

    renderProducts() {
        for (const prod of this.products){ // iterates through products array returning objects to prod
            new ProductItem(prod, 'prod-list') // instantiates productItem with objects (prod) in products array. passes prod-list to constructor 
        }

    }

    render() {
        this.createRootElement('ul', 'product-list', [new ElementAttribute('id', 'prod-list')]);
        if (this.products && this.products.length > 0) { //fales on first pass. fetchProducts is then executed
            this.renderProducts()
        }
    }
}

class Shop extends Component{ // created to build the template that combines the properties and methods used to render the ShoppingCart and Products to the web page
    constructor(){
        super(); // used to call render method
        //can use this.render here as nothing else is needed from Component
    }
    render() {       
        this.cart = new ShoppingCart('app') // instance of ShoppingCart created (shop). Becomes a porperty of Shop. Pass app hook to constructor in ShoppingCart
        new ProductList('app') // instance of ProductList created. Pass app hook to constructor inProductList. rendermetjod in ProductList is called during instantiation
    }
}

class App { // created to hold overall app and allow classes to share data. props and methods operate directly on the class, not an instance therfore methods can be called globally
    static cart;

    static init() {
        const shop = new Shop() // instantiates shop
        // shop.render() //calls render method in shop instance of Shop
        this.cart = shop.cart // access to ShoopinCart instance cart (has the method addProduct) in Shop class by referring to property on shop      
    }

    static addProductToCart(product) { // gets called in ProductItem class and receives product argument 
        this.cart.addProduct(product) // receives product from the call to addProductToCart from instance of ProductItem and passes product to addProduct method in cart instance of ShoppingCart
    }
}

App.init() // calls App to execute init method







