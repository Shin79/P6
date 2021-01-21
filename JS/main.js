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
                        $(data.items).each(function(i){      // for(var i=0;i<data.items.length;i++){
                            console.log(data.items[i]);
                            console.log("Titre : " + data.items[i].volumeInfo.title);
                            console.log("Auteur : " + data.items[i].volumeInfo.authors);
                            console.log(data.items[i].volumeInfo.description);
                            $searchResults.append(createBook(data.items[i]));
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


