/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 * 
 *  Nimi: Alisa Luomanmäki
 * 
 */

$(document).ready(function () {
    /**
     * Calculates the body mass index.
     * 
     * @param {type} height     height in cm
     * @param {type} weight     weight in kg
     * @returns {undefined}     body mass index
     */
    function getBmi(height, weight) {
        height = height / 100;
        let painoindeksi = (weight / Math.pow(height, 2.5)) * 1.3;

        painoindeksi = painoindeksi.toFixed(1);

        return painoindeksi;
    }

    /**
     * Calculate upper and lower bounds for normal weight.
     * 
     * @param {type} value  Person´s height in cm.
     * @param {type} factor 18.5 >> lower bound, 24.9 >> upper boud
     * @returns {Number}    Normal weight bound as integer.
     */
    function getWeightLimit(value, factor) {
        let limit = (factor / 1.3) * Math.pow(value / 100, 2.5);

        limit = limit.toFixed(0);

        return limit;
    }

    /* BMI laskeminen */
    function tyhjaaBmiselitys() {
        let vauvat = $("#painoselitykset").children().children().children();
        $(vauvat).each(function () {
            if ($(this).hasClass("bg-info")) {
                $(this).removeClass("bg-info");
            }
        });
    }

    $("#laskeBmi").click(function () {
        if (validateInput() === false) {
            return;
        }
        let paino = Number($("#paino").val());
        let pituus = Number($("#pituus").val());
        let painoindeksi = getBmi(pituus, paino);

        $("#sinunBmi").html(painoindeksi);
        if ($("#ihanne").prop("checked") === true) {
            let ylaraja = getWeightLimit(pituus, 24.9);
            let alaraja = getWeightLimit(pituus, 18.5);
            $("#sinunIhanne").html(alaraja + " - " + ylaraja);
        } else {
            $("#sinunIhanne").html("-");
        }

        tyhjaaBmiselitys();

        if (painoindeksi < 17) {
            $("#malipaino").addClass("bg-info");
        } else if (painoindeksi < 18.5) {
            $("#alipaino").addClass("bg-info");
        } else if (painoindeksi < 25) {
            $("#norpaino").addClass("bg-info");
        } else if (painoindeksi < 30) {
            $("#lievapaino").addClass("bg-info");
        } else if (painoindeksi < 35) {
            $("#merlipaino").addClass("bg-info");
        } else if (painoindeksi < 40) {
            $("#vailipaino").addClass("bg-info");
        } else {
            $("#sailipaino").addClass("bg-info");
        }
    });

    $("input").click(function () {
        $(this).select();
    });


    /* Vyötärön mitan laskeminen */
    function nollaaRiskit() {
        let vauvat = $("#riski").children();
        $(vauvat).each(function () {
            if ($(this).hasClass("bg-info")) {
                $(this).removeClass("bg-info");
            }
        });
    };

    $("#laskeVyotaro").click(function () {
        let vyotaroTieto = Number($("#vyotaro").val());
        nollaaRiskit();
        if ($("#mies").prop("checked") === true) {
            if (vyotaroTieto < 90) {
                $("#eiriskia").addClass("bg-info");
            } else if (vyotaroTieto <= 100) {
                $("#pieniriski").addClass("bg-info");
            } else {
                $("#isoriski").addClass("bg-info");
            }
        } else {
            if (vyotaroTieto < 80) {
                $("#eiriskia").addClass("bg-info");
            } else if (vyotaroTieto <= 90) {
                $("#pieniriski").addClass("bg-info");
            } else {
                $("#isoriski").addClass("bg-info");
            }
        }
    });

    $("[name=sukupuoli], #vyotaro").click(function () {
        nollaaRiskit();
    });

    /*Viestejä */

    $("[data-toggle=popover]").popover();

    function tyhjatTiedot(tarkistus) {
        $("#modal-title").html("Tietoja puuttuu");
        $("#modal-body").html("Täytä kaikki tiedot: syntymävuosi, paino ja pituus.");
        $("#error_message").modal("show");
    }

    function validateInput() {
        let vuosi = Number($("#vuosi").val());
        let paino = Number($("#paino").val());
        let pituus = Number($("#pituus").val());
        if (vuosi === 0 || paino === 0 || pituus === 0) {
            tyhjatTiedot();
            return false;
        } else {
            let date = new Date();
            let current_year = date.getFullYear();
            let ika = current_year - vuosi;
            if (ika < 20 || ika > 60) {
                $("#modal-title").html("Ikä huomautus");
                $("#modal-body").html("Tämä painoindeksi sopii 20-60 vuotiaille");
                $("#error_message").modal("show");
            }
            return true;
        }
    }


});