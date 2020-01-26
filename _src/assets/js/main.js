'use strict';

const elementHeader = document.querySelector ('.header');
const elementForm = document.querySelector ('#formSearch');
const elementInput = document.querySelector ('#inputSearch');
const elementButton = document.querySelector ('#buttonSearch');
const elementContainResults = document.querySelector ('#resultsContainer');
const elementResultsList = document.querySelector ('#resultList');
const elementFavList = document.querySelector ('#favouriteList');
const elementButtonReset = document.querySelector('#btnReset');
const elementeValidation = document.querySelector ('#textAlertForm');
const elemntSectionfav = document.querySelector ('#sectionfavList');
const urlBase = 'http://api.tvmaze.com/search/shows?q=';
const imgDefault = 'https://via.placeholder.com/210x295/ffffff/666666/? text=TV.';

let favouriteSerie = [];//creo un array vacio para meter dentro los fav que selecciono 

//conectar con la API 
const conectSearchHandler = () =>{
    const inputSearchValue = elementInput.value.toLowerCase(); 
    fetch(urlBase + inputSearchValue)
    .then (response => response.json())
    .then (dataFromSearch => {
        console.log(dataFromSearch);
        fillInput();
        showSearchResults(dataFromSearch);
        transitionHeader();})
}

//validar formulario lleno o no 
const fillInput =()=>{
    if(elementInput.value === ''){
        console.log('rellenar campos')
        elementInput.classList.add('input-no-valid');
        elementInput.setAttribute('placeholder', 'Nombre de la serie')
    }else{
        elementInput.classList.remove('input-no-valid');
    }
}

//funcion del para meter datos en local storage 
function setLocalStorage () {
    localStorage.setItem('favouriteSerie',JSON.stringify(favouriteSerie));
  
}
 //función para que los favoritos estén simpre cargados aunque se refresque la página
function getLocalStorage () {
    let localStorageGet = localStorage.getItem('favouriteSerie', favouriteSerie);
    if(localStorageGet === null){
        elemntSectionfav.classList.add('hidden')
    }else{
        elemntSectionfav.classList.remove('hidden');
        favouriteSerie = JSON.parse(localStorageGet);
        paintFavSeries(favouriteSerie);
    }; 
};

//pintar resultados de búsqueda

const showSearchResults = (data) =>{
    for (let i = 0; i<data.length; i++){
        const createElementLi = document.createElement ('li');
        createElementLi.classList.add('liSearch');
        createElementLi.setAttribute ('id', data[i].show.id);
        //creo una img
        const createElementImg = document.createElement ('img');
        if(data[i].show.image== null){
            createElementImg.src = imgDefault;
        }else{
            createElementImg.src = data[i].show.image.medium;
        }
        createElementImg .setAttribute ('class', 'imgSerie');
        //creo un span
        const createElementSpan = document.createElement ('span');
        createElementSpan .setAttribute ('class', 'spanSerie');
        const createElementeTitle = document.createTextNode(data[i].show.name);
        //meto cada cosa en su contenedor
        createElementSpan.appendChild(createElementeTitle);
        createElementLi.appendChild (createElementImg);
        createElementLi.appendChild (createElementSpan);
        elementResultsList.appendChild (createElementLi);
       lisenFavorites();
    };
};

const lisenFavorites =()=>{
    const favoritesItems = document.querySelectorAll ('.liSearch');
    //hay que recorrer los elementos que te dan del selector all y añadirle a todos el add.eventlist
    for (const favoriteItem of favoritesItems) {
        favoriteItem.addEventListener('click', checkFavList);
        //le añadicmo el listener para que se ejecute la funcion con el toggle que va aañadir y quitar de favoritos cuendo pinchas 
    }
}

//funcion buscare array y pintar favoritos 
function checkFavList () {
    const elementFavLi = event.currentTarget;
    const elementFavSpan = elementFavLi.querySelector('.spanSerie')
    const elementFavImg = elementFavLi.querySelector('.imgSerie')
    elemntSectionfav.classList.remove('hidden');
    elementFavLi.classList.toggle('selected')


   //hacemos un if, si elelelento pulsado tiene la clase selccionada se mete en fav 
    if (elementFavLi.classList.contains('selected')) {
       const favorites = {
           "name": elementFavSpan.innerHTML,
           "image": elementFavImg.src,
           "id": elementFavLi.id   
       }
       favouriteSerie.push(favorites);
       localStorage.setItem('favouriteSerie',JSON.stringify(favouriteSerie));
       paintFavSeries(favouriteSerie)
       //si no lo que está pintado en fav es lo que hay en el local y se localciza el id del elemento y si ya esta se va a sacar con el toggle, para eso se usa find index y ese que se encuentra se saca con findindex 
       } else if (!elementFavLi.classList.contains('selected')) {
           favouriteSerie = JSON.parse(localStorage.getItem('favouriteSerie'));
           const localIndex = findIndex(elementFavLi.id, favouriteSerie);
           favouriteSerie.splice(localIndex, 1);
           localStorage.setItem('favouriteSerie',JSON.stringify(favouriteSerie));
           paintFavSeries(favouriteSerie)    
       }
       console.log (favouriteSerie);
   }
   
   // buscador indice array, recorremos toda la longitud del array fav y se devuelve el id del elemento localizado 
   function findIndex(id, array){
       for (let i=0; i < array.length; i++) {
           if (array[i].id === id) {
               return array.indexOf(array[i]);
           }
       }
   }


   const paintFavSeries =(itemsFavourites)=>{
    elementFavList.innerHTML = '';
    for (let item of itemsFavourites){
        const elementLI = document.createElement('li');
        elementLI.setAttribute ('id', item.id)
        elementLI.classList.add ('favLi');
        const elementDiv = document.createElement('div')
        const elementSpanFav = document.createElement('span');
        elementSpanFav .setAttribute ('class', 'spanfav');

        const elementImgFav = document.createElement('img');
        const elementFavRemove = document.createElement ('button');
        elementFavRemove.setAttribute('type', 'button');
        elementFavRemove.setAttribute ('class', 'btnRemove');
        elementFavRemove.classList.add ('buttonRemove')
        elementFavRemove.innerHTML ='x';
        elementImgFav.classList.add('imgStyle');
        elementImgFav.src = item.image;
        elementSpanFav.innerHTML = item.name;

        elementLI.appendChild (elementFavRemove);
        elementDiv.appendChild (elementSpanFav);
        elementDiv.appendChild (elementImgFav);
        elementLI.appendChild(elementDiv);
        elementFavList.appendChild (elementLI);  
        //añadimos el listener al botón con la X para eliminar el fav
        elementFavRemove.addEventListener ('click', selectButtonRemoveFav);
    };
};


const selectButtonRemoveFav = () =>{
    const allButtonX = document.querySelectorAll ('.buttonRemove');
    for (const button of allButtonX) {
        button.addEventListener('click', removeFavorite);  
    }
}



const removeFavorite =(event)=>{
    const eventLi = event.currentTarget.closest ('li')
    const idListRemove = eventLi.id;
    const findremovefav = findRemoveIndex(idListRemove, favouriteSerie)
    favouriteSerie.splice(findremovefav, 1);
    //me quita el elemento padre de donde  hago click
    event.currentTarget.parentElement.remove(event.target);
    setLocalStorage (); 
    console.log(favouriteSerie, 'me estan borrando' );
}

const findRemoveIndex = (idLi, arrayfav)=>{
    for (let i = 0; i < arrayfav.length; i++) {
        if(arrayfav[i].id === idLi) {
            console.log('indexfav')
            return arrayfav.indexOf(arrayfav[i]);
        }   
    }
}   
//eliminar datos búsqueda anteriores limpiar contenedor de resultados 
const removeSearch = () =>{
    if(elementResultsList.innerHTML !== ''){
        elementResultsList.innerHTML = '';
    }
};

//que funcione la búsqueda con enter
const enterKeySearchHandler = (event)=>{
    event.preventDefault();
    conectSearchHandler();
};

console.log(favouriteSerie);
//funcion borrar todos los fav reset localstorage
const resetLocalStorage = () =>{
    localStorage.clear();
    elementFavList.innerHTML= '';
    favouriteSerie=[];
    elemntSectionfav.classList.add('hidden');
}

const transitionHeader = () =>{
    elementHeader.classList.remove('transition');
    elementHeader.classList.add('notransition');
}
//listeners
window.addEventListener('load', getLocalStorage)
elementButtonReset.addEventListener ('click', resetLocalStorage)
elementForm.addEventListener ('submit', enterKeySearchHandler );
elementInput.addEventListener ('change',removeSearch);
elementButton.addEventListener('click', conectSearchHandler);
