let resetBtn = document.getElementById("reset");
let scoreJoueur = document.getElementById("score-joueur");
let scoreOrdi = document.getElementById("score-ordi");

let btnJoueur = [...document.getElementsByClassName("btn-joueur")]; //regrouper les élements dans un tableau grâce à [... ]

//par contre les boutons ordi, on va les récupérer un par un
let opierreBtn = document.getElementById("opierre");
let ofeuilleBtn = document.getElementById("ofeuille");
let ociseauxBtn = document.getElementById("ociseaux");

//on va vouloir changer le message donc
let message = document.getElementById("message");
let nextBtn = document.getElementById("next");

// La logique = il se passe qqch dès qu'on clic sur un btn du joueur :

const jouerManche = (e) => {
  let choix = e.target.closest(".btn-joueur"); //car on peut cliquer sur l'image, sur la div ou sur le text, on focus donc sur l'élément le plus proche du bnt joueur -> pour être sur de récupérer l'id pierre/ feuille ou ciseaux
  btnJoueur.forEach((btn) => {
    btn.classList.add("desactivated"); //après le clic, on change le style des boutons
    btn.removeEventListener("click", jouerManche); //et on retire l'événement, les autres choix ne sont plus possibles
  });

  choix.classList.remove("desactivated"); //pour l'élément choisi change le style pour le rendre actif
  choix.classList.add("active");

  let choixJoueur = choix.id; //on récupère le choix de l'utilisateur pour le comparer au choix de l'ordinateur par la suite

  let choixOrdi = faireChoixOrdi();

  verifierGagnant(choixJoueur, choixOrdi);

  nextBtn.style.visibility = "visible";
};

const PIERRE = "pierre";
const FEUILLE = "feuille";
const CISEAUX = "ciseaux";

const faireChoixOrdi = () => {
  // 0 = Pierre
  // 1 = Feuille
  // 2 = Ciseaux
  // Pour le choix aléatoire on utilise math donc un choix entre 0 et 2
  let randomNb = Math.floor(Math.random() * 3);

  switch (randomNb) {
    case 0:
      opierreBtn.classList.add("active");
      return PIERRE;
    case 1:
      ofeuilleBtn.classList.add("active");
      return FEUILLE;
    default:
      ociseauxBtn.classList.add("active");
      return CISEAUX;
  }
};

const verifierGagnant = (choixJoueur, choixOrdi) => {
  if (choixJoueur === choixOrdi) {
    message.textContent = "Egalité ! 😒";
    return;
  }
  if (choixJoueur === PIERRE) {
    //on va vérifier les cas où ordi = feuille ou ciseau (car pierre = égalité et c'est déjà traité)
    if (choixOrdi === FEUILLE) {
      //on va traiter les cas dans des fonctions pour les réutiliser
      return victoireOrdi();
    } else if (choixOrdi === CISEAUX) {
      return victoireJoueur();
    }
  }
  if (choixJoueur === FEUILLE) {
    if (choixOrdi === PIERRE) {
      return victoireJoueur();
    } else if (choixOrdi === CISEAUX) {
      return victoireOrdi();
    }
  }
  if (choixJoueur === CISEAUX) {
    if (choixOrdi === PIERRE) {
      return victoireOrdi();
    } else if (choixOrdi === FEUILLE) {
      return victoireJoueur();
    }
  }
};
//fonctions qu'on réutilise dans les cas
const victoireOrdi = () => {
  message.textContent = "Perdu ! ☹️";
  scoreOrdi.textContent++; //JS reconnait que c'est un chiffre
};

const victoireJoueur = () => {
  message.textContent = "Gagné ! 🥳";
  scoreJoueur.textContent++; //JS reconnait que c'est un chiffre
};

//on définit ce qui se passe quand on clic sur "Tour suivant"
const newManche = () => {
  btnJoueur.forEach((btn) => {
    btn.classList.remove("desactivated");
    btn.classList.remove("active");
    btn.addEventListener("click", jouerManche);
  });

  nextBtn.style.visibility = "hidden";

  opierreBtn.classList.remove("active");
  ofeuilleBtn.classList.remove("active");
  ociseauxBtn.classList.remove("active");

  message.textContent = "A vous de jouer !";
};

nextBtn.addEventListener("click", newManche);

btnJoueur.forEach((btn) => btn.addEventListener("click", jouerManche)); //pour chaque bouton btnJoueur on déclanche la fonction jouerManche au clic
