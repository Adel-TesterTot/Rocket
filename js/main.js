'use strict'

/***********************************************************************************/
/* ******************************* DONNEES GLOBALES ********************************/
/***********************************************************************************/

const IMG_PATH = 'images/'
const ROCKET_SOUND = 'sounds/rocket-launch-sound-effect.mp3'
let timer   // interval
let count = 10
let launch
let isLaunch = false


/***********************************************************************************/
/* ********************************** FONCTIONS ************************************/
/***********************************************************************************/

// Gestionnaire d'événement au clic sur le bouton de mise à feu
function onClickFiringButton()
{
    // Une fois que la mise à feu lancée, on désactive le bouton de mise à feu
      //https://developer.mozilla.org/fr/docs/Web/API/EventTarget/removeEventListener
    firingButton.removeEventListener("click", onClickFiringButton);
    firingButton.classList.add("disabled")
    isLaunch = true
    
    // Programmation du décollage de la fusée à la fin du compte à rebours
    scheduleTakeOff()
    
    // Affichage initial du compte à  rebours
    countDown()
    
    // Lancement du compte à rebours
    timer = setInterval(countDown, 1000)
    
    // On change la source de l'image de la fusée
    updateRocket("rocket4.gif")
    
    // Appel de la fonction qui lance un son
    rocketLaunchSound()
}

// fonction pour afficher l'ovni et le faire bouger
function onClickShowAlien()
{
    // aparition ovni (opacité)
    alien.style.opacity = 1;
    // animation css
    alien.style.animationName = "bobbingAnim"
}

// Gestionnaire d'événement au clic sur le bouton de reset
function onClickResetButton()
{
    // Si la fusée est lançée
    if (isLaunch) {
        // reinitialisation du compte à rebours à 10 et des timers lançées
        window.clearInterval(timer)
        window.clearTimeout(launch)
        count = 10
        // la fusée revient à son point de départ (css)
        rocket.classList.remove("tookOff")
        firingButton.classList.toggle("disabled")
        // appel de la fonction qui gère l'affichage du compte à rebours
        countDown()
        // Mise à jour de l'image de la fusée
        updateRocket("rocket4.png")
        // Mise à jour du boolean de la fusée (si elle est lançée ou non)
        isLaunch = false
        
    }

}

// Fonction pour changer l'affichage de la lune/soleil et sa couleur de fond
function replaceSunAndMoon()
{
    // si l'image actuell est une lune
        // on change l'image en soleil et sa couleur de fond à bleu clair
        
    // sinon
        // on passe l'image en lune et sa couleur de fond en bleu fonçé
    if (moon.attributes.src.value === IMG_PATH + "fullmoon.png") 
    {
        updateMoon("sun.png");
        document.body.style.backgroundColor = "lightskyblue";
    } 
    else 
    {
        updateMoon("fullmoon.png");
        document.body.style.backgroundColor = "#000033";
    }
}

// Fonction qui est appelée lors du lancement de la fusée (joue un son de décollage). A synchroniser avec l'image !
function rocketLaunchSound()
{
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement/Audio
    
    // Lancement du son de la fusée et le synchroniser avec le décollage de la fusée (setTimeout)
    let rocketSound = new Audio(ROCKET_SOUND)
    setTimeout(function () {
        rocketSound.play()
    }, 200)
}

function onClickShowAstronaute()
{
    // Affiche l'astronaute ou le camoufle quand on clic
    astronaute.classList.toggle("display");
}

/* Programme le décollage de la fusée à la fin du compte à rebours*/
function scheduleTakeOff()
{
    // Programmation du décollage pour dans x secondes
    launch = setTimeout( function() {

    // boolean pour modifier que la fusée est lançée
    isLaunch = true
    
    // On change la source de l'image de la fusée
    updateRocket("rocket4.gif")
    
    // On fait décoller la fusée en lui donnant la classe 'tookOff', la transition CSS fera le reste
    rocket.classList.add("tookOff")
    
    }, 11000)
}

// Gestion du compte à rebours
function countDown()
{
    // Affichage sur le panneau du compte à rebours
    billboard.textContent = count
    // On décrémente le compteur
    count--
    // Si le compteur arrive à -1, on stoppe le chronomètre
    if(count === -1){
        clearInterval(timer)
    }
}


/*  Met à jour l'image de la fusée*/
function updateRocket(filename)
{
    // change la source de l'img
    rocket.src = IMG_PATH + filename
}

/*  Met à jour l'image de la lune/soleil*/
function updateMoon(filename)
{
    // change la source de l'img
    moon.src = IMG_PATH + filename
}


/************************************************************************************/
/* ******************************** CODE PRINCIPAL **********************************/
/************************************************************************************/


// Sélection des différents éléments du DOM sur lesquels nous allons agir
const rocket = document.querySelector("#rocket");
const billboard = document.querySelector("#billboard span");
const firingButton = document.querySelector("#firing-button");
const resetButton = document.querySelector("#reset-button");
const moon = document.querySelector("#moon");
const alien = document.querySelector("#alien");
const platform = document.querySelector("#launching-ramp");
const astronaute = document.querySelector("#astronaute");

// Installation du gestionnaire d'événement au clic sur le bouton de mise à feu

    // au clic du bouton de mise à feu de la fusée
    firingButton.addEventListener("click", onClickFiringButton);
    // au clic du bouton de reset de la fusée
    resetButton.addEventListener("click", onClickResetButton);
    // au clic sur la lune/soleil
    moon.addEventListener("click", replaceSunAndMoon);
    // au clic sur l'alien/ovni
    alien.addEventListener("click", onClickShowAlien);
    // au clic sur la platforme
    platform.addEventListener("click", onClickShowAstronaute);
    
    
    
/************************************************************************************/
/* *********************************** BONUS ETOILES ********************************/
/************************************************************************************/
/**
 * Bonus: Choisir la taille des étoiles
 */
function choisirTaille()
{
    let taille = getRandomInteger(1, 3)
    switch (taille) {
    case 1:
      return "tiny";
      break;
    case 2:
      return "normal";
      break;
    case 3:
      return "big";
      break;
  }
}

/**
 * Bonus: Choisir la position x pour les étoiles
 */
 
function choisirX() 
{
    let x = getRandomInteger(1, window.innerWidth)
}

/**
 * Bonus: Choisir la position y pour les étoiles
 */
 
 function choisirY() 
{
    let y = getRandomInteger(1, window.innerHeight)
}


// Ajouter des étoiles
const numberOfStar = 300
let stars=[]

/* Boucle pour afficher les étoiles

    Utilisez les fonctions créés plus haut pour :
        -position X aleatoire
        -position Y aleatoire
        -taille aleatoire

*/
/*for (let i = 0; i <= numberOfStar; i++) {
    stars[i] = document.createElement("div")
    document.body.appendChild(stars[i])
    stars[i].classList.add("star")
    stars[i].classList.add(choisirTaille())
    stars[i].style.left = choisirX() + "px";
    stars[i].style.top = choisirY() + "px";
}
*/

function star() 
{
    for( let i = 0 ; i< 150; i++){
        let tailleEtoile = getRandomInteger(1,3)
        let randomX = getRandomInteger(1,100)
        let randomY = getRandomInteger(1,100)
        let etoiles = document.createElement("div")
        etoiles.classList.add("star")
        if(tailleEtoile === 1)
        {
            etoiles.classList.add("tiny")
        }
        else if(tailleEtoile === 2)
        {
            etoiles.classList.add("normal")
        }
        else
        {
            etoiles.classList.add("big")
        }
        
        etoiles.style = `top: ${randomX}%; left: ${randomY}%`
        document.body.appendChild(etoiles)
    }
}

star()