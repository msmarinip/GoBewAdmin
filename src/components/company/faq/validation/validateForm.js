export default function validateForm(input) {
    const errors = {};
    const regex = /[A-z\s\d][\\^]?/
    const soloNumeros = /\D/g

    if (!input.faqTitle) errors.faqTitle = "La pregunta es obligatoria"
    else if (!regex.test(input.faqTitle)) errors.faqTitle = "No puedes utilizar caracteres especiales"
    else if (input.faqTitle.length > 30) errors.faqTitle = "La pregunta debe contener menos de 30 caracteres"

    if (!input.faqDescription) errors.faqDescription = "La descripcion es obligatoria"
    else if (input.faqDescription.length > 3000) errors.faqDescription = "La decripcion debe contener menos de 3000 caracteres"

    if (soloNumeros.test(input.faqOrder)) errors.faqOrder = "La descripción no puede contener solo numeros"
    else if (input.faqOrder > 20) errors.faqOrder = "El orden debe ser menor a 20"

    return errors;
}