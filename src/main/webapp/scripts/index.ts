/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/TypeScriptDataObjectTemplate.ts to edit this template
 */

import { $ } from '../../../../node_modules/jquery/dist/jquery.min.js';

$(document).ready(function() {

    $(".sidebar-menu > li.have-children a").on("click", function(i) {
        i.preventDefault();
        if (!$(this).parent().hasClass("active")) {
            $(".sidebar-menu li ul").slideUp();
            $(this).next().slideToggle();
            $(".sidebar-menu li").removeClass("active");
            $(this).parent().addClass("active");
        }
        else {
            $(this).next().slideToggle();
            $(".sidebar-menu li").removeClass("active");
        }
    });
    
    //$(".sidebar-menu").find("a").on("click, function(i) {
    
    //});
});

$(document).ready(function() {
    $('#bouton-connexion').on('click', function() { // Fonction appelée lors du clic sur le bouton

        console.log("clic sur le bouton de connexion"); // LOG dans Console Javascript
        $('#notification').html("Connexion..."); // Message pour le paragraphe de notification

        // Récupération de la valeur des champs du formulaire
        var champLogin = $('#champ-login').val();
        var champPassword = $('#champ-password').val();

        // Appel AJAX
        $.ajax({
            url: './ActionServlet',
            method: 'POST',
            data: {
                todo: 'connecter',
                login: champLogin,
                password: champPassword
            },
            dataType: 'json'
        })
            .done(function(response) { // Fonction appelée en cas d'appel AJAX réussi
                console.log('Response', response); // LOG dans Console Javascript
                if (response.connexion) {
                    $('#notification').html("Connexion OK " + response.client.prenom + " " + response.client.nom);  // Message pour le paragraphe de notification
                    // TODO: afficher les informations du client dans la notification
                    // Exemple: Connexion de Ada Lovelace (ID 1)
                }
                else {
                    $('#notification').html("Erreur de Connexion"); // Message pour le paragraphe de notification
                }
            })
            .fail(function(error) { // Fonction appelée en cas d'erreur lors de l'appel AJAX
                console.log('Error', error); // LOG dans Console Javascript
                alert("Erreur lors de l'appel AJAX");
            })
            .always(function() { // Fonction toujours appelée

            });
    });
});