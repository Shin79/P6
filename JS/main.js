$(function(){
    
    // Création du bouton "Ajouter un livre"
    var $addBook = createButton("button","addBook","Ajouter un livre").insertAfter("#myBooks .h2");

    // Création d'une section contenant l'affichage lors du clic sur "Ajouter un livre"
    var $form = $("<section id='formulaire'></section>");
    $(".h2").after($form);
    $form.append("<form action='' method='get' class='form'><fieldset><legend>Insérer le titre et l'auteur : </legend></fieldset></form>");
    var $title = $("fieldset").append("<label for='title'>Titre du livre * : </label><br/><input type='text' id='title' name='title' required pattern='[\w]{5,}'/>");
    var $author = $("fieldset").append("<br/><label for='author'>Auteur * : </label><br/><input type='text' id='author' name='author' required pattern='[a-zA-Z]{3,}'/><br>");
    var $search = createButton("submit",'search',"Chercher").appendTo("fieldset");
    var $cancel = createButton("reset",'cancel',"Annuler");
    $cancel.appendTo("fieldset");
    
    // On cache le formulaire sur la page initiale
    $form.hide();
    
    // Création d'une section résultats de recherche 
    var $searchResults = $("<section id='searchResults'></section>");
    $("#content").before($searchResults);
    $searchResults.prepend("<h2>Résultats de recherche</h2>"); 
    $bookModel =  $('<div id="bookModel"></div>');
    $bookTitle = $('<h4>Titre : <span class="bookTitle"></span></h4>');
    $bookId = $('<h5>Id : <span class="bookId"></span></h5>');
    $bookAuthor = $('<h5>Auteur : <span class="bookAuthor"></span></h5>');
    $bookDescription = $('<h5>Description : <span class="bookDescription"></span></h5>');
    $bookmarkLink = $('<a id="bookmark" href="#"></a>');
    $bookmarkIcon = $('<img src="logo/bookmark-regular.svg"/>');
    $bookPicture = $('<img class="unavailable" src="logo/unavailable.png"/>');
    $('#searchResults').append($bookModel);
    $('#bookModel').append($bookTitle);
    $('#bookModel').append($bookId);
    $('#bookModel').append($bookAuthor);
    $('#bookModel').append($bookDescription);
    $('#bookModel').append($bookPicture);
    $($bookTitle).append($bookmarkLink);
    $($bookmarkLink).prepend($bookmarkIcon);
    
    // On ajoute l'évènement click sur le bouton "Ajouter un livre"
    $addBook.click(function(){
        $form.show();
        $addBook.hide();
    });

    // On ajoute l'évènement click sur le bouton "Annuler"
    $cancel.click(function(){
        $form.hide();
        $addBook.show();
    })
    $("#title").keyup(function(){
        var titre = $(this).val();
        console.log(titre);
        $.ajax({
            url : "https://www.googleapis.com/books/v1/volumes?q=ISBN:",
            type : "GET",
            data : "user=" + titre,
            success : function(data){
                console.log("ça fonctionne",data);
            },
            error : function(err){
                console.log("ça plante",err);
            }
        })
    })
    $("#author").keyup(function(){
        var auteur = $(this).val();
        console.log(auteur);
    })
    $search.click(function(){
        console.log($("#title").val());
        console.log($("#author").val());
    })

    // On switche le bookmark au clic
    $bookmarkIcon.click(function(){
        var src = ($(this).attr("src") === "logo/bookmark-regular.svg") ? "logo/bookmark-solid.svg":"logo/bookmark-regular.svg";
        $(this).attr("src",src);
    })

    // Requête AJAX
    $.ajax({
        url : "https://www.googleapis.com/books/v1/volumes?q=ISBN:",
        type : "GET",
        success : function(data){
            console.log("ça fonctionne",data);
        },
        error : function(err){
            console.log("ça plante",err);
        }
    })
});


