// Fonction pour la création d'un bouton
function createButton(type,classe,value) {
    return  $('<input/>',{
        type : type,
        class : classe,
        value : value
    });
}
// Fonction pour la création d'un template de présentation de livre
function createBook(book){
    $bookModel =  $('<div id="bookModel"></div>');
    $bookTitle = $('<h4>Titre : </h4>');
    $titleOutput = $('<span class="bookTitle">' + book.volumeInfo.title + '</span>');
    $bookId = $('<h5>Id : </h5>');
    $idOutput = $('<span class="bookId">' + book.id + '</span>');
    $bookAuthor = $('<h5>Auteur : </h5>');
    $authorOutput = $('<span class="bookAuthor">' + book.volumeInfo.authors + '</span>')
    $bookDescription = $('<h5>Description : </h5>');
    let txt;
    if(book.volumeInfo.description){
        txt = book.volumeInfo.description.length>200 ? book.volumeInfo.description.substring(0,200) +'...' : book.volumeInfo.description; 
    } else{
        txt = "Pas de description";
    }
    $descriptionOutput = $('<span class="bookDescription">' + txt + '</span>');
    $bookmarkIcon = $('<img id="bookmark" src="logo/bookmark-regular.svg"/>');
    let picture;
    if(!book.volumeInfo.imageLinks){
        picture = "logo/unavailable.png"; 
    } else {
        picture = book.volumeInfo.imageLinks.thumbnail;                  
    }
    $bookPicture = $('<img class="unavailable" src="' + picture + '" alt="couverture du livre" title="Couverture"/>');        
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
    
    // On switche le bookmark au clic
    $bookmarkIcon.click(function(e){
        e.preventDefault();
        console.log(books.id)
        var src = ($(this).attr("src") === "logo/bookmark-regular.svg") ? "logo/bookmark-solid.svg":"logo/bookmark-regular.svg";
        $(this).attr("src",src);
    })
    return $bookModel;
    }