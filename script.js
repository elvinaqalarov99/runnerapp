const entries = [];
const entriesWrapper = document.querySelector("#entries");
const progressCircle = document.getElementById("progressCircle");


function changeAngle(value){
	let angle = (value/goal*100).toFixed(2);
	if (angle <= 100 ) progressCircle.style.background = ' conic-gradient( #70db70 '+ angle + '%, #2d3740 '+ angle + '% ) ';
	else progressCircle.style.background = ' conic-gradient( #70db70 100%, #2d3740 100% ) ';
}
const obj = {
	total : eval("document.querySelector('#total')"),
	avg : eval("document.querySelector('#avg')"),
	high : eval("document.querySelector('#high')"),
	totalProgress : eval("document.querySelector('#progressTotal')"),
	target : eval("document.querySelector('#target')")
}
const goal = 30;
obj.target.innerHTML = goal;
const reducer = (accumulator, currentValue) => accumulator + currentValue;

function addNewEntry(newEntry){
	entriesWrapper.removeChild(entriesWrapper.firstElementChild);
	const listItem = document.createElement("li");
	const listValue = document.createTextNode(newEntry.toFixed(1));
	listItem.appendChild(listValue);
	entriesWrapper.appendChild(listItem);
}

function handleSubmit(event){
	event.preventDefault();
	const entry = +document.querySelector("#entry").value;
	if ( !entry ) return;
	document.querySelector("form").reset();
	entries.push(entry);
	addNewEntry(entry);
	obj.total.innerHTML = entries.reduce(reducer).toFixed(1) + " " + "km";
	if (entries.reduce(reducer).toFixed(1) <= goal ) obj.totalProgress.innerHTML = entries.reduce(reducer).toFixed(2);
	else obj.totalProgress.innerHTML = goal;
	obj.avg.innerHTML = ((Math.ceil(entries.reduce(reducer)/entries.length*100))/100).toFixed(2) + " " + "km";
	obj.high.innerHTML = Math.max(...entries) + " " + "km";
	changeAngle( entries.reduce(reducer) ); 

}

const form = document
	.querySelector("form")
	.addEventListener("submit", handleSubmit);
