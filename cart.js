
class Product {
    constructor(code, description, price) {
        this.code = code;
        this.description = description;
        this.price = price;
    }
}

class PricingRules {
    constructor(products, promotions, promoCodes) {
        this.products = products;
        this.promotions = promotions;
        this.promoCodes = promoCodes;
    }
}

class ShoppingCart {
    constructor(pricingRules) {
        this.products = pricingRules.products;
        this.promotions = pricingRules.promotions;
        this.promoCodes = new Map(pricingRules.promoCodes);
        this.itemsAdded = new Map([
            ["ult_small", 0],
            ["ult_medium", 0],
            ["ult_large", 0],
            ["1gb", 0],
        ]);
        
        this.itemsExpected = new Map([
            ["ult_small", 0],
            ["ult_medium", 0],
            ["ult_large", 0],
            ["1gb", 0],
        ]);
    }

    // Static method to create a new instance 
    static new(pricingRules) { 
        return new ShoppingCart(pricingRules);
    } 

     addItem(item) {
        // increment count of items
        this.itemsAdded.set(item, this.itemsAdded.get(item) + 1);
        this.itemsExpected.set(item, this.itemsExpected.get(item) + 1);
     }
     
     getItemsAdded() {
         console.log("======= Items Added ==========");
         for (let [item, quantity] of this.itemsAdded) {
            console.log(`${item} - ${quantity}`);
         }
         console.log("==============================\n");
     }
     
     getItemsExpected() {
         console.log("======= Items Expected =======");
         for (let [item, quantity] of this.itemsExpected) {
            console.log(`${item} - ${quantity}`);
         }
         console.log("==============================\n");
     }
     
     calculateTotal(promoCode = null) {
         let total = 0;
         
         for (let product of this.products) {
             const productCode = product.code;
             const productPrice = product.price;
             var promoRecord = this.promotions.find(promotion => promotion.productCode === product.code);

            if (promoRecord != null) {
                const promoName = promoRecord.promoName;
                
                if (promoName === "XforY") {
                    const X = promoRecord.X;
                    const Y = promoRecord.Y;

                    if (this.itemsAdded.get(productCode) >= X) {
            const freeItemCount = Math.floor(this.itemsAdded.get(productCode) / Y) * (X - Y);
             
            total += ((this.itemsAdded.get(productCode) - freeItemCount) * productPrice);
         } else {
            total += (this.itemsAdded.get(productCode) * productPrice); 
         }
                }
                
                if (promoName === "freeItem") {
                    const freeItemCode = promoRecord.freeItemCode;

                    // Add free item to item expected list
                    this.itemsExpected.set(freeItemCode, this.itemsExpected.get(freeItemCode) 
                        + this.itemsAdded.get(productCode)); 
                    
                    total += (this.itemsAdded.get(productCode) * productPrice);
                }
                
                if (promoName === "bulkDiscount") {
                    const promoQuantity = promoRecord.promoQuantity;
                    const discountedPrice = promoRecord.discountedPrice;
                if (this.itemsAdded.get(productCode) >= promoQuantity) {
                    total += (this.itemsAdded.get(productCode) * discountedPrice); 
                    
                } else {
                    total += (this.itemsAdded.get(productCode) * productPrice);
                }
            }
         } else {
             // item is not part of a promotion
             total += (this.itemsAdded.get(productCode) * productPrice);
         }
     }
     
     if (promoCode != null) {
            if (this.promoCodes.has(promoCode)) {
                total *= (1 - this.promoCodes.get(promoCode));
                console.log(`Promo Code Applied: ${promoCode}`);
            }
        }
        
        console.log(`Total\t $${total.toFixed(2)}\n`);
  }

};

const products = [
new Product('ult_small', 'Unlimited 1GB', 24.90),
new Product('ult_medium', 'Unlimited 2GB', 29.90),
new Product('ult_large', 'Unlimited 5GB', 44.90),
new Product('1gb', '1 GB Data-pack', 9.90)
];

const promotions = [
    { promoName: 'XforY', productCode: 'ult_small', X: 3, Y: 2 }, // Get X items Pay for price of Y items only (assuming X is always greater than Y)
    { promoName: 'freeItem', productCode: 'ult_medium', freeItemCode: '1gb' }, 
    { promoName: 'bulkDiscount', productCode: 'ult_large', promoQuantity: 4, discountedPrice: 39.9 }
];

promoCodes = new Map([
    ['I<3AMAYSIM', 0.1]
]);

const pricingRules = new PricingRules(products, promotions, promoCodes);
let cart = ShoppingCart.new(pricingRules);

// Scenario #1
cart.addItem("ult_small");
cart.addItem("ult_small");
cart.addItem("ult_small");
cart.addItem("ult_large");
cart.getItemsAdded();
cart.calculateTotal();
cart.getItemsExpected();

// Scenario #2
// cart.addItem("ult_small");
// cart.addItem("ult_small");
// cart.addItem("ult_large");
// cart.addItem("ult_large");
// cart.addItem("ult_large");
// cart.addItem("ult_large");
// cart.getItemsAdded();
// cart.calculateTotal();
// cart.getItemsExpected();

// Scenario #3
// cart.addItem("ult_small", 1);
// cart.addItem("ult_medium", 2);
// cart.addItem("ult_medium", 2);
// cart.getItemsAdded();
// cart.calculateTotal();
// cart.getItemsExpected();

// Scenario #4
// cart.addItem("ult_small", 1);
// cart.addItem("1gb", 1);
// cart.getItemsAdded();
// cart.calculateTotal('I<3AMAYSIM');
// cart.getItemsExpected();