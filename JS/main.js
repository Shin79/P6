$(function(){
    
    // Création du bouton "Ajouter un livre"
    var $addBook = createButton("button","addBook","Ajouter un livre").insertAfter("#myBooks .h2");

    // Création d'une section contenant l'affichage du formulaire lors du clic sur "Ajouter un livre"
    var $form = $("<section id='formulaire'></section>");
    $(".h2").after($form);
    $form.append("<form action='' method='get' id='mainForm'><fieldset><legend>Insérer le titre et l'auteur : </legend></fieldset></form>");
    $("fieldset").append("<label for='title'>Titre du livre * : </label><br/><input type='text' id='titleInput' name='title' required/>"); 
    $("fieldset").append("<br/><label for='author'>Auteur * : </label><br/><input type='text' id='authorInput' name='author'required/><br>"); 
    createButton("submit",'search',"Rechercher").appendTo("fieldset");
    $('.search').after('<div class="errorMessage"></div>');
    var $cancel = createButton("reset",'cancel',"Annuler");
    $cancel.appendTo("fieldset");

    
    // On cache le formulaire sur la page initiale
    $form.hide();
    
    // Création d'une section résultats de recherche 
    var $searchResults = $("<section id='searchResults'></section>");
    $("#content").before($searchResults);
        

    // On ajoute l'évènement click sur le bouton "Ajouter un livre"
    $addBook.click(function(){
        $form.show();
        $addBook.hide();
    });

    // On ajoute l'évènement click sur le bouton "Annuler"
    $cancel.click(function(){
        $form.hide();
        $addBook.show();
        $searchResults.hide();
        $(".searchR").hide();
    })
    
    // On ajoute un tableau pour afficher les favoris
    $("#content").append("<div class='maPochList'></div>");
    displayFavorite();
    
    // On ajoute l'évènement click sur le bouton "Rechercher"
    console.log(sessionStorage.getItem("savedBooks"));
    $(".search").click(function(event){
        event.preventDefault();
        $("#searchResults").empty();
        $(".searchR").empty();
        $(".errorMessage").text("");
        var titre = $("#titleInput").val();
        var auteur = $("#authorInput").val();
        console.log(titre + auteur);
        var recherche = 'intitle:' + titre + '+inauthor:' + auteur ;
        if(titre!=""  && auteur!="") {      // Si les deux champs sont remplis, on lance la requête AJAX
                $.ajax({
                    url : "https://www.googleapis.com/books/v1/volumes?q=" + recherche ,
                    method : "GET",
                    data : titre + auteur,
                    success : function(data){
                        console.log("ça fonctionne",data);
                        search = data.items;
                        if(data.totalItems === 0){
                            $(".errorMessage").text("Désolé, aucun livre n'a été trouvé");
                        }else{
                            $searchResults.before("<h2 class='searchR'><hr/>Résultats de recherche</h2>");
                            $(data.items).each(function(i){      // for(var i=0;i<data.items.length;i++){
                                console.log(data.items[i]);
                                console.log("Titre : " + data.items[i].volumeInfo.title);
                                console.log("Auteur : " + data.items[i].volumeInfo.authors);
                                console.log(data.items[i].volumeInfo.description);
                                $searchResults.append(createBook(data.items[i]));
                                // On ajoute l'évènement click sur l'icône bookmark
                                $bookmarkIcon.click(function(){
                                    bookStorage(data.items[i].id);
                                })
                            })    
                        }
                    },
                    error : function(err){
                        console.log("ça plante",err);
                    }
                })
                $searchResults.show();
        } else{   // Sinon, on lance un message d'erreur 
            $(".errorMessage").text("Informations manquantes. Vous devez remplir les deux champs");
        }
    })
    
});


