import {fillChart} from './chart.js';

$(document).ready(function () {
// Appel AJAX
    $.ajax({
        url: '../ActionServlet',
        method: 'POST',
        data: {
            todo: 'profile'
        },
        dataType: 'json'
    })
            .done(function (response) { // Fonction appelée en cas d'appel AJAX réussi
                console.log('Response', response); // LOG dans Console Javascript
                if (response.error)
                {
                    console.log(response.errorMessage);
                } else {
                    let nbAnimal = response.nbAnimal;
                    let nbDelivery = response.nbDelivery;
                    let nbIncident = response.nbIncident;
                    let dataset = [
                        {label: "Animal", count: nbAnimal, color: "#e74c3c"},
                        {label: "Delivery", count: nbDelivery, color: "#2ecc71"},
                        {label: "Incident", count: nbIncident, color: "#f1c40f"}
                    ];
                    fillChart(dataset);
                    if(response.currentIntervention.exists){
                        
                    }
                    else{
                        
                    }
                }
            })
            .fail(function (error) { // Fonction appelée en cas d'erreur lors de l'appel AJAX
                console.log('Error', error); // LOG dans Console Javascript
                alert("Erreur lors de l'appel AJAX");
            })
            .always(function () { // Fonction toujours appelée

            });
    $(".sidebar-menu").find("a").on("click", function (i) {
        i.preventDefault();
        // Appel AJAX
        let href = $(this).attr('href');
        let todo = $(this).attr('data-todo');
        // Appel AJAX
        $.ajax({
            url: '../ActionServlet',
            method: 'POST',
            data: {
                todo: todo
            },
            dataType: 'json'
        })
                .done(function (response) { // Fonction appelée en cas d'appel AJAX réussi
                    console.log('Response', response); // LOG dans Console Javascript
                    if (!response.error) {
                        window.history.pushState("", "", href);
                    } else {
                    }
                })
                .fail(function (error) { // Fonction appelée en cas d'erreur lors de l'appel AJAX
                    console.log('Error', error); // LOG dans Console Javascript
                    alert("Erreur lors de l'appel AJAX");
                })
                .always(function () { // Fonction toujours appelée

                });
    });
    $(".send-intervention").on("click", function (i) {
// Appel AJAX
        let todo = $(this).attr('data-todo');
        // Appel AJAX
        $.ajax({
            url: '../ActionServlet',
            method: 'POST',
            data: {
                todo: todo,
                animal: "Chien",
                object: "Canapé",
                company: "AMAZON. US",
                description: "Oskour"
            },
            dataType: 'json'
        })
                .done(function (response) { // Fonction appelée en cas d'appel AJAX réussi
                    console.log('Response', response); // LOG dans Console Javascript
                    if (!response.error) {

                    } else {
                    }
                })
                .fail(function (error) { // Fonction appelée en cas d'erreur lors de l'appel AJAX
                    console.log('Error', error); // LOG dans Console Javascript
                    alert("Erreur lors de l'appel AJAX");
                })
                .always(function () { // Fonction toujours appelée

                });
    }
    );
});