import {fillChart}
from './chart.js';

var oldDiv = null;

function redirect(todo)
{
    switch (todo)
    {
        case "intervention-animal":
        case "intervention-delivery":
        case "intervention-incident":
            togglePanel(todo);
            break;
        default:
            // Appel AJAX
            let href = $(this).attr('href');
            // If the link isn't empty
            if (href !== "#") {
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
                                alertify.set('notifier', 'delay', 8);
                                alertify.error("Erreur lors de l'appel AJAX: \"\n" + response.errorMessage + "\"");
                                window.history.pushState("", "", href);
                            } else {
                                togglePanel(todo);
                                switch (todo)
                                {
                                    case "profile":
                                        // Destroy previous charts
                                        Chart.helpers.each(Chart.instances, function (instance) {
                                            instance.destroy();
                                        });
                                        fillProfile(response);
                                        break;
                                    case "history":
                                        fillHistory(response);
                                        break;
                                    default:
                                        break;
                                }
                            }
                        })
                        .fail(function (error) { // Fonction appelée en cas d'erreur lors de l'appel AJAX
                            console.log('Error', error); // LOG dans Console Javascript
                            alertify.set('notifier', 'delay', 8);
                            alertify.error("Erreur lors de l'appel AJAX: \"\n" + response.errorMessage + "\"");
                        })
                        .always(function () { // Fonction toujours appelée

                        });
            }
    }
}

$(document).ready(function () {
// Appel AJAX
    redirect("profile");

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
        let todo = $(this).attr('data-todo');
        redirect(todo);

    });

    $(".send-intervention").on("click", function (i) {
// Appel AJAX
        let todo = $(this).attr('data-todo');
        let data = {
            todo: todo
        };
        switch (todo) {
            case "intervention-animal":
                data["species"] = document.getElementById("animal-species").value;
                data["description"] = document.getElementById("animal-description").value;
                break;
            case "intervention-delivery":
                data["object"] = document.getElementById("delivery-object").value;
                data["company"] = document.getElementById("delivery-company").value;
                data["description"] = document.getElementById("delivery-description").value;
                break;
            case "intervention-incident":
                data["description"] = document.getElementById("incident-description").value;
                break;
        }
        console.log(data);
        // Appel AJAX
        $.ajax({
            url: '../ActionServlet',
            method: 'POST',
            data: jQuery.param(data),
            dataType: 'json'
        })
                .done(function (response) { // Fonction appelée en cas d'appel AJAX réussi
                    console.log('Response', response); // LOG dans Console Javascript
                    if (!response.error) {
                        alertify.set('notifier', 'delay', 2);
                        alertify.success("Demande créée avec succès");
                        setTimeout(function () {
                            redirect("profile");
                        }, 2000);
                    } else {
                        alertify.set('notifier', 'delay', 6);
                        alertify.error(response.errorMessage);
                    }
                })
                .fail(function (error) { // Fonction appelée en cas d'erreur lors de l'appel AJAX
                    console.log('Error', error); // LOG dans Console Javascript
                    alertify.set('notifier', 'delay', 8);
                    alertify.error("Erreur lors de l'appel AJAX: \"\n" + response.errorMessage + "\"");
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
            content = "<span class='grey'>" + intervention.end_date + "</span>";
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
        } else if (intervention.status === null) {
            content = "<span class='not-applicable'>N/A</span>";
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
    console.log(response.current_intervention_exists);
    console.log(response.current_intervention_list.length);
    if (response.current_intervention_exists) {
        // If there is only one intervention
        if (response.current_intervention_list.length === 1) {
            document.getElementById("current-intervention-status").innerHTML = "Intervention n°" + response.intervention.id + " en cours ...";
        } else {
            document.getElementById("current-intervention-status").innerHTML = response.current_intervention_list.length + " interventions en cours ...";
        }

        // Get div containing ul list
        let div = document.getElementById("current-intervention-list");
        // Clear div
        document.getElementById("current-intervention-list").innerHTML = "";

        // Init ul list for each intervention
        response.current_intervention_list.forEach(function (intervention) {
            let ul = document.createElement("ul");
            ul.className = "list";

            // If there is more than one intervention
            let li;
            let content;
            if (response.current_intervention_list.length > 1) {
                li = document.createElement("li");
                content = "<span class='bold'>N°:</span>" + intervention.id;
                li.appendChild(document.createTextNode(""));
                li.innerHTML = content;
                ul.appendChild(li);
            } else {
                li = document.createElement("li");
                content = "<span class='bold'>Type:</span>" + intervention.type;
                li.appendChild(document.createTextNode(""));
                li.innerHTML = content;
                ul.appendChild(li);
            }
            
            li = document.createElement("li");
            content = "<span class='bold'>Date de la demande:</span>" + intervention.start_date;
            li.appendChild(document.createTextNode(""));
            li.innerHTML = content;
            ul.appendChild(li);

            if (intervention.description !== null) {
                li = document.createElement("li");
                content = "<span class='bold'>Description:</span>" + intervention.description;
                li.appendChild(document.createTextNode(""));
                li.innerHTML = content;
                ul.appendChild(li);
            }

            li = document.createElement("li");
            content = "<span class='bold'>Employé:</span>" + intervention.employee.last_name.toUpperCase() + " " + intervention.employee.first_name;
            li.appendChild(document.createTextNode(""));
            li.innerHTML = content;
            ul.appendChild(li);
            
            li = document.createElement("li");
            content = "<span class='bold'>Type:</span>" + intervention.type;
            li.appendChild(document.createTextNode(""));
            li.innerHTML = content;
            ul.appendChild(li);
            switch (intervention.type)
            {
                case "Animal":
                    li = document.createElement("li");
                    content = "<span class='bold'>Animal:</span>" + intervention.species;
                    li.appendChild(document.createTextNode(""));
                    li.innerHTML = content;
                    ul.appendChild(li);
                    break;
                case "Delivery":
                    li = document.createElement("li");
                    content = "<span class='bold'>Objet:</span>" + intervention.object;
                    li.appendChild(document.createTextNode(""));
                    li.innerHTML = content;
                    ul.appendChild(li);
                    li = document.createElement("li");
                    content = "<span class='bold'>Entreprise:</span>" + intervention.company;
                    li.appendChild(document.createTextNode(""));
                    li.innerHTML = content;
                    ul.appendChild(li);
                    break;
                case "Incident":
                    break;
            }

            div.appendChild(ul);
        });
    } else {
        // Clear div
        document.getElementById("current-intervention-list").innerHTML = "";

        $("#current-intervention-status").textContent = "Aucune intervention en cours";
    }
}

function togglePanel(newDiv)
{
    if (oldDiv !== null)
    {
        document.getElementById(oldDiv).style.display = "none";
    }
    oldDiv = newDiv
    document.getElementById(newDiv).style.display = "flex";
}
