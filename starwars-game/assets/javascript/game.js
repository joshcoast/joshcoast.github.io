window.onload = function() {
  // Select fighters
  $(".avatar-shelf div.avatar").click(starWars.selectAvatar);
  $(".avatar-shelf").on("click", "div.avatar", starWars.selectAvatar);
  $(".attack-button").click(starWars.fight);
  $("body").on("click", ".reset-button", starWars.resetGame);
};

// Create Avatar Objects
var avatar0 = {
  name: "Obi-Wan Kenobi",
  hitPoints: 160,
  damage: 8,
  counterAttack: 12,
  imagePath: "assets/images/obi.png",
  cssClass: "avatar-obi",
  dataAttr: "avatar0",
  pronoun: "His"
};
var avatar1 = {
  name: "Darth Vader",
  hitPoints: 200,
  damage: 3,
  counterAttack: 14,
  imagePath: "assets/images/darth.png",
  cssClass: "avatar-darth",
  dataAttr: "avatar1",
  pronoun: "His"
};
var avatar2 = {
  name: "Princes Leia",
  hitPoints: 115,
  damage: 12,
  counterAttack: 19,
  imagePath: "assets/images/princes-leia.png",
  cssClass: "avatar-leia",
  dataAttr: "avatar2",
  pronoun: "Her"
};
var avatar3 = {
  name: "R2-D2",
  hitPoints: 155,
  damage: 9,
  counterAttack: 3,
  imagePath: "assets/images/r2d2.png",
  cssClass: "avatar-r2d2",
  dataAttr: "avatar3",
  pronoun: "Its"
};
var avatar4 = {
  name: "Storm Trouper",
  hitPoints: 100,
  damage: 8,
  counterAttack: 8,
  imagePath: "assets/images/storm.png",
  cssClass: "avatar-obi",
  dataAttr: "avatar4",
  pronoun: "His"
};
var avatar5 = {
  name: "Boba Fett",
  hitPoints: 170,
  damage: 7,
  counterAttack: 15,
  imagePath: "assets/images/boba-fett.png",
  cssClass: "avatar-boba",
  dataAttr: "avatar5",
  pronoun: "His"
};
var allAvatars = [avatar0, avatar1, avatar2, avatar3, avatar4, avatar5];

var starWars = {
  // initialize settings
  activeUserAvatar: "avatar0",
  activeOpponentAvatar: "avatar0",
  firstPick: true,
  fightActive: false,
  userDamage: 0,
  userHP: 0,
  opponentDamage: 0,
  opponentHP: 0,
  opponentsLeft: 0,

  // -- Reset Game
  resetGame: function() {
    starWars.activeUserAvatar = "avatar0";
    starWars.activeOpponentAvatar = "avatar0";
    starWars.firstPick = true;
    starWars.fightActive = false;
    starWars.userDamage = 0,
		starWars.userHP = 0,
		starWars.opponentDamage = 0,
    starWars.opponentHP = 0,
    starWars.opponentsLeft = 0,
    //starWars.alertDanger("When you choose your fighter, careful you must be. For the fighter chooses back.");
    
    $('.message-area').removeClass('visually-hidden');
    $(".win-screen").addClass("hide");
    $(".fight-controls").addClass("hide");
		$(".fighting-ring").addClass("hide");
    $(".shelfTitle").text("Choose Your Fighter");
    $(".avatar-shelf > div").empty();
    $(".active-user-fighter").empty();
    $(".active-opponent-fighter").empty();
    starWars.buildShelf();
  },

  // -- Return html for an avatar object
  buildAvatarHTML: function(theAvatar) {
    return (
      '<div class="avatar col-4 col-sm-3 col-md-2 d-flex align-items-stretch ' +
      theAvatar.cssClass +
      '" data-avatar="' +
      theAvatar.dataAttr +
      '"> <div class="avatar-inner"><div class="hit-points">' +
      theAvatar.hitPoints +
      '</div> <img src="' +
      theAvatar.imagePath +
      '"> <span>' +
      theAvatar.name +
      "</span> </div></div>"
    );
  },

  // -- Place avatars for selection
  buildShelf: function() {
    for (var i = 0; i < allAvatars.length; i++) {
      $(".avatar-shelf > div").append(starWars.buildAvatarHTML(allAvatars[i]));
    }
  },

  // -- Select Avatars
  selectAvatar: function() {
    if (starWars.firstPick) {

      // Select User Fighter
      starWars.activeUserAvatar = $(this).data("avatar");
      starWars.activeUserAvatar = allAvatars[starWars.getAvatarIndex(starWars.activeUserAvatar)];
      $(this)
        .removeClass("col-4 col-sm-3 col-md-2")
        .remove()
        .appendTo(".active-user-fighter");
      $(".shelfTitle").text("Choose an Opponent");
      $(".fighting-ring").removeClass("hide");
      $(".fight-controls").removeClass("hide");
			starWars.userDamage = starWars.activeUserAvatar.damage;
			starWars.userHP = starWars.activeUserAvatar.hitPoints;
      starWars.firstPick = false;
      starWars.opponentsLeft = allAvatars.length - 1;
    } else if (!starWars.fightActive) {

      // Select Opponent
      starWars.activeOpponentAvatar = $(this).data("avatar");
      starWars.activeOpponentAvatar = allAvatars[starWars.getAvatarIndex(starWars.activeOpponentAvatar)];
      $(this)
        .removeClass("col-4 col-sm-3 col-md-2")
        .remove()
				.appendTo(".active-opponent-fighter");
			starWars.opponentHP = starWars.activeOpponentAvatar.hitPoints;
      starWars.fightActive = true;
      starWars.opponentsLeft = starWars.opponentsLeft - 1;
    } else {
			
      // Show alert to fight first
      starWars.alertDanger("Looking? Found someone to fight you have, eh?");
    }
  },

  getAvatarIndex: function(objName) {
    var avatarIndex = objName.substr(objName.length - 1);
    return avatarIndex;
  },

  // -- Fight
  fight: function() {
    if (starWars.fightActive) {

      // Attack
      starWars.userDamage = starWars.userDamage + starWars.activeUserAvatar.damage;
      console.log(starWars.userDamage);
      starWars.opponentHP = starWars.opponentHP - starWars.userDamage;
      $(".active-opponent-fighter .hit-points").text(starWars.opponentHP);

      // Counter Attack
      starWars.userHP = starWars.userHP - starWars.activeOpponentAvatar.counterAttack;
      $(".active-user-fighter .hit-points").text(starWars.userHP);

      // Display Stats
      starWars.alertDanger(
        "You attacked " + starWars.activeOpponentAvatar.name + 
        " for " + starWars.userDamage + " damage.\n" + 
        starWars.activeOpponentAvatar.name + " attacked you back for " + 
        starWars.activeOpponentAvatar.counterAttack + " damage."
      );

      // Test for Dead
      if (starWars.userHP < 0) {
        // user has lost
				starWars.alertDanger(starWars.activeUserAvatar.name + " is DEAD. Hmm, you it was. " + starWars.activeUserAvatar.pronoun + " family will be sad. Try again you must.");
				starWars.resetGame();
      } else if (starWars.opponentHP < 0) {
        // opponent has lost
				starWars.alertDanger(starWars.activeOpponentAvatar.name + " is DEAD. " + starWars.activeOpponentAvatar.pronoun +" family will be sad.");
				$(".active-opponent-fighter").empty();
				starWars.fightActive = false;
        starWars.opponentHP = 0;
        // Test for win
        if (starWars.opponentsLeft === 0){
          starWars.winScreen();
        }
      }
    } else {
      starWars.alertDanger("Choose an opponent to fight first you must!");
    }
  },
  
  // -- For the win
  winScreen: function() {
    $('.win-screen').removeClass("hide");
    $('.message-area').addClass('visually-hidden');
  },

	alertDanger: function(message) {
    $(".message").text(message).removeClass("visually-hidden");
  },

};

starWars.buildShelf();
