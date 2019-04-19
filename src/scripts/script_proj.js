// GLOBAL VARIABLES
var previousskin="defaut";

//DOM READY
$(function() {

  // récupère la valeur dans le local storage
  console.log(localStorage);
  Init();

  setInterval(function() {

    // ecran vote
    var ecranvote=localStorage.getItem("EcranVote") || false;
    EcranVote(ecranvote);
    // ecran entracte
    var ecranentracte=localStorage.getItem("EcranEntracte") || false;
    EcranEntracte(ecranentracte);
    // ecran merci
    var ecranmerci=localStorage.getItem("EcranMerci") || false;
    EcranMerci(ecranmerci);
    // ecran caucus
    var ecrancaucus=localStorage.getItem("EcranCaucus") || false;
    EcranCaucus(ecrancaucus);

    // video videoIntro
    var videointro=localStorage.getItem("VideoIntro") || false;
    VideoIntro(videointro);
    // video videoFin
    var videofin=localStorage.getItem("VideoFin") || false;
    VideoFin(videofin);

    // skins
    var skin=localStorage.getItem("Skins");
    var currentskin=localStorage.getItem("currentSkin");
    // console.log("skins: "+skins+" / currentskin: "+currentskin);
    SkinSwap(skin,currentskin);

    // nom équipe G
    var nomG = localStorage.getItem("nameTeamG") || "LIP";
    $("#proj_team_g").text(nomG);
    // nom équipe G
    var nomD = localStorage.getItem("nameTeamD") || "EQUIPE EXTERNE";
    $("#proj_team_d").text(nomD);
    // couleur équipe G
    var couleurD = localStorage.getItem("colorTeamD");
    $("#proj_team_d").css("color", couleurD);
    $("#bloc-equipe-droit .bloc-equipe .colorable").css("fill", couleurD);
    // couleur équipe G
    var couleurG = localStorage.getItem("colorTeamG");
    $("#proj_team_g").css("color", couleurG)
    $("#bloc-equipe-gauche .bloc-equipe .colorable").css("fill", couleurG);
    // thème
    var affichage = localStorage.getItem("PourAfficher") || "Bienvenue à ce match d'antologie !";
    $("#proj_theme, #proj_theme_mini, #container-caucus-txt").text(affichage);
    // console.log('affichage text value : '+affichage);
    CaucusColor(affichage);
    // points g
    var lesPointsG = parseInt(localStorage.getItem("pointsG")) || 0;
    $("#proj_point_compteur_g").text(lesPointsG);
    // penalites g parseInt converti la string en int
    var lesPenalitesG = localStorage.getItem("penalitesG") || 0;
    SetPenalitesG(lesPenalitesG);
    // points d
    var lesPointsD = parseInt(localStorage.getItem("pointsD") || 0);
    $("#proj_point_compteur_d").text(lesPointsD);
    // penalites d
    var lesPenalitesD = localStorage.getItem("penalitesD") || 0;
    SetPenalitesD(lesPenalitesD);
    // durée match
    var matchMin = localStorage.getItem("dureeMatchMin") || 59;
    var matchSec = localStorage.getItem("dureeMatchSec") ||"00";
    $("#proj_duree_match, #proj_duree_match_mini").text(matchMin + ' : ' + matchSec);
    // durée impro
  
    var dureeImproMin = localStorage.getItem("dureeImproMin") || 5;
    var dureeImproSec = localStorage.getItem("dureeImproSec") || 30;
    $("#proj_duree_impro, #proj_duree_impro_mini").text(dureeImproMin + ' : ' + dureeImproSec);
    HideImproTime(dureeImproMin, dureeImproSec); //if null (0:0) : don't show it
    // mode mini
    var beMini = localStorage.getItem("IsMini") || false;
    $("#container_mini").css("visibility", beMini);

  }, 100);

});

// FUNCTIONS

// ecran vote
function EcranVote(ecranvote){
  if(ecranvote=="true"){
    $('#container-vote').removeClass('ecranhidden');
    console.log('ok vote');
  }
  else{
    $('#container-vote').addClass('ecranhidden');
  }
}
// ecran entracte
function EcranEntracte(ecranentracte){
  if(ecranentracte=="true"){
    $('#container-entracte').removeClass('ecranhidden');
  }
  else{
    $('#container-entracte').addClass('ecranhidden');
  }
}
// ecran merci
function EcranMerci(ecranmerci){
  if(ecranmerci=="true"){
    $('#container-merci').removeClass('ecranhidden');
  }
  else{
    $('#container-merci').addClass('ecranhidden');
  }
}
// ecran caucus
function EcranCaucus(ecrancaucus){
  if(ecrancaucus=="true"){
    $('#container-caucus, #container-caucus-txt').removeClass('ecranhidden');
  }
  else{
    $('#container-caucus, #container-caucus-txt').addClass('ecranhidden');
  }
}


// video intro
function VideoIntro(videointro){
  if(videointro=="1"){
    console.log("can launch video intro");
    $('#video-intro').removeClass('videohide');
    $('#video-intro').get(0).play();
    $('#video-intro').on('ended',function(){
      console.log('Video has ended!');
      $(this).addClass('videohide');
    });
    videointro=0;
    localStorage.setItem('VideoIntro', '0');
  }
  else{
    // console.log("cannot launch video intro or already");
  }
}
// video fin
function VideoFin(videofin){
  if(videofin=="1"){
    console.log("can launch video fin");
    $('#video-fin').removeClass('videohide');
    $('#video-fin').get(0).play();
    $('#video-fin').on('ended',function(){
      console.log('Video has ended!');
      $(this).addClass('videohide');
    });
    videointro=0;
    localStorage.setItem('VideoFin', '0');
  }
  else{
    // console.log("cannot launch video fin or already");
  }
}

function Init (){
  // skin par défaut
  $('#proj_duree_match_fond').load( "src/skins/defaut.html #skin-match-timer" );
  $('#proj_duree_impro_fond').load( "src/skins/defaut.html #skin-impro-timer" );
  $('#bloc-equipe-gauche, #bloc-equipe-droit').load( "src/skins/defaut.html .bloc-equipe" );
  //ecrans:
  $('#container-caucus').load("src/skins/defaut.html #ecran-caucus");
  $('#container-vote').load("src/skins/defaut.html #ecran-vote");
  $('#container-entracte').load("src/skins/defaut.html #ecran-entracte");
  $('#container-merci').load("src/skins/defaut.html #ecran-merci");
}


//skin swap
// previousSkin
function SkinSwap(skin,currentskin){
  // console.log("skin: "+skin+" currentskin: "+currentskin);
  if(skin!=previousskin){
    console.log('changing skin');
    $('#proj_duree_match_fond').load( "src/skins/"+skin+".html #skin-match-timer" );
    $('#proj_duree_impro_fond').load( "src/skins/"+skin+".html #skin-impro-timer" );
    $('#bloc-equipe-gauche, #bloc-equipe-droit').load( "src/skins/"+skin+".html .bloc-equipe" );
    //ecrans:
    $('#container-caucus').load("src/skins/"+skin+".html #ecran-caucus");
    $('#container-vote').load("src/skins/"+skin+".html #ecran-vote");
    $('#container-entracte').load("src/skins/"+skin+".html #ecran-entracte");
    $('#container-merci').load("src/skins/"+skin+".html #ecran-merci");
    previousskin=skin;
}
  else{
    //do nothing
  }
}

// penalites G
function SetPenalitesG(lesPenalitesG) {
  console.log("penalites g :" + lesPenalitesG)
  switch (lesPenalitesG) {
    case "0":
      $('#bloc-equipe-gauche .bloc-equipe .penalite1').removeClass('penaliteactive');
      $('#bloc-equipe-gauche .bloc-equipe .penalite2').removeClass('penaliteactive');
      $('#bloc-equipe-gauche .bloc-equipe .penalite3').removeClass('penaliteactive');
      break;
    case "1":
      $('#bloc-equipe-gauche .bloc-equipe .penalite1').addClass('penaliteactive');
      $('#bloc-equipe-gauche .bloc-equipe .penalite2').removeClass('penaliteactive');
      $('#bloc-equipe-gauche .bloc-equipe .penalite3').removeClass('penaliteactive');
      break;
    case "2":
      $('#bloc-equipe-gauche .bloc-equipe .penalite1').addClass('penaliteactive');
      $('#bloc-equipe-gauche .bloc-equipe .penalite2').addClass('penaliteactive');
      $('#bloc-equipe-gauche .bloc-equipe .penalite3').removeClass('penaliteactive');
      break;
    case "3":
      $('#bloc-equipe-gauche .bloc-equipe .penalite1').addClass('penaliteactive');
      $('#bloc-equipe-gauche .bloc-equipe .penalite2').addClass('penaliteactive');
      $('#bloc-equipe-gauche .bloc-equipe .penalite3').addClass('penaliteactive');
      break;
  }
}

// penalites D
function SetPenalitesD(lesPenalitesD) {
  switch (lesPenalitesD) {
    case "0":
      $('#bloc-equipe-droit .bloc-equipe .penalite1').removeClass('penaliteactive');
      $('#bloc-equipe-droit .bloc-equipe .penalite2').removeClass('penaliteactive');
      $('#bloc-equipe-droit .bloc-equipe .penalite3').removeClass('penaliteactive');
      break;
    case "1":
      $('#bloc-equipe-droit .bloc-equipe .penalite1').addClass('penaliteactive');
      $('#bloc-equipe-droit .bloc-equipe .penalite2').removeClass('penaliteactive');
      $('#bloc-equipe-droit .bloc-equipe .penalite3').removeClass('penaliteactive');
      break;
    case "2":
      $('#bloc-equipe-droit .bloc-equipe .penalite1').addClass('penaliteactive');
      $('#bloc-equipe-droit .bloc-equipe .penalite2').addClass('penaliteactive');
      $('#bloc-equipe-droit .bloc-equipe .penalite3').removeClass('penaliteactive');
      break;
    case "3":
      $('#bloc-equipe-droit .bloc-equipe .penalite1').addClass('penaliteactive');
      $('#bloc-equipe-droit .bloc-equipe .penalite2').addClass('penaliteactive');
      $('#bloc-equipe-droit .bloc-equipe .penalite3').addClass('penaliteactive');
      break;
  }
}

//hide impro time if necessary
function HideImproTime(dureeImproMin, dureeImproSec) {
  if (dureeImproMin == 0 && dureeImproSec == 0) {
    $("#proj_duree_impro, #proj_duree_impro_mini").hide();
  } else {
    $("#proj_duree_impro, #proj_duree_impro_mini").show();
  }
}

// change text color only during caucus
function CaucusColor(affichage) {
  if (affichage <= 10 && affichage > 5) {
    $("#proj_theme, #container-caucus-txt").css('color', 'orange');
  } else if (affichage <= 5 && affichage >= 0) {
    $("#proj_theme, #container-caucus-txt").css('color', 'red');
  } else {
    $("#proj_theme, #container-caucus-txt").css('color', 'white');
  }
}
