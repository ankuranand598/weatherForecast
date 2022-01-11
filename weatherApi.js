$("document").ready(function () {
  $("#exampleModal").modal("show");
});
$(function () {
  $('[data-toggle="popover"]').popover();
});
// function onLoadF() {
//   let x = document.getElementsByClassName("modal-body");
//   x.dataToggle = "modal";
// }
function checkLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  } else {
    document.getElementById("para1").innerHTML = "not supported";
  }
}
function onSuccess(pos) {
  let { latitude, longitude } = pos.coords;
  //https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=4bc7e2dfd2fa43e185ca61d2c70bd717
  fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=4bc7e2dfd2fa43e185ca61d2c70bd717`
  )
    .then((response) => response.json())
    .then((res) => {
      let allDetail = res.results[0].components;
      let { city } = allDetail;
      document.getElementById("para1").innerHTML = `${city}`;
      checkDetailofCity(city);
    });
}
function onError(err) {
  if (err.code == 1) {
    document.getElementById("para1").innerHTML = "Please Allow";
  } else if (err.code == 2) {
    document.getElementById("para1").innerHTML = "Location not found";
  } else {
    document.getElementById("para1").innerHTML = "Something went wrong";
  }
}
function checkWaeather() {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=London&appid=d7462389c6e671076d5c5c0e5e252cf4`
  )
    .then((res) => res.json())
    .then((result) => console.log(result));
}
checkWaeather();
function checkDetail() {
  let ip1 = document.getElementById("ip1").value;
  document.getElementById("Header").innerHTML = null;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${ip1}&appid=d7462389c6e671076d5c5c0e5e252cf4`
  )
    .then((res) => res.json())
    .then((result) => {
      document.getElementById("Header").innerHTML = ip1;
      let lead = document.getElementById("lead");
      lead.innerHTML = null;

      let { feels_like, humidity, pressure, temp, temp_max, temp_min } =
        result.main;
      let data = ` feels_like: ${feels_like} <br></br>humidity: ${humidity} <span>	
&#127752;</span><br></br>pressure:
               ${pressure}<br></br> temp: ${temp}<span>	
&#127777;</span><br></br> temp_max:${temp_max}  <span>	
&#127749;</span><br></br> temp_min: ${temp_min}	
 <span>&#127889;</span>`;
      lead.innerHTML = data;
      // console.log(feels_like, humidity, pressure, temp, temp_max, temp_min);
    });
}
function checkDetailofCity(x) {
  document.getElementById("Header").innerHTML = null;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${x}&appid=d7462389c6e671076d5c5c0e5e252cf4`
  )
    .then((res) => res.json())
    .then((result) => {
      document.getElementById("Header").innerHTML = x;
      let lead = document.getElementById("lead");
      lead.innerHTML = null;

      let { feels_like, humidity, pressure, temp, temp_max, temp_min } =
        result.main;
      let data = ` feels_like: ${feels_like} <br></br>humidity: ${humidity} <span>	
&#127752;</span><br></br>pressure:
               ${pressure}<br></br> temp: ${temp}<span>	
&#127777;</span><br></br> temp_max:${temp_max}  <span>	
&#127749;</span><br></br> temp_min: ${temp_min}	
 <span>&#127889;</span>`;
      lead.innerHTML = data;
      // console.log(feels_like, humidity, pressure, temp, temp_max, temp_min);
    });
}
let timer;
function doSomething() {
  // let ip = document.getElementById("ip1").value;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => inputBox(), 500);
  };
}
let debouncing = doSomething();
function inputBox() {
  let ip = document.getElementById("ip1").value;
  console.log(ip);
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${ip}&appid=d7462389c6e671076d5c5c0e5e252cf4`
  )
    .then((res) => res.json())
    .then((result) => checkSuggestions(result));
}
function checkSuggestions(result) {
  //console.log(result.name, result.main.temp);
  let card = document.getElementById("cardP");

  card.style.display = "block";
  let c = document.getElementById("cardC");
  c.style.color = "black";
  let x = document.createElement("p");
  {
    /* <span>&#127777;</span>; */
  }
  x.innerHTML = `${result.name}<span style="width:150px;margin-left:30%">   </span>${result.main.temp}<span>&#127777;</span>`;
  x.addEventListener("click", () => {
    card.style.display = "none";
    checkDetailofCity(result.name);
  });
  c.append(x);
}
