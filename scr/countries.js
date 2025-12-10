$(document).ready(function () {
    cargarPaises();
});

async function cargarPaises() {
    const select = $("#nacionalidad");
    let paisGuardado = localStorage.getItem("paisCliente") || "CRI";

    try {
        const respuesta = await fetch("https://restcountries.com/v3.1/all?fields=cca3,name,translations,region");
        const datos = await respuesta.json();

        datos.sort((a, b) =>
            (a.translations.spa?.common || "").localeCompare(b.translations.spa?.common || "")
        );

        datos.forEach(pais => {
            let nombre = pais.translations.spa?.common || pais.name.common;
            let codigo = pais.cca3;

            let opcion = `<option value="${codigo}">${nombre}</option>`;
            select.append(opcion);
        });

        select.val(paisGuardado);
    } catch (e) {
        console.log("Error al cargar países:", e);
    }
}