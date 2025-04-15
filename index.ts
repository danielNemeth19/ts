type Pizza = {
    name: string
    price: number
}

type Order = {
    pizza: Pizza
    status: string
    id: number
}

const menu: Pizza[] = [
    { name: "Margaritha", price: 8},
    { name: "Pepperoni", price: 10},
    { name: "Hawaiian", price: 10},
    { name: "Veggie", price: 9},
]

let cashInRegister = 100
const orderQueue: Order[] = []
let nextOrderId = 1


function addNewPizza(pizza: Pizza){
    menu.push(pizza)
}

function placeOrder(pizzaName: string) {
    const selectedPizza = menu.find(pizza => pizza.name === pizzaName)
    if (!selectedPizza) {
        console.error(`${pizzaName} does not exist in the menu!`)
        return
    }
    cashInRegister += selectedPizza.price
    const orderObject = {pizza: selectedPizza, status: "ordered", id: nextOrderId}
    orderQueue.push(orderObject)
    nextOrderId += 1
    return  orderObject
}

function completeOrder(orderId: number) {
    const order = orderQueue.find(ord => ord.id === orderId) 
    order.status = "completed"
    return order
}

addNewPizza({ name: "Chicken Bacon Ranch", price: 12})
addNewPizza({ name: "BBQ Chicken", price: 12})
addNewPizza({ name: "Spicy Sausage", price: 12})

placeOrder("Chicken Bacon Ranch")
completeOrder(1)

console.log("Menu:", menu)
console.log("Cash in register", cashInRegister)
console.log("Order queue", orderQueue)

