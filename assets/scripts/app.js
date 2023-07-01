class Product {
    title = 'DEFAULT';
    imageUrl;
    description;
    price;

    constructor(title, image, desc, price) { // Builds instane of Product from arguments received
        this.title = title; // fields that are used to create properties for the instances of Product
        this.imageUrl = image;
        this.description = desc;
        this.price = price;
    }
}


const product = new Product()

const productList = {
        products: [
            new Product('A Pillow', 'http://tiny.cc/en48vz', 'The Pillow Of Manifestation', 9.99), //pases arguments to Product constructor to build instance of Product
            new Product('A Rug', 'http://tiny.cc/co48vz', 'Like Walking On A cloud', 89.99)
    ],
    render() {
        const renderHook = document.getElementById('app');
        const prodList = document.createElement('ul');
        prodList.className = 'product-list';
        for (const prod of this.products){
            const prodEl = document.createElement('li');
            prodEl.className = 'product-item';
            prodEl.innerHTML = `
                <div>
                    <img src='${prod.imageUrl}' alt=${prod.title}>
                    <div class ='product-item__content'>
                        <h2>${prod.title}</h2>
                        <h3>\$${prod.price}</h3>
                        <p>${prod.description}</p>
                        <button>Add To Cart</button>
                    </div>
                </div>
            `;
            prodList.append(prodEl);
        }
        renderHook.append(prodList);
    }
};

productList.render();

