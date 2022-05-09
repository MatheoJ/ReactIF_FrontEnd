import '../node_modules/jquery/dist/jquery.min.js';

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

    $(".sidebar-menu").find("a").on("click", function(i) {
        i.preventDefault();
        // Appel AJAX
        let href = $(this).attr('href');
        $.ajax({
            url: href,
            type: 'GET'
        })
            .done(function(response) { // Fonction appelée en cas d'appel AJAX réussi
                $('#content').html($(response).find('#content').html());
            })
            .fail(function(error) { // Fonction appelée en cas d'erreur lors de l'appel AJAX
                console.log('Error', error); // LOG dans Console Javascript
                alert("La page n'a pas pu être chargée");
            });
    });
});