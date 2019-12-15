function getPrototype(obj) {
    console.log('obj', obj);
    const result = [];
    while(obj = Object.getPrototypeOf(obj)) {
        result.push(obj)
    }
    return result
}
module.exports = {getPrototype}