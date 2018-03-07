// load event listeners

window.onload = function () {
	$("#startScreen").click(game.startGame);
	$(".message").on("click", "button", game.startGame);
	$("#choiceList").on("click", "button", game.gameChoice);
};

// Question Objects

var allQuestions = [
	q0 = {
		image: "roseanne.jpg",
		question: "The plaid-and-knit-embellished bridgewater in this title character's home could use a little love.",
		answers: ["Blossom", "Roseanne", "Daria", "Martin"],
		realAnswer: "Roseanne",
	},
	q1 = {
		image: "that-70s-show.jpg",
		question: "This chartreuse number made a statement in the living room of this era-appropriate sitcom.",
		answers: ["The Wonder Years", "Freaks & Geeks", "That '70s Show", "Full House"],
		realAnswer: "That '70s Show",
	},
	q2 = {
		image: "friends.jpg",
		question: "One character on this show spent almost an entire episode on a plush white sofa while on hold for days with her phone company.",
		answers: ["Growing Pains", "Friends", "Seinfeld", "Ugly Betty"],
		realAnswer: "Friends",
	},
	q3 = {
		image: "seinfeld.jpg",
		question: "What is the deal with the boring blue couch that appeared on this quirky New York-based sitcom?",
		answers: ["Seinfeld", "Boy Meets World", "Wings", "Everybody Loves Raymond"],
		realAnswer: "Seinfeld",
	},
	q4 = {
		image: "goldengirls.jpg",
		question: "Many of conversations were shared about old St. Olaf on this couch.",
		answers: ["The Wonder Years", "ALF", "Golden Girls", "Who's the Boss"],
		realAnswer: "Golden Girls",
	},
	q5 = {
		image: "frasier.jpg",
		question: "The odd couple living in this sitcom are mirrored by their choice in couches.",
		answers: ["The Fresh Prince", "Fraiser", "Friends", "Mad About You"],
		realAnswer: "Fraiser",
	},
	q6 = {
		image: "big-bang-theory.jpg",
		question: "Careful where you sit, one seat is already spoken for in this smart guys apartment.",
		answers: ["The Big Bang Theory", "That 70's Show", "Two and a Half Men", "Freaks and Geeks"],
		realAnswer: "The Big Bang Theory",
	},
	q7 = {
		image: "will-and-grace.jpg",
		question: "The navy loveseat in this series's well-furnished pad was fit for its interior designer owner.",
		answers: ["Designing Women", "King of Queens", "Will & Grace", "Reba"],
		realAnswer: "Will & Grace",
	},
];

var numberOfQuestions = allQuestions.length;
var questionNumber;
var wins = 0;
var losses = 0;
var gameOver = false;

//timer
var clockRunning = false;
var intervalId;
var timerSet = 25;

// Reusable elements
var $messageEl = $(".message");
var $choiceListEl = $("#choiceList");
var picPath = "./img/questions/";

game = {
	startGame: function () {
		wins = 0;
		losses = 0;
		gameOver = false;
		questionNumber = 0;
		stopwatch.reset;
		$choiceListEl.empty();
		$messageEl.addClass("hide").removeClass("show");
		$("#startScreen").fadeOut();
		game.buildQuestion(allQuestions[questionNumber]);
	},
	buildQuestion: function (questionObject) {
		setTimeout(function () {
			// Let snow show first, then load the real image
			$(".tv-show img").attr("src", picPath + questionObject.image);
		}, 400);
		$(".tv-show img").attr("src", picPath + "snow.jpg");
		$(".question p").text(questionObject.question);
		$choiceListEl.empty();
		stopwatch.reset();
		stopwatch.start();
		// create list loop
		for (var i = 0; i < questionObject.answers.length; i++) {
			var listItem = $("<div>");
			listItem.text(questionObject.answers[i]);
			listItem.attr("data-answer", questionObject.answers[i]);
			listItem.wrapInner("<button class='uk-button uk-button-primary uk-display-block'>");
			$choiceListEl.append(listItem);
		}
	},
	gameChoice: function () {
		if (!gameOver) {
			userChoice = $(this).parent().data('answer');
			realAnswer = allQuestions[questionNumber].realAnswer;
			console.log(userChoice);
			console.log(realAnswer);
			questionNumber++;
			console.log("---- Click Event Triggered ---");
			if (userChoice === realAnswer) {
				game.win("<p><strong>Correct!</strong><br><span uk-icon='happy'></span></p>");
			} else {
				game.loss('<p><strong>Nope!</strong><br>Correct answer was:<br><strong>' + realAnswer + '</p>');
			}
		}
	},
	loss: function (lossMessage) {
		losses++;
		$messageEl.html(lossMessage);
		$messageEl.addClass("show").removeClass("hide");
		$choiceListEl.addClass("stop-clicks");
		stopwatch.stop();

		setTimeout(function () {
			$messageEl.addClass("hide").removeClass("show");
			$choiceListEl.removeClass("stop-clicks");
			if (questionNumber === numberOfQuestions) {
				console.log("game over");
				console.log("Right: " + wins);
				console.log("Wrong: " + losses);
				gameOver = true;
				game.displayRestart();
			} else {
				game.buildQuestion(allQuestions[questionNumber]);
			}
		}, 3000);
	},
	win: function (winMessage) {
		wins++;
		$messageEl.html(winMessage);
		$messageEl.addClass("show").removeClass("hide");
		$choiceListEl.addClass("stop-clicks");
		stopwatch.stop();

		setTimeout(function () {
			$messageEl.addClass("hide").removeClass("show");
			$choiceListEl.removeClass("stop-clicks");
			if (questionNumber === numberOfQuestions) {
				console.log("game over");
				console.log("Right: " + wins);
				console.log("Wrong: " + losses);
				gameOver = true;
				game.displayRestart();
			} else {
				console.log("questionNumber= " + questionNumber);
				console.log("numberOfQuestions= " + numberOfQuestions);
				console.log("allQuestions[questionNumber]= " + allQuestions[questionNumber])
				game.buildQuestion(allQuestions[questionNumber]);
			}
		}, 3000);
	},
	displayRestart: function () {
		$messageEl
			.addClass("show")
			.removeClass("hide")
			.html("You got " +
				wins +
				" right and " +
				losses +
				" wrong.<br><button class='uk-button uk-button-default'>Try Again?</button>");
	}
}

var stopwatch = {
	time: timerSet,

	reset: function () {
		stopwatch.time = timerSet;
		$('#timerNumber').html(stopwatch.time);
	},

	start: function () {
		if (!clockRunning) {
			intervalId = setInterval(stopwatch.count, 1000);
			clockRunning = true;
		}
	},

	count: function () {
		stopwatch.time--;
		console.log(stopwatch.time);
		$("#timerNumber").html(stopwatch.time);
		if (stopwatch.time === 0) {
			stopwatch.stop();
			questionNumber++;
			game.loss("Oops, too slow Joe!");
		}

	},

	stop: function () {
		clearInterval(intervalId);
		clockRunning = false;
	}
};