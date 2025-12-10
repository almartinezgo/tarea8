const rutas = {
    "COM": ["Compacto1.png", "Compacto2.png", "Compacto3.png"],
    "MED": ["Mediano1.png", "Mediano2.png", "Mediano3.png"],
    "4WD": ["TodoTerreno1.png", "TodoTerreno2.png", "TodoTerreno3.png"],
    "FAM": ["Familiar1.png", "Familiar2.png", "Familiar3.png"]
};

const textos = {
    "COM": [
        "KIA PICANTO, Año 2016",
        "FORD FIESTA ST, Año 2015",
        "PEUGEOT 308, Año 2018"
    ],
    "MED": [
        "HONDA CITY CAR, Año 2017",
        "MERCEDES SLS, Año 2015",
        "FORD FIESTA ST, Año 2016"
    ],
    "4WD": [
        "TOYOTA FJ CRUISER, Año 2016",
        "TOYOTA Prado, Año 2018",
        "NISSAN JUKE, Año 2017"
    ],
    "FAM": [
        " TOYOTA SIENNA, Año 2018",
        "DODGE GRAND CARAVANE, Año 2015",
        "HYUNDAI ELANTRA, Año 2016"
    ]
};

function mostrarTodo() {

    let tipo = $("#tipoVehiculo option:selected").attr("id");
    let listaImagenes = rutas[tipo];

    $("#img1").attr("src", "images/" + listaImagenes[0]);
    $("#img2").attr("src", "images/" + listaImagenes[1]);
    $("#img3").attr("src", "images/" + listaImagenes[2]);

    $("#imgVista").attr("src", "images/" + listaImagenes[0]);

    let texto = textos[tipo][0];
    $("#infTCar").html(formatearTexto(texto));
}

function mostrarImagen(numero) {
    let tipo = $("#tipoVehiculo option:selected").attr("id");

    $("#imgVista").attr("src", "images/" + rutas[tipo][numero - 1]);
    let texto = textos[tipo][numero - 1];
    $("#infTCar").html(formatearTexto(texto));
}

function formatearTexto(texto) {
    let partes = texto.split(",");

    let modelo = partes[0].trim();
    let anno = partes[1].trim();

    return `<strong>${modelo}</strong><br>${anno}`;
}
