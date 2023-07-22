var timeLeft = 0;
var timerId = null;
var game=null;
var score=0;

function startTimer(duration) {
  timeLeft = duration;

  timerId = setInterval(function() {

	const minutes = Math.floor(timeLeft / 60);
	const seconds = timeLeft % 60;

	let minutesStr = minutes.toString();
	let secondsStr = seconds.toString();

	if (minutes < 10) {
	  minutesStr = "0" + minutes;
	}

	if (seconds < 10) {
	  secondsStr = "0" + seconds;
	}

	const timeStr = minutesStr + ":" + secondsStr;
	document.getElementById('time-left').innerHTML = timeStr;

	if (timeLeft == 0) {
	  clearInterval(timerId);
	  document.getElementById('time-left').innerHTML='Время вышло!';
	  score=0;
	  document.getElementById('start_stop').innerHTML='Старт';
	  clearInterval(game);
	  clear_game();

	}
	timeLeft--;
  }, 1000);

	game = setInterval(function() {
	if(timeLeft>0)
	{
		//проверка на наличие круга в игровом поле
		let f=false;

		for (var i = 0; i < childBlocks.length; i++) 
		{
			var svg = childBlocks[i].querySelector("svg");
			if(svg!=null)
			{
				f=true;
			}
		}
		if(f)
			{
			var curcir = document.getElementById("curCir");
			var svgContainer = divContainerGame.querySelector("svg");

			if (svgContainer != null) {
			  // Удалить SVG при клике на круг
			  curcir.addEventListener("click", function() {
				  try{
					//this.parentNode.remove();
					document.querySelector("svg").remove();
					score++;
				  }
				  catch(exception){ 
			  }
			  });
			}
				/*for (var i = 0; i < childBlocks.length; i++) 
				{ // навешиваем обработчик на каждый вложенный блок
				  childBlocks[i].addEventListener("click", function(event) {
					var target = event.target.closest('circle');
					if (target)
					{
						 this.querySelector("svg").remove();
					  //удаляем круг
						score++;
					}
				  });
				}*/
			}
		else
		{
			//выбираем параметры в зависимости от сложности
			if(checkedRadio=='ez')
			{
				let i= Math.floor(Math.random() * childBlocks.length);
				childBlocks[i].innerHTML= '<svg style="width:100%; height:auto;"><circle id="curCir" cx="50%" cy="50%" r="45%" fill="blue" /></svg>';
			}
			else if(checkedRadio=='mid')
			{
				let i= Math.floor(Math.random() * childBlocks.length);
				childBlocks[i].innerHTML= '<svg style="width:100%; height:auto;"><circle id="curCir" cx="50%" cy="50%" r="25%" fill="blue" /></svg>';
			}
			else
			{
				let i= Math.floor(Math.random() * childBlocks.length);
				let x =Math.floor(Math.random() * 70+15); 
				let y= Math.random() * 70+15;
				childBlocks[i].innerHTML= `<svg style="width:100%; height:auto;"><circle id="curCir" cx="${x}" cy="${y}" r="10%" fill="blue" /></svg>`;
			}
			//доделать сложный уровень сложности и нажатие на круг
		}
	}
	else return;
	document.querySelector(".score").innerHTML=`${score}`;

  },1);
}

document.addEventListener('DOMContentLoaded', function() {
  const startStopButton = document.getElementById('start_stop');
  const resetButton = document.getElementById('reset');

  startStopButton.addEventListener('click', function() {
	const duration = parseInt(prompt('Введите время в секундах:'));
	if (duration) {
	  if (startStopButton.innerHTML === 'Старт') {
		startStopButton.innerHTML = 'Стоп';
		for (var i = 0; i < radios.length; i++)
			if (radios[i].checked) 
				checkedRadio=radios[i].value;
		startTimer(duration);

	  } else {
			startStopButton.innerHTML = 'Старт';
			clearInterval(timerId);
			clearInterval(game);
			clear_game();
		}	

	  }
	});


  resetButton.addEventListener('click', function() {
	clearInterval(timerId);
	clearInterval(game);
	clear_game();
	document.querySelector(".score").innerHTML=`${score}`;
	document.getElementById('time-left').innerHTML = "00:00";
	document.getElementById('start_stop').innerHTML = 'Старт';
  });
});

function clear_game()
{
	for (var i = 0; i < childBlocks.length; i++) 
			{
				var svg1 = childBlocks[i].querySelector("svg");
				if(svg1!=null)
					childBlocks[i].querySelector("svg").remove();
				  //удаляем круг
			 }
	score=0;
}
var divContainerGame = document.querySelector(".divContainerGame"); // выбираем родительский блок

var childBlocks = document.querySelectorAll(".divContainerGame > div"); // выбираем все вложенные блоки

var checkedRadio;
var radios = document.getElementsByName('dif');