const sumar = (x, y) => {
    return x + y;
};
function restar(a, b) {
    return a - b;
}
const multiplicar = (a, b) => {
    return a * b;
};
  
function dividir(a, b) {
    if (b === 0) {
      throw new Error("No se puede dividir por cero");
    }
    return a / b;
}
const arrayStrings = ["dos", "cuatro", "ocho", "diez"];
const PI = 3.14;
export { PI, sumar, restar, multiplicar, dividir, arrayStrings };