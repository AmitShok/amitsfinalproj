import Product from "./Product"

export interface Order {
    id: number
    orderItems: Product[]
    user: string
}

export default interface MyOrders {
    orders: Order[]
    productsOrderd:number[]
}
