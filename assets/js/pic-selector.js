"use strict";

let isLight;

const bgColor = document.body.dataset.mdColorScheme;
const pics = document.querySelectorAll(".picture-select");

if (bgColor === "larry-blue") isLight = true;
else {
	isLight = false;
}

pics.forEach((element) => {
	element.style.display = "none";

	if (isLight && element.classList.contains("light"))
		element.style.display = "inline-block";
	if (!isLight && element.classList.contains("dark"))
		element.style.display = "inline-block";
});

// element.classList.contains(class);

// console.log(isLight);
// console.log("beautiful!");
