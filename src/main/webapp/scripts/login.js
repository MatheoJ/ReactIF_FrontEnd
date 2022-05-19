var mode = "Client";

$(document).ready( function () {
    $('#bouton-mode').on( 'click', function () { // Fonction appelée lors du clic sur le bouton
        let btn = document.getElementById("bouton-mode");
        console.log(mode);
        if(mode==="Client"){
            btn.textContent = "Passer en mode Client";
            mode = "Employe";
        }
        else if (mode==="Employe"){
            btn.textContent = "Passer en mode Employe";
            mode = "Client";
        }        
    });
    
    $('#login').on( 'click', function () { // Fonction appelée lors du clic sur le bouton

        alertify.set('notifier', 'delay', 2);
        alertify.success("Connexion ...");

        // Récupération de la valeur des champs du formulaire
        var champLogin = $('#champ-login').val();
        var champPassword = $('#champ-password').val();
        let todo = null;
        if(mode==="Client"){
            todo = "connect";
        }
        else if (mode==="Employe"){
            todo = "connectEmploye";
        }
        // Appel AJAX
        $.ajax({
            url: '../ActionServlet',
            method: 'POST',
            data: {
                todo: todo,
                login: champLogin,
                password: champPassword
            },
            dataType: 'json'
        })
        .done( function (response) { // Fonction appelée en cas d'appel AJAX réussi
            console.log('Response',response); // LOG dans Console Javascript
            if (response.connection) {
                // Redirect user
                // alertify.set('notifier', 'delay', 2);
                // alertify.success("Bonjour " + response.client.first_name + " !");
        
                // Exemple: Connection de Ada Lovelace (ID 1)
                
                if(mode==="Client"){
                    window.location="./client.html"
                }
                else if (mode==="Employe"){
                    window.location="./employe.html"
                }
            }
            else {
                alertify.set('notifier', 'delay', 5);
                alertify.error("Identifiants invalides");
                // Message pour le paragraphe de notification
            }
        })
        .fail( function (error) { // Fonction appelée en cas d'erreur lors de l'appel AJAX
            console.log('Error',error); // LOG dans Console Javascript
            alertify.set('notifier', 'delay', 5);
            alertify.error("Erreur lors de l'appel AJAX.\nVeuillez réessayer plus tard.");
        })
        .always( function () { // Fonction toujours appelée

        });
    });
    
});
        