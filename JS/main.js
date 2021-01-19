$(function(){
    
    // Création du bouton "Ajouter un livre"
    var $addBook = createButton("button","addBook","Ajouter un livre").insertAfter("#myBooks .h2");

    // Création d'une section contenant l'affichage lors du clic sur "Ajouter un livre"
    var $form = $("<section id='formulaire'></section>");
    $(".h2").after($form);
    $form.append("<form action='' method='get' class='form'><fieldset><legend>Insérer le titre et l'auteur : </legend></fieldset></form>");
    var $title = $("fieldset").append("<label for='title'>Titre du livre * : </label><br/><input type='text' id='title' name='title' required/>");
    var $author = $("fieldset").append("<br/><label for='author'>Auteur * : </label><br/><input type='text' id='author' name='author' required /><br>");
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
    $bookTitle = $('<h4>Titre : </h4>');
    $titleOutput = $('<span class="bookTitle"></span>');
    $bookId = $('<h5>Id : </h5>');
    $idOutput = $('<span class="bookId">');
    $bookAuthor = $('<h5>Auteur : </h5>');
    $authorOutput = $('<span class="bookAuthor"></span>')
    $bookDescription = $('<h5>Description : </h5>');
    $descriptionOutput = $('<span class="bookDescription"></span>');
    $bookmarkLink = $('<a id="bookmark" href="#"></a>');
    $bookmarkIcon = $('<img src="logo/bookmark-regular.svg"/>');
    $bookPicture = $('<img class="unavailable" src="logo/unavailable.png"/>');
    $('#searchResults').append($bookModel);
    $($bookTitle).append($titleOutput);
    $('#bookModel').append($bookTitle);
    $($bookId).append($idOutput);
    $('#bookModel').append($bookId);
    $($bookAuthor).append($authorOutput);
    $('#bookModel').append($bookAuthor);
    $($bookDescription).append($descriptionOutput)
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
        var auteur = $(this).val();
        console.log(titre + auteur);
        var recherche = 'intitle:' + titre + '+inauthor:' + auteur ;
        if(titre.length>=3) {
            //& auteur.length>=3){      // S'il y a un minimum de 3 caractères, on lance l'appel AJAX
                $.ajax({
                    url : "https://www.googleapis.com/books/v1/volumes?q=" + recherche ,
                    method : "GET",
                    data : titre + auteur,
                    success : function(data){
                        console.log("ça fonctionne",data);
                        var htmlContent = "";
                        //var itemTemplate = $bookModel;
                        $(data.items).each(function(i){      // for(var i=0;i<data.items.length;i++){
                            var itemTemplate = $bookModel;
                            console.log(data.items[i]);
                            console.log("Titre : " + data.items[i].volumeInfo.title);
                            console.log("Auteur : " + data.items[i].volumeInfo.authors);
                            console.log(data.items[i].volumeInfo.description);
                            $titleOutput.text(data.items[i].volumeInfo.title);     // On implémente les données du titre reçues
                            $idOutput.text(data.items[i].volumeInfo.id);
                            $authorOutput.text(data.items[i].volumeInfo.authors);  // On implémente les données de l'auteur reçues
                            if ($descriptionOutput.text().length<200){
                            $descriptionOutput.text(data.items[i].volumeInfo.description);
                            }
                            // On limite la description à 200 caractères max
                            console.log($descriptionOutput.text().length);      
                            if($descriptionOutput.text().length>200){
                                console.log($descriptionOutput.text());
                                var desc = data.items[i].volumeInfo.description;
                                var sub = desc.substring(0,200);
                                console.log(sub);
                                $descriptionOutput.text(sub);
                                console.log($descriptionOutput.text().length); 
                            }
                            $(itemTemplate).clone().appendTo($searchResults);      
                        })    
                            
                            $("img").click(function(){
                                var src = ($(this).attr("src") === "logo/bookmark-regular.svg") ? "logo/bookmark-solid.svg":"logo/bookmark-regular.svg";
                                $(this).attr("src",src);
                            })
                    },
                    error : function(err){
                        console.log("ça plante",err);
                    }
                })
        }
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
    $("img").click(function(){
        var src = ($(this).attr("src") === "logo/bookmark-regular.svg") ? "logo/bookmark-solid.svg":"logo/bookmark-regular.svg";
        $(this).attr("src",src);
    })

    
});


