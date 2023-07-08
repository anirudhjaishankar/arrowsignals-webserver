function getRandomNumber({ start = 0, end = 10000000, negative = false, ceil = true }){
    let random = Math.random()

    let number = random * (end - start) + start

    if(ceil){
        number = Math.ceil(number)
    }

    return negative ? (number * -1) : number
}

export {
    getRandomNumber
}