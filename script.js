window.addEventListener('load',()=>{
	let long;
	let lat;
	let tempdesc=document.querySelector('.temp-description');
	let tempdegree=document.querySelector('.temp-degree');
	let locationtimezone=document.querySelector('.location-timezone');
	let tempsec=document.querySelector('.temperature');
	let tempspan=document.querySelector('.temperature span');
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(position =>{
			long=position.coords.longitude;
			lat=position.coords.latitude;
			const proxy='https://cors-anywhere.herokuapp.com/';
			const api=`${proxy}https://api.darksky.net/forecast/ae0d6c8a4777db01a6c7f52ef91be03b/${lat},${long}`;
			fetch(api)
			.then(response => {
				return response.json();
			})
			.then(data => {
				//console.log(data);
				const {temperature,summary,icon}= data.currently;
				//Set DOM Elements from the API
				tempdegree.textContent=temperature;
				tempdesc.textContent=summary;
				locationtimezone.textContent=data.timezone;
				//Formula for celsius
				let celsius=(temperature-32)*(5/9);

				//set icon
				setIcons(icon,document.querySelector('.icon'));
				tempsec.addEventListener('click',() =>{
					if(tempspan.textContent==='F'){
						tempspan.textContent="C";
						tempdegree.textContent=Math.floor(celsius);
					}else{
						tempspan.textContent="F";
						tempdegree.textContent=temperature;
					}
				});
			});
		})
	}
	function setIcons(icon,iconID){
		const skycons=new Skycons({color:"white"});
		const currentIcon=icon.replace(/-/g,"_").toUpperCase();
		skycons.play();
		return skycons.set(iconID,Skycons[currentIcon]);
	}
});