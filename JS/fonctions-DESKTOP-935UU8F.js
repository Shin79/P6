
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
    $($bookTitle).append($titleOutput);
    $($bookTitle).prepend($bookmarkIcon);
    $($bookId).append($idOutput);
    $($bookAuthor).append($authorOutput);
    $($bookDescription).append($descriptionOutput)
    $bookModel.append($bookTitle);
    $bookModel.append($bookId);
    $bookModel.append($bookAuthor);
    $bookModel.append($bookDescription);
    $bookModel.append($bookPicture);
    
    // On switche le bookmark au clic
   $bookmarkIcon.click(function(e){
    e.preventDefault();
    console.log(book.id)
    var src = ($(this).attr("src") === "logo/bookmark-regular.svg") ? "logo/bookmark-solid.svg":"logo/bookmark-regular.svg";
    $(this).attr("src",src);
    
    
    })
    return $bookModel;
};
function deleteBook(bookId) {
  pochList = pochList.filter(book => book.id != bookId);
  sessionStorage.setItem('savedBooks', JSON.stringify(pochList));
  alert( "Le livre a été supprimé de vos favoris ");
  console.log(pochList);
  displayFavorite()
}
var pochList = [];
    if (sessionStorage.getItem("savedBooks")) {
        pochList = JSON.parse(sessionStorage.getItem("savedBooks"));
        displayFavorite();
      }
function bookStorage(bookId){
    var book = search.filter(book =>book.id === bookId);
    console.log(book);
    var title = book[0].volumeInfo.title;   
    var author = book[0].volumeInfo.authors;
    var id = book[0].id;
    var image;
  if(!book[0].volumeInfo.imageLinks) {
    image = "logo/unavailable.png";
  } else {
    image = book[0].volumeInfo.imageLinks.smallThumbnail;
  }
  var description = book[0].volumeInfo.description;
    if(description){
        description = description.length>200 ? description.substring(0,50) +'...' : description; 
    } else{
        description = "Pas de description";
    }
  const bookSaved = {
    id: id,
    title: title,
    author: author,
    image: image,
    description: description
  }
  console.log(bookSaved);
  if (pochList !== undefined) {
    console.log(pochList);
    if (pochList.some(book => book.id === bookSaved.id)) {
      alert("Vous ne pouvez ajouter deux fois le même livre!");
    } else {
      pochList.push(bookSaved);
      sessionStorage.setItem('savedBooks', JSON.stringify(pochList));
      alert("Vous avez ajouté un nouveau livre dans les favoris!");
    }
  } else {
    pochList = [];

    pochList.push(bookSaved);
    sessionStorage.setItem('savedBooks', JSON.stringify(pochList));
    alert("Vous avez ajouté un premier livre dans les favoris !");
  }
  displayFavorite();
}
// Fonction pour afficher le favori
function displayFavorite(){
    
    $(".maPochList").html("");
    for(var i=0;i<pochList.length;i++){
      $bookRow = $("#table").append(`<tr><td scope='row'>${pochList[i].title}</td><td>${pochList[i].id}</td><td>${pochList[i].author}</td><td class=""dscpt>${pochList[i].description}</td><td><img src='${pochList[i].image}'/></td><td><a ><img src="logo/trash-solid.svg" class="trash" onclick="deleteBook('${pochList[i].id}')"/></a></td></tr>`)
     
    }
    
} 

