$(function(){
    
    // Création du bouton "Ajouter un livre"
    var $addBook = createButton("button","addBook","Ajouter un livre").insertAfter("#myBooks .h2");

    // Création d'une section contenant l'affichage lors du clic sur "Ajouter un livre"
    var $form = $("<section id='formulaire'></section>");
    $(".h2").after($form);
    $form.append("<form action='' method='get' class='form'><fieldset><legend>Insérer le titre et l'auteur : </legend></fieldset></form>");
    var $title = $("fieldset").append("<label for='title'>Titre du livre * : </label><br/><input type='text' id='titleInput' name='title' required/>"); 
    var $author = $("fieldset").append("<br/><label for='author'>Auteur * : </label><br/><input type='text' id='authorInput' name='author' required/><br>"); 
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
    $idOutput = $('<span class="bookId"></span>');
    $bookAuthor = $('<h5>Auteur : </h5>');
    $authorOutput = $('<span class="bookAuthor"></span>')
    $bookDescription = $('<h5>Description : </h5>');
    $descriptionOutput = $('<span class="bookDescription"></span>');
    $bookmarkIcon = $('<img id="bookmark" src="logo/bookmark-regular.svg"/>');
    $bookPicture = $('<img class="unavailable" src="logo/unavailable.png" alt="couverture du livre" title="Couverture"/>');
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
    $($bookTitle).prepend($bookmarkIcon);
    
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
    $(".search").click(function(event){
        event.preventDefault();
        var titre = $("#titleInput").val();
        var auteur = $("#authorInput").val();
        console.log(titre + auteur);
        var recherche = 'intitle:' + titre + '+inauthor:' + auteur ;
        if(titre.length>=3 && auteur.length>=3) {      // S'il y a un minimum de 3 caractères, on lance l'appel AJAX
                $.ajax({
                    url : "https://www.googleapis.com/books/v1/volumes?q=" + recherche ,
                    method : "GET",
                    data : titre + auteur,
                    success : function(data){
                        console.log("ça fonctionne",data);
                        console.log(titre);
                        var htmlContent = "";
                        //var itemTemplate = $bookModel;
                        $(data.items).each(function(i){      // for(var i=0;i<data.items.length;i++){
                            var itemTemplate = $bookModel;
                            console.log(data.items[i]);
                            console.log("Titre : " + data.items[i].volumeInfo.title);
                            console.log("Auteur : " + data.items[i].volumeInfo.authors);
                            console.log(data.items[i].volumeInfo.description);
                            $titleOutput.text(data.items[i].volumeInfo.title);     // On implémente les données du titre reçues
                            $idOutput.text(data.items[i].id);
                            $authorOutput.text(data.items[i].volumeInfo.authors);  // On implémente les données de l'auteur reçues
                            
                            // On implémente l'image si présent dans la DB sinon image par défaut
                            let picture;
                            if(!data.items[i].volumeInfo.imageLinks){
                                picture = "logo/unavailable.png"; 
                            } else {
                                picture = data.items[i].volumeInfo.imageLinks.thumbnail;                  
                            }
                            $bookPicture.attr('src',picture);
                            //$(".unavailable").attr("src",data.items[i].volumeInfo.imageLinks === undefined ? "logo/unavailable.png" : data.items[i].volumeInfo.imageLinks.thumbnail);
                            
                            // On implémente les données de la description en la limitant à 200 caractères max
                            console.log($descriptionOutput.text().length);   
                            var desc = data.items[i].volumeInfo.description;   
                            if(desc){
                                console.log($descriptionOutput.text());
                                var sub = desc.length>200 ? desc.substring(0,200) +'...' : desc;
                                console.log(sub);
                                $descriptionOutput.text(sub);
                                console.log($descriptionOutput.text().length); 
                            } else{
                                $descriptionOutput.text("Pas de description");
                            }
                            $(itemTemplate).clone().appendTo($searchResults);      
                            
                            // On switche le bookmark au clic
                            $bookmarkIcon.click(function(e){
                                e.preventDefault();
                                console.log(data.items[i].id)
                                var src = ($(this).attr("src") === "logo/bookmark-regular.svg") ? "logo/bookmark-solid.svg":"logo/bookmark-regular.svg";
                                $(this).attr("src",src);
                            })
                        })    
                            
                            
                    },
                    error : function(err){
                        console.log("ça plante",err);
                    }
                })
        } else{
            
        }
    })
    $("#author").keyup(function(){
        var auteur = $(this).val();
        console.log(auteur);
    })
    $search.click(function(){
        console.log($("#titleInput").val());
        console.log($("#authorInput").val());
    })

    


    
});


