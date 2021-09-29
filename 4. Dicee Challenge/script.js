var diceNumber1 = Math.floor(Math.random() * 6) + 1;

var diceNumber2 = Math.floor(Math.random() * 6) + 1;

console.log(diceNumber1, diceNumber1)

var images = document.querySelectorAll(".dice>img");

images[0].setAttribute("src", "images/dice"+diceNumber1+".png");
images[1].setAttribute("src", "images/dice"+diceNumber2+".png");

var h1 = document.querySelector("h1");

if(diceNumber1 == diceNumber2){
    h1.innerHTML = "Draw";
}
else if(diceNumber1 > diceNumber2)
    h1.innerHTML = "🚩 Player 1 Wins";
else
    h1.innerHTML = "Player 2 Wins 🚩";
