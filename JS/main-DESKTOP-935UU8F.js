$(function(){
    
    // Création du bouton "Ajouter un livre"
    var $addBook = $('<input/>',{
        type : "button",
        class : "addBook",
        value : "Ajouter un livre"
    }).insertAfter("#myBooks .h2");

    // Création d'une div contenant l'affichage lors du clic sur "Ajouter un livre"
    var $form = $('.h2').after("<section id='formulaire'></section>");
    $form.append("<form action='' method='get' class='form'><fieldset><legend>Insérer le titre et l'auteur : </legend></fieldset></form>");
    var $title = $("fieldset").append("<label id='title'>Titre du livre * : </label><br/><input type='text' id='title' name='title' required pattern='[\W]{5,}'/>");
    var $author = $("fieldset").append("<br/><label id='author'>Auteur * : </label><br/><input type='text' id='author' name='author' required pattern='[a-zA-Z]{3,}'/><br>");
    var $search = $("<input/>",{
        type : "submit",
        class : "search",
        value : "Rechercher"
    }).appendTo("fieldset");
    var $cancel = $("<input/>",{
        type : "reset",
        class : "cancel",
        value : "Annuler"
    });
    $cancel.appendTo("fieldset");
    
    // On cache le formulaire sur la page initiale
    $($form).children().hide();
    
    // On ajoute l'évènement click sur le bouton "Ajouter un livre"
    $($addBook).click(function(){
        $($form).children().show();
        $($addBook).hide();
    });

    // On ajoute l'évènement click sur le bouton "Annuler"
    $($cancel).click(function(){
        $($form).children().hide();
        $($addBook).show();
    })
});