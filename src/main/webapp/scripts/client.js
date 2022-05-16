import {fillChart}
from './chart.js';

var oldDiv = null;

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
                document.getElementById("profile").style.display = "flex";
                oldDiv = "profile"

                console.log('Response', response); // LOG dans Console Javascript
                if (response.error)
                {
                    console.log(response.errorMessage);
                } else {
                    fillProfile(response);
                }
            })
            .fail(function (error) { // Fonction appelée en cas d'erreur lors de l'appel AJAX
                console.log('Error', error); // LOG dans Console Javascript
                alert("Erreur lors de l'appel AJAX");
            })
            .always(function () { // Fonction toujours appelée

            });
    $(".sidebar-menu > li.have-children a").on("click", function (i) {
        i.preventDefault();
        if (!$(this).parent().hasClass("active")) {
            $(".sidebar-menu li ul").slideUp();
            $(this).next().slideToggle();
            $(".sidebar-menu li").removeClass("active");
            $(this).parent().addClass("active");
        } else {
            $(this).next().slideToggle();
            $(".sidebar-menu li").removeClass("active");
        }
    });
    $(".redirect-link").on("click", function (i) {
        i.preventDefault();
        // Appel AJAX
        let href = $(this).attr('href');
        // If the link isn't empty
        if (href !== "#") {
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
                        if (response.error) {
                            console.log('Error', response.error); // LOG dans Console Javascript
                            alert("Erreur lors de l'appel AJAX\n" + response.error);
                            window.history.pushState("", "", href);
                        } else {
                            if (oldDiv !== null)
                            {
                                document.getElementById(oldDiv).style.display = "none";
                            }

                            switch (todo)
                            {
                                case "profile":
                                    oldDiv = "profile"
                                    document.getElementById("profile").style.display = "flex";
                                    fillProfile(response);
                                case "history":
                                    oldDiv = "history"
                                    document.getElementById("history").style.display = "flex";
                                    fillHistory(response);
                                    break;
                                default:
                                    break;
                            }
                        }
                    })
                    .fail(function (error) { // Fonction appelée en cas d'erreur lors de l'appel AJAX
                        console.log('Error', error); // LOG dans Console Javascript
                        alert("Erreur lors de l'appel AJAX");
                    })
                    .always(function () { // Fonction toujours appelée

                    });
        }
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

function fillHistory(response)
{
    // Get table
    let table = document.getElementById("history-table");
    // Clear table (except the first table row)
    $("#history-table").find("tr:gt(0)").remove();
    // Fill table
    response.interventionList.forEach(function (intervention) {
        let tr = document.createElement("tr");

        // TYPE
        let th = document.createElement("th");
        let content = "<span class='bold'>" + intervention.type + "</span>";
        th.appendChild(document.createTextNode(""));
        th.innerHTML = content;
        tr.appendChild(th);
        // START_DATE
        th = document.createElement("th");
        content = "<span class='grey'>" + intervention.start_date + "</span>";
        th.appendChild(document.createTextNode(""));
        th.innerHTML = content;
        tr.appendChild(th);
        // STATE
        th = document.createElement("th");
        content = "<span class='bold'>" + intervention.state + "</span>";
        th.appendChild(document.createTextNode(""));
        th.innerHTML = content;
        tr.appendChild(th);
        // END_DATE
        th = document.createElement("th");
        if (intervention.state === "Terminé") {
            content = "<span class='grey'>" + intervention.date + "</span>";
        } else {
            content = "<span class='not-applicable'>N/A</span>";
        }
        th.appendChild(document.createTextNode(""));
        th.innerHTML = content;
        tr.appendChild(th);
        // STATUS
        th = document.createElement("th");
        if (intervention.status === "Succès") {
            content = "<span class='green'>" + intervention.status + "</span>";
        } else {
            content = "<span class='red'>" + intervention.status + "</span>";
        }
        th.appendChild(document.createTextNode(""));
        th.innerHTML = content;
        tr.appendChild(th);
        // EMPLOYEE
        th = document.createElement("th");
        content = "<span class='bold'>" + intervention.employee.first_name + " " + intervention.employee.last_name.toUpperCase() + "</span>";
        th.appendChild(document.createTextNode(""));
        th.innerHTML = content;
        tr.appendChild(th);
        // ANIMAL
        th = document.createElement("th");
        if (intervention.type === "Animal") {
            content = "<span class='bold'>" + intervention.species + "</span>";
        } else {
            content = "<span class='not-applicable'>N/A</span>";
        }
        th.appendChild(document.createTextNode(""));
        th.innerHTML = content;
        tr.appendChild(th);
        // COMPANY
        th = document.createElement("th");
        if (intervention.type === "Livraison") {
            content = "<span class='bold'>" + intervention.company + "</span>";
        } else {
            content = "<span class='not-applicable'>N/A</span>";
        }
        th.appendChild(document.createTextNode(""));
        th.innerHTML = content;
        tr.appendChild(th);
        // OBJECT
        th = document.createElement("th");
        if (intervention.type === "Livraison") {
            content = "<span class='bold'>" + intervention.object + "</span>";
        } else {
            content = "<span class='not-applicable'>N/A</span>";
        }
        th.appendChild(document.createTextNode(""));
        th.innerHTML = content;
        tr.appendChild(th);


        table.appendChild(tr);
    });
}

function fillProfile(response)
{
    document.getElementById("profile-name").innerHTML = response.client.first_name + " " + response.client.last_name.toUpperCase();
    document.getElementById("phone_number").innerHTML = response.client.phone_number;
    document.getElementById("address").innerHTML = response.client.address;
    document.getElementById("email").innerHTML = response.client.email;
    document.getElementById("signup_date").innerHTML = response.client.signup_date;
    let nbAnimal = response.nbAnimal;
    let nbDelivery = response.nbDelivery;
    let nbIncident = response.nbIncident;
    let dataset = [
        {label: "Animal", count: nbAnimal, color: "#e74c3c"},
        {label: "Delivery", count: nbDelivery, color: "#2ecc71"},
        {label: "Incident", count: nbIncident, color: "#f1c40f"}
    ];
    fillChart(dataset);
    if (response.intervention.exists) {
        document.getElementById("current-intervention-status").innerHTML = "Intervention n°" + response.intervention.id + " en cours ...";
        // Get ul list
        let ul = $("#current-intervention-list");
        // Clear ul list
        ul.innerHtml = "";
        // Init ul list
        let li = document.createElement("li");
        let content = "<span class='bold'>Type:</span>" + response.intervention.type;
        li.appendChild(document.createTextNode(""));
        li.innerHTML = content;
        ul.appendChild(li);
        li = document.createElement("li");
        content = "<span class='bold'>Date de la demande:</span>" + response.intervention.date;
        li.appendChild(document.createTextNode(""));
        li.innerHTML = content;
        ul.appendChild(li);
        li = document.createElement("li");
        content = "<span class='bold'>Descritpion:</span>" + response.intervention.description;
        li.appendChild(document.createTextNode(""));
        li.innerHTML = content;
        ul.appendChild(li);
        li = document.createElement("li");
        content = "<span class='bold'>Employé:</span>" + response.intervention.employee;
        li.appendChild(document.createTextNode(""));
        li.innerHTML = content;
        ul.appendChild(li);
        switch (response.intervention.type)
        {
            case "Animal":
                li = document.createElement("li");
                content = "<span class='bold'>Type:</span>" + response.intervention.type;
                li.appendChild(document.createTextNode(""));
                li.innerHTML = content;
                ul.appendChild(li);
                break;
            case "Delivery":
                li = document.createElement("li");
                content = "<span class='bold'>Objet:</span>" + response.intervention.object;
                li.appendChild(document.createTextNode(""));
                li.innerHTML = content;
                ul.appendChild(li);
                li = document.createElement("li");
                content = "<span class='bold'>Entreprise:</span>" + response.intervention.company;
                li.appendChild(document.createTextNode(""));
                li.innerHTML = content;
                ul.appendChild(li);
                break;
            case "Incident":
                break;
        }
    } else {
        $("#current-intervention-status").textContent = "Aucune intervention en cours";
    }
}