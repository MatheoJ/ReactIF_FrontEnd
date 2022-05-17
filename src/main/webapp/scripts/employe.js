var googleMapInstance = null;
var interventionList = null;
var latTab = null;
var lngTab = null;


function makeInfoWindow(title) {
    return new google.maps.InfoWindow({
        content: '<div>Information: ' + title + '</div>'
    });
}

function attachInfoWindow(marker, infowindow, htmlDescription) {
    marker.addListener('click', function () {

        infowindow.setContent(htmlDescription);
        infowindow.open(googleMapInstance, this);
    });
}

function initMap() {

    googleMapInstance = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 45.7601424, lng: 4.8961779},
        zoom: 13
    });

    var infowindow = makeInfoWindow('');


}

function generateMarkers() {

    // Petite popup Google Maps
    var infowindow = makeInfoWindow('');

   
    var j =0
    for (var i in interventionList) {

        var iconImage = null; // marker par défaut              
        var marker = new google.maps.Marker({
            map: googleMapInstance,
            position: {lat: latTab[j], lng: lngTab[j]},
            title: 'Intervention #' + interventionList[i].id,
            icon: iconImage
        });

        attachInfoWindow(
                marker, infowindow,
                '<div><strong><a href="./endroit.html?' + j + '">Intervention #' + interventionList[i].id + '</a></strong><br/>Ceci est la position de l\'intervention ' + interventionList[i].id + '<br/>' + 'Incroyable !' + '</div>'
                );
        j++;
    }

}


$(document).ready(function () {
// Appel AJAX
    $.ajax({
        url: '../ActionServlet',
        method: 'POST',
        data: {
            todo: 'profileEmploye'
        },
        dataType: 'json'
    })
            .done(function (response) { // Fonction appelée en cas d'appel AJAX réussi
                console.log('Response', response); // LOG dans Console Javascript
                if (response.error)
                {
                    console.log(response.errorMessage);
                } else {
                    interventionList=response.interventionList;
                    latTab=response.lat;
                    lngTab=response.lng;
                    generateMarkers();
                    
                    fillProfile(response);
                   
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
   
});



function fillProfile(response)
{
    document.getElementById("profile-name").innerHTML = response.employe.prenom + " " + response.employe.nom.toUpperCase();
    document.getElementById("phone_number").innerHTML = response.employe.phone;
    document.getElementById("agence").innerHTML = response.employe.agence;
    document.getElementById("email").innerHTML = response.employe.mail;
    
    
    if (response.intervention.exists) {
        document.getElementById("current-intervention-status").innerHTML = "Intervention n°" + response.intervention.id + " en cours ...";
        // Get ul list
        let ul = $("#current-intervention-list");
        // Clear ul list
        ul.innerHtml = "";
        // Init ul list
        let li = document.createElement("li");
        let content = "<span class='bold'>Type:</span>" + response.currentIntervention.type;
        li.appendChild(document.createTextNode(""));
        li.innerHTML = content;
        ul.appendChild(li);
        li = document.createElement("li");
        content = "<span class='bold'>Date de la demande:</span>" + response.currentIntervention.date;
        li.appendChild(document.createTextNode(""));
        li.innerHTML = content;
        ul.appendChild(li);
        li = document.createElement("li");
        content = "<span class='bold'>Descritpion:</span>" + response.currentIntervention.description;
        li.appendChild(document.createTextNode(""));
        li.innerHTML = content;
        ul.appendChild(li);
        li = document.createElement("li");
        content = "<span class='bold'>Employé:</span>" + response.currentIntervention.employee;
        li.appendChild(document.createTextNode(""));
        li.innerHTML = content;
        ul.appendChild(li);
        switch (response.intervention.type)
        {
            case "Animal":
                li = document.createElement("li");
                content = "<span class='bold'>Type:</span>" + response.currentIntervention.type;
                li.appendChild(document.createTextNode(""));
                li.innerHTML = content;
                ul.appendChild(li);
                break;
            case "Delivery":
                li = document.createElement("li");
                content = "<span class='bold'>Objet:</span>" + response.currentIntervention.object;
                li.appendChild(document.createTextNode(""));
                li.innerHTML = content;
                ul.appendChild(li);
                li = document.createElement("li");
                content = "<span class='bold'>Entreprise:</span>" + response.currentIntervention.company;
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

