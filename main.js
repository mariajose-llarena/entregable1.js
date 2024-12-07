const biblioteca = [
    { titulo: "Don Quijote de la Mancha", autor: "Miguel de Cervantes", isbn: 123456789, anio: 1605, copias: 3 }
];

function esNumero(valor) {
    return !isNaN(valor);
}

function solicitarNumero(mensaje) {
    let numero = Number(prompt(mensaje));
    while (!esNumero(numero)) {
        alert("Por favor, ingrese un número válido.");
        numero = Number(prompt(mensaje));
    }
    return numero;
}

function obtenerArrayISBN() {
    const arrayISBN = [];
    for (let i = 0; i < biblioteca.length; i++) {
        arrayISBN.push(biblioteca[i].isbn);
    }
    return arrayISBN;
}

function encontrarIndice(isbn) {
    const arrayISBN = obtenerArrayISBN();
    return arrayISBN.indexOf(isbn);
}

function registrarLibro(titulo, autor, isbn, anio, copias) {
    biblioteca.push({ titulo, autor, isbn, anio, copias });
}

function mostrarLibros() {
    let mensajeLista = "Los libros disponibles en la biblioteca son:\n";
    for (let i = 0; i < biblioteca.length; i++) {
        mensajeLista += `Título: ${biblioteca[i].titulo}, Autor: ${biblioteca[i].autor}, ISBN: ${biblioteca[i].isbn}, Año: ${biblioteca[i].anio}, Copias disponibles: ${biblioteca[i].copias}\n`;
    }
    alert(mensajeLista);
}

function eliminarLibro(isbn) {
    const indice = encontrarIndice(isbn);
    if (indice === -1) {
        alert("El libro con el ISBN proporcionado no se encuentra registrado.");
        return; // Salimos de la función
    }

    const confirmacion = confirm(`¿Seguro quieres eliminar: ${biblioteca[indice].titulo} de ${biblioteca[indice].autor}?`);

    if (confirmacion) {
        alert(`Se eliminó el libro: ${biblioteca[indice].titulo}`);
        biblioteca.splice(indice, 1);
    } else {
        alert(`No se eliminó el libro ${biblioteca[indice].titulo}.`);
    }
}


function modificarCopias(isbn, cantidad) {
    const indice = encontrarIndice(isbn);

    if (indice === -1) {
        alert("El libro no se encuentra en nuestra base de datos.");
        return;
    }

    biblioteca[indice].copias += cantidad;

    if (cantidad > 0) {
        alert(`Se han agregado ${cantidad} copias del libro: ${biblioteca[indice].titulo}.`);
    } else {
        alert(`Se han eliminado ${Math.abs(cantidad)} copias del libro: ${biblioteca[indice].titulo}.`);
    }
}

function iniciarSistema() {
    let continuarOperando = true;

    while (continuarOperando) {
        let opcionSeleccionada = solicitarNumero("Bienvenido a biblioteca-online. ¿Qué desea hacer?\n1) Registrar libro\n2) Modificar copias\n3) Eliminar libro\n4) Mostrar libros\n0) Salir");

        let isbn;

        if ((opcionSeleccionada !== 0 && opcionSeleccionada !== 4) && (opcionSeleccionada >= 1 && opcionSeleccionada <= 3)) {
            isbn = solicitarNumero("Ingrese el ISBN del libro, por favor:");
        }

        switch(opcionSeleccionada) {
            case 0:
                continuarOperando = false;
                break;
            case 1:
                let tituloNuevo = prompt("Ingrese el título del libro:");
                let autorNuevo = prompt("Ingrese el autor del libro:");
                let anioNuevo = solicitarNumero("Ingrese el año de publicación:");
                let copiasNuevas = solicitarNumero("Ingrese la cantidad de copias:");

                if (encontrarIndice(isbn) === -1) {
                    registrarLibro(tituloNuevo, autorNuevo, isbn, anioNuevo, copiasNuevas);
                } else {
                    alert("Este ISBN ya está registrado.");
                }
                break;
            case 2:
                let cantidadModificacion = solicitarNumero("¿Cuántas copias desea agregar o eliminar? (use un número negativo para eliminar)");
                modificarCopias(isbn, cantidadModificacion);
                break;
            case 3:
                eliminarLibro(isbn);
                break;
            case 4:
                mostrarLibros();
                break;
            default:
                alert("Opción no válida.");
        }

        continuarOperando = confirm("¿Desea realizar otra operación?");
    }
}

iniciarSistema();