export default function validateForm(input) {
    const errors = {};
    const regex = /[A-z\s\d][\\\^]?/
    const soloNumeros = /\D/g

    if (!input.productName) errors.productName = "El nombre del producto es obligatorio"
    else if (!regex.test(input.productName)) errors.productName = "No puedes utilizar caracteres especiales"
    else if (!input.productName) errors.productName = "El producto debe contener alguna letra"
    else if (input.productName.length > 30) errors.productName = "El nombre del producto debe contener menos de 30 caracteres"

    if (!soloNumeros.test(input.productDescription)) errors.productDescription = "La descripción no puede contener solo numeros"
    else if (input.productDescription.lenght > 140) errors.productDescription = "La descripción del producto no debe contener mas de 140 caracteres"

    if (!input.productPrice) errors.productPrice = "Debe asignarle un precio a su producto"
    else if (input.productPrice <= 0) errors.productPrice = "El precio no puede ser menor o igual a 0"
    else if (soloNumeros.test(input.productPrice)) errors.productPrice = "El producto debe contener solo numeros"
    else if (input.productPrice > 10000000) errors.productPrice = "El precio es muy alto, verifique el importe"

    if (!input.productStock) errors.productStock = "Escriba su stock disponble"
    else if (soloNumeros.test(input.productStock)) errors.productPrice = "El stock debe contener solo numeros"
    else if (input.productStock < 0) errors.productStock = "El stock no puede ser menor a 0"
    else if (input.productStock > 10000000) errors.productStock = "El stock es muy alto, verifique el numero"

    if (!input.productCategories) errors.productCategories = "Seleccione a que categoria pertenece"

    return errors;
}