$(document).ready(function () {

    $(".botones[value='Calcular']").click(calcularTodo);
    $(".botones[value='Guardar']").click(guardarDatos);

    mostrarUltimaCotizacion();
});

function MensajeTipoSeguro() {
    let tipo = $("#seguro option:selected").attr("id");

    let mensajes = {
        "PBO": "Cubre daños al vehículo rentado y daños a vehículos terceros involucrados en un accidente de tránsito. \nCosto de alquiler diario: $ 5.45 por día.",
        "PED": "Cubre la Protección Básica Obligatoria (PBO) más daños a propiedades de terceros, incendio e inundaciones. \nCosto de alquiler diario: $ 9.50 por día.",
        "PGM": "Cubre la Protección Extendida de Daños(PED) más gastos médicos para los ocupantes del vehículo. \nCosto de alquiler diario: $ 11.25 por día."
    };

    alert(mensajes[tipo]);
}

async function calcularTodo() {

    let retiro = $("input[name='fechaRetiro']").val();
    let devol = $("input[name='fechadevolucion']").val();

    let f1 = new Date(retiro);
    let f2 = new Date(devol);

    let dias = Math.floor((f2 - f1) / (1000 * 60 * 60 * 24));

    // Validación
    if (isNaN(dias) || dias < 3 || dias > 365) {
        alert("Los días deben estar entre 3 y 365.");
        return;
    }

    $("input[name='dias']").val(dias);

    let tdv = parseFloat($("#tipoVehiculo").val());  // Tarifa según vehículo
    let tds = parseFloat($("#seguro").val());       // Tarifa según seguro

    let td = tdv + tds;

    let descDias = 0;

    if (dias > 30 && dias < 120) {
        descDias = 0.15;  // 15%
    }
    else if (dias >= 120 && dias <= 365) {
        descDias = 0.25;  // 25%
    }

    td = td - (td * descDias);

    $("input[name='td']").val(td.toFixed(2));

    let cca3 = $("#nacionalidad").val();
    let region = "";

    try {
        let resp = await fetch(`https://restcountries.com/v3.1/alpha?codes=${cca3}`);
        let json = await resp.json();
        region = json[0].region;
    } catch (e) {
        console.log("Error obteniendo región:", e);
    }

    let descRegion = 0;

    if (region === "Americas" || region === "Europe") {
        descRegion = 0.10;
    } else if (region === "Africa") {
        descRegion = 0.05;
    }

    let subtotal = td * dias;
    let total = subtotal - (subtotal * descRegion);

    $("input[name='totalPagar']").val(total.toFixed(2));
}

async function obtenerRegion(cca3) {
    try {
        const resp = await fetch(`https://restcountries.com/v3.1/alpha?codes=${cca3}`);
        const datos = await resp.json();
        return datos[0].region;
    } catch (e) {
        console.log("Error obteniendo región:", e);
        return "";
    }
}

function guardarDatos() {
    let datos = {
        fechaRetiro: $("input[name='fechaRetiro']").val(),
        fechaDevol: $("input[name='fechadevolucion']").val(),
        pais: $("#nacionalidad").val(),
        tipoVehiculo: $("#tipoVehiculo").val(),
        seguro: $("#seguro").val(),
        dias: $("input[name='dias']").val(),
        td: $("input[name='td']").val(),
        total: $("input[name='totalPagar']").val()
    };

    localStorage.setItem("ultimaCotizacion", JSON.stringify(datos));
    localStorage.setItem("paisCliente", datos.pais);

    alert("Cotización guardada correctamente.");
}

function mostrarUltimaCotizacion() {
    let datos = localStorage.getItem("ultimaCotizacion");
    if (!datos) return;

    datos = JSON.parse(datos);

    $("input[name='fechaRetiro']").val(datos.fechaRetiro);
    $("input[name='fechadevolucion']").val(datos.fechaDevol);
    $("#nacionalidad").val(datos.pais);
    $("#tipoVehiculo").val(datos.tipoVehiculo);
    $("#seguro").val(datos.seguro);
    $("input[name='dias']").val(datos.dias);
    $("input[name='td']").val(datos.td);
    $("input[name='totalPagar']").val(datos.total);
}