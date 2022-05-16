$(document).ready( function () {
    $('#bouton-connexion').on( 'click', function () { // Fonction appelée lors du clic sur le bouton

        console.log("clic sur le bouton de connexion"); // LOG dans Console Javascript
        $('#notification').html("Connexion..."); // Message pour le paragraphe de notification

        // Récupération de la valeur des champs du formulaire
        var champLogin = $('#champ-login').val();
        var champPassword = $('#champ-password').val();

        // Appel AJAX
        $.ajax({
            url: '../ActionServlet',
            method: 'POST',
            data: {
                todo: 'connect',
                login: champLogin,
                password: champPassword
            },
            dataType: 'json'
        })
        .done( function (response) { // Fonction appelée en cas d'appel AJAX réussi
            console.log('Response',response); // LOG dans Console Javascript
            if (response.connexion) {
                $('#notification').html("Connexion OK");  // Message pour le paragraphe de notification
                // TODO: afficher les informations du client dans la notification
                // Exemple: Connexion de Ada Lovelace (ID 1)
                window.location="./client.html"
            }
            else {
                $('#notification').html("Erreur de Connexion"); // Message pour le paragraphe de notification
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
        