let clicks = localStorage.getItem('clicks')
	? localStorage.getItem('clicks')
	: 0;
const clicksElm = document.getElementById('clicks'),
	buttonElm = document.getElementById('button');

clicksElm.innerText = clicks + ' Clicks';

buttonElm.addEventListener('click', () => {
	clicks++;
	clicksElm.innerText = clicks + ' Clicks';
	localStorage.setItem('clicks', clicks);
});

if (navigator.serviceWorker) {
	navigator.serviceWorker.register('./sw.js');
}

function showNotification() {
	setTimeout(() => {
		new Notification('Bien hecho', {
			body: 'Sigue usando el contador para más premios',
			icon: 'icons/icon-72x72.png',
		});
	}, 10000);
}

window.addEventListener('load', () => {
	console.log('Probando notification');
	Notification.requestPermission().then((result) => {
		console.log(result);
		if (result === 'granted') {
			console.log('Listo');
			showNotification();
		}
	});
});
