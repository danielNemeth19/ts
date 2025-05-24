let nextPizzaId = 1
let cashInRegister = 100
let nextOrderId = 1

type Pizza = {
    id: number
    name: string
    price: number
}

type Order = {
    pizza: Pizza
    status: "ordered" | "completed"
    id: number
}

const menu: Pizza[] = [
    { id: nextPizzaId++, name: "Margaritha", price: 8 },
    { id: nextPizzaId++, name: "Pepperoni", price: 10 },
    { id: nextPizzaId++, name: "Hawaiian", price: 10 },
    { id: nextPizzaId++, name: "Veggie", price: 9 },
]

const orderHistory: Order[] = []


function addNewPizza(pizzaObj: Omit<Pizza, "id">): Pizza {
    const pizzaNew: Pizza = {
        id: nextPizzaId++,
        ...pizzaObj
    }
    menu.push(pizzaNew)
    return pizzaNew
}

function placeOrder(pizzaName: string): Order | undefined {
    const selectedPizza = menu.find(pizza => pizza.name === pizzaName)
    if (!selectedPizza) {
        console.error(`${pizzaName} does not exist in the menu!`)
        return
    }
    cashInRegister += selectedPizza.price
    const orderObject: Order = { pizza: selectedPizza, status: "ordered", id: nextOrderId }
    orderHistory.push(orderObject)
    nextOrderId += 1
    return orderObject
}

function completeOrder(orderId: number): Order | undefined {
    const order = orderHistory.find(ord => ord.id === orderId)
    if (!order) {
        console.error(`${orderId} is not in order queue!`)
        return
    }
    order.status = "completed"
    return order
}

export function getPizzaDetail(identifer: number | string): Pizza | undefined {
    return menu.find(pizza => {
        if (typeof identifer == "number") {
            return pizza.id === identifer
        } else if (typeof identifer === "string") {
            return pizza.name.toLowerCase() === identifer.toLowerCase()
        } else {
            throw new TypeError("Parameter `identifier` needs to be a number or string")
        }
    })
}

function addToArray<T>(arrayInp: T[], item:T): T[] {
  arrayInp.push(item)
  return arrayInp
}

addToArray<Pizza>(menu, {id: nextPizzaId++, name: "Chicken Bacon Ranch", price: 12})
addToArray<Order>(orderHistory, {id: nextOrderId++, pizza: menu[2], status: "completed" })

console.log(menu)
console.log(orderHistory)

addNewPizza({ name: "Chicken Bacon Ranch", price: 2 })
addNewPizza({ name: "BBQ Chicken", price: 12 })
addNewPizza({ name: "Spicy Sausage", price: 12 })

placeOrder("Chicken Bacon Ranch")
completeOrder(1)

console.log("Menu:", menu)
console.log("Cash in register", cashInRegister)
console.log("Order queue", orderHistory)

console.log(getPizzaDetail("BBQ Chicken"))
