
$(document).ready( function () {
    
    $('#signup').on( 'click', function () { // Fonction appelée lors du clic sur le bouton

        alertify.set('notifier', 'delay', 2); 
        alertify.success("Inscription ...");

        // Récupération de la valeur des champs du formulaire
        var lastName = $('#last_name').val();
        var firstName = $('#first_name').val();
        var email = $('#email').val();
        var phone = $('#phone').val();
        var address = $('#address').val();
        var password = $('#password').val();
        var confirmPassword = $('#confirm_password').val();
        var birthDate = $('#birth_date').val();
        console.log(birthDate);
        
        // Appel AJAX
        $.ajax({
            url: '../ActionServlet',
            method: 'POST',
            data: {
                todo: "signup",
                last_name: lastName,
                first_name: firstName,
                email: email,
                phone: phone,
                address: address,
                password: password,
                confirm_password: confirmPassword,
                birth_date: birthDate
            },
            dataType: 'json'
        })
        .done( function (response) { // Fonction appelée en cas d'appel AJAX réussi
            console.log('Response',response); // LOG dans Console Javascript
            if (!response.error) {
                // Redirect user
                window.location="./client.html"
            }
            else {
                alertify.set('notifier', 'delay', 5);
                alertify.error(response.errorMessage);
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
        