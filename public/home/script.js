//Toma el valor del desplazamiento vertical en la página
var prevScrollpos = window.pageYOffset;

//Se encarga de desplazar verticalmente el menú de navegación (lo esconde y lo revela dependiendo del desplazamiento vertical)
window.onscroll = function () {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.querySelector(".globalnav").style.top = "0";
  } else {
    document.querySelector(".globalnav").style.top = "-230px";
  }
  prevScrollpos = currentScrollPos;
};

//Almacena todas las propiedades e informacion de la imagen del banner #1
var bannerOne = {
  text: 'WATCH THE MUSIC VIDEO',
  link: 'https://www.youtube.com/watch?v=Tm8LGxTLtQk',
  image: 'url(./data/images/banner1.png)',
};

//Almacena todas las propiedades e informacion de la imagen del banner #2
var bannerTwo = {
  text: 'WATCH THE LIVE VIDEO',
  link: 'https://www.youtube.com/watch?v=4W_YgNW7gs0',
  image: 'url(./data/images/banner2.png)',
};

//Arreglo encargado de almacenar los objetos contenedore de informacion de cada version del banner
var banners = [bannerOne, bannerTwo];
//Llama a la funcion encargada de reemplzar la informacion del banner cada 8 segundos
var intervalHead = window.setInterval(changeBannerImage, 7000);
//Representa la posicion del arreglo de banners
var index = 1;

//Se encarga de reemplazar la informacion del banner (con la imagen, texto, etc..)
function changeBannerImage() {
  if (index == 2) index = 0;
  var banner = document.querySelector('.banner');
  var button = document.querySelector('.banner__button__link')
  banner.style.backgroundImage = banners[index].image;
  button.setAttribute('href', banners[index].link);
  button.innerHTML = banners[index].text;
  index++;
};
// Retorna un entero aleatorio entre min (incluido) y max (excluido)
function getRandomInt() {
  var min = 0;
  var max = 4;
  return Math.floor(Math.random() * (max - min)) + min;
}
//direcciones de videos preseleccionados a mostrar aleatoriamente
var videoId = ['58669810', '8747975', '259445695', '796788'];
//obtiene la etiqueta boton encargada de accionar el video
var videoButton = document.querySelector('.video__link');
//se encarga de reemplazar toda la seccion por el reproductor de video
function onVideoButton() {
  console.log('entra a la funcion');
  document.querySelector('.video__title').remove;
  document.querySelector('.video__link').remove;
  var videoSection = document.querySelector('.video');
  videoSection.style.backgroundImage = `none`;
  videoSection.style.padding = `0`;
  videoSection.style.height = '56vw';
  videoSection.innerHTML = `<iframe src="https://player.vimeo.com/video/` + videoId[getRandomInt()] + `?autoplay=1&title=0&byline=0&portrait=0" style="margin:0;width:100%;height:100%;" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe><script src="https://player.vimeo.com/api/player.js"></script>`;
};
//se agrega el evento identificador de click en la etiqueta boton de la seccion de video
videoButton.addEventListener('click', onVideoButton);
//objeto encargado de almacenar los datos necesarios para reproducir una cancion
var objSong = {
  name: 'Burn It Down',
  listeners: '14.987.683 listeners per month',
  image: 'url(data/images/covers/burn_it_down.png)',
  song: 'data/sound/songs/burn_it_down.mp3',
};
//toma la etiqueta encaragada de abrir el menu de la cancion
var discographyButton = document.querySelector('.discography__button');
//funcion encargada de eliminar el contenido de la seccion de discografía y llamma a la funcion createAudioPlayer
function onDiscographyButton() {
  console.log('entra a la funcion de discografia');
  var discographySection = document.querySelector('.discography');
  document.querySelector('.discography__button').remove();
  document.querySelector('.discography__shadow--top').remove();
  document.querySelector('.discography__shadow--bottom').remove();
  discographySection.style.justifyContent = 'center';

  createAudioPlayer(objSong, discographySection);
};
//funcion encargada de crear las etiquetas necesarias para la construccion del menu de reproduccion de una cancion
function createAudioPlayer(obj, discographySection) {
  var background = document.createElement('div');
  background.setAttribute('class', 'discography__back');

  var container = document.createElement('div');
  container.setAttribute('class', 'discography__back__container');

  var cover = document.createElement('div');
  cover.setAttribute('class', 'discography__back__container__cover');
  cover.style.backgroundImage = obj.image;

  var songTitle = document.createElement('h2');
  songTitle.setAttribute('class', 'discography__back__container__cover__title');
  songTitle.innerHTML = obj.name;
  var listeners = document.createElement('p');
  listeners.setAttribute('class', 'discography__back__container__cover__listeners');
  listeners.innerHTML = obj.listeners;

  var reproduction = document.createElement('div');
  reproduction.setAttribute('class', 'discography__back__container__reproduction');

  var play = document.createElement('a');
  play.setAttribute('class', 'discography__back__container__reproduction__play');
  var next = document.createElement('a');
  next.setAttribute('class', 'discography__back__container__reproduction__change discography__back__container__reproduction__change--next');
  var before = document.createElement('a');
  before.setAttribute('class', 'discography__back__container__reproduction__change discography__back__container__reproduction__change--before');

  reproduction.appendChild(before);
  reproduction.appendChild(play);
  reproduction.appendChild(next);

  cover.appendChild(songTitle);
  cover.appendChild(listeners);

  container.appendChild(cover);
  container.appendChild(reproduction);

  background.appendChild(container);

  discographySection.appendChild(background);
  getReproduceButton();
};
//se encarga de definir la funcion que llamara el boton de la seccion de discografía al ser sleccionado
discographyButton.addEventListener('click', onDiscographyButton);
//posee solo dos casos (boolean) que se encarga de identificar cunado se reproduce y cuando se pausa la cancion
var onPlay;
//toma la etiqueta del boton encargado de reproducir y/o pausar la cancion
var reproduceButton;
//audio de la cancion seleccionada
var song;
//funcion que inicializa las variables necesarias para el funcionamiento de la reproduccion de la cancion
function getReproduceButton() {
  console.log('entra a playbutton');
  reproduceButton = document.querySelector('.discography__back__container__reproduction__play');
  song = new sound(objSong.song);
  reproduceButton.addEventListener('click', onReproduceButton);
  console.log(reproduceButton);
  onPlay = true;
};
//funcion encargada de crear las etiquetas necesarias para la creacion del sonido y administra los eventos de pausa y reproduccion de sonido
function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
      this.sound.play();
  }
  this.stop = function(){
      this.sound.pause();
  }    
};
//funcion encargada de cambiar el estado del boton de reproduccion de la cancion y el estado de reproduccion de la cancion
function onReproduceButton() {
  if (onPlay == true) {
    reproduceButton.setAttribute('class', 'discography__back__container__reproduction__stop');
    song.play();
    onPlay = false;
  } else {
    reproduceButton.setAttribute('class', 'discography__back__container__reproduction__play');
    song.stop();
    onPlay = true;
  }
};