var googleMapInstance = null;
var interventionList = null;
var latTab = null;
var lngTab = null;

var oldDiv = "profileEmploye";


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

   
    
    for (var i in interventionList) {
        console.log(i);
        console.log(interventionList.length);
        var iconImage = null; // marker par défaut   
        
        //Si on est dans les dernière pair de coordonnées alors ce sont celle de l'agence 
        
        var marker = new google.maps.Marker({
                map: googleMapInstance,
                position: {lat: latTab[i], lng: lngTab[i]},
                title: 'Intervention #' + interventionList[i].id,
                icon: iconImage
        });
        attachInfoWindow(
            marker, infowindow,
            '<div><strong><a ' + i + '">Intervention #' + interventionList[i].id + '</a></strong><br/>Ceci est la position de l\'intervention ' + interventionList[i].id  + '</div>'
        );
        
        
        
    }
    
    var j=interventionList.length;
    
    marker = new google.maps.Marker({
                map: googleMapInstance,
                position: {lat: latTab[j], lng: lngTab[j]},
                title: 'Angence',
                icon: {url: '../images/home.png', scaledSize: new google.maps.Size(32, 32)}
            });
            attachInfoWindow(
                marker, infowindow,
                '<div><strong><a ' + j + '">Agence' + '</a></strong><br/>Ceci est la position de l\'agence ' + '</div>'
    );
    

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
    $(".redirect-link").on("click", function (i) {
        i.preventDefault();
        let todo = $(this).attr('data-todo');
        
        console.log(todo);
        // Appel AJAX
        let href = $(this).attr('href');
        // If the link isn't empty
        if (href !== "#") {
            // Appel AJAX
            console.log("on arrive la");
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
                            
                        } else {
                            togglePanel(todo);
                            switch (todo)
                            {
                                case "profileEmploye":
                                    // Destroy previous charts
                                    fillProfile(response);
                                    break;
                                case "historyEmploye":
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
    $('#clotureButton').on( 'click', function () { // Fonction appelée lors du clic sur le bouton
        
        var statut = $('#selectStatut').val();
        var commentaire = $('#commentText').val();
        $.ajax({
                url: '../ActionServlet',
                method: 'POST',
                data: {
                    todo: "endIntervention",
                    statut: statut,
                    commentaire: commentaire
                },
                dataType: 'json'
            })
        .done( function (response) { // Fonction appelée en cas d'appel AJAX réussi
            console.log('Response',response); // LOG dans Console Javascript
            if (response.endSuccess) {
                location.reload();
            }
            else {
                
            }
        })
        .fail( function (error) { // Fonction appelée en cas d'erreur lors de l'appel AJAX
            console.log('Error',error); // LOG dans Console Javascript
            alert("Erreur lors de l'appel AJAX");
        })
        .always( function () { // Fonction toujours appelée

        }); 
        
    });
   
});



function fillProfile(response)
{
    document.getElementById("profile-name").innerHTML = response.employe.prenom + " " + response.employe.nom.toUpperCase();
    document.getElementById("phone_number").innerHTML = response.employe.phone;
    document.getElementById("agence").innerHTML = response.employe.agence;
    document.getElementById("email").innerHTML = response.employe.mail;
    document.getElementById("distance").innerHTML = response.distance;
    
    
    if (response.currentIntervention.exists) {
        document.getElementById("current-intervention-status").innerHTML = "Intervention n°" + response.currentIntervention.id + " en cours ...";
        document.getElementById("coltureIntervention").style.display = "block";
        // Get ul list
        let ul = document.getElementById("current-intervention-list");
        // Clear ul list
        ul.innerHtml = "";
        // Init ul list
        let li = document.createElement("li");
        let content = "<span class='bold'>Type: </span>" + response.currentIntervention.type;
        li.appendChild(document.createTextNode(""));
        li.innerHTML = content;
        ul.appendChild(li);
        li = document.createElement("li");
        content = "<span class='bold'>Date de la demande: </span>" + response.currentIntervention.date;
        li.appendChild(document.createTextNode(""));
        li.innerHTML = content;
        ul.appendChild(li);
        li = document.createElement("li");
        content = "<span class='bold'>Descritpion: </span>" + response.currentIntervention.description;
        li.appendChild(document.createTextNode(""));
        li.innerHTML = content;
        ul.appendChild(li);
        li = document.createElement("li");
        content = "<span class='bold'>Client: </span>" + response.currentIntervention.client.first_name + " " + response.currentIntervention.client.last_name.toUpperCase();
        li.appendChild(document.createTextNode(""));
        li.innerHTML = content;
        ul.appendChild(li);
        li = document.createElement("li");
        content = "<span class='bold'>Adresse: </span>" + response.currentIntervention.adresse;
        li.appendChild(document.createTextNode(""));
        li.innerHTML = content;
        ul.appendChild(li);
        switch (response.currentIntervention.type)
        {
            case "Animale":
                li = document.createElement("li");
                content = "<span class='bold'>Type: </span>" + response.currentIntervention.type;
                li.appendChild(document.createTextNode(""));
                li.innerHTML = content;
                ul.appendChild(li);
                break;
            case "Livraison":
                li = document.createElement("li");
                content = "<span class='bold'>Objet: </span>" + response.currentIntervention.object;
                li.appendChild(document.createTextNode(""));
                li.innerHTML = content;
                ul.appendChild(li);
                li = document.createElement("li");
                content = "<span class='bold'>Entreprise: </span>" + response.currentIntervention.company;
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
        // Client
        th = document.createElement("th");
        content = "<span class='bold'>" + intervention.client.first_name + " " + intervention.client.last_name.toUpperCase() + "</span>";
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

function togglePanel(newDiv)
{
    if (oldDiv !== null)
    {
        document.getElementById(oldDiv).style.display = "none";
    }
    oldDiv = newDiv;
    document.getElementById(newDiv).style.display = "flex";
}
