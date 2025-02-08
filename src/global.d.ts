declare global {
    interface CartItem {
        pro_id: string,
        name: string,
        image: string,
        price: number,
        qty: number,
        subtotal: number
    }
    interface Cart {
        cart: CartItem[],
        total: number
    }
    interface User {
        id: number,
        username: string,
        email: string,
        firstName: string,
        lastName: string,
        gender: string,
        image: string,
    }
    interface Category {
        name: string,
        slug: string,
        url: string
    }
    interface ProductReview {
        rating: number;
        comment: string;
        date: string;
        reviewerName: string;
        reviewerEmail: string;
    }
    interface Product {
        id: number;
        title: string;
        description: string;
        category: string;
        price: number;
        discountPercentage: number;
        rating: number;
        stock: number;
        tags: string[];
        brand: string;
        sku: string;
        weight: number;
        dimensions: {
            width: number;
            height: number;
            depth: number;
        };
        warrantyInformation: string;
        shippingInformation: string;
        availabilityStatus: string;
        reviews: ProductReview[];
        returnPolicy: string;
        minimumOrderQuantity: number;
        thumbnail: string;
        images: string[];
    }
}
export { }