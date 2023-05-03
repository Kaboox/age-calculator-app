const inputs = document.querySelectorAll("input");

// reversing array, so we can check days in month, after having year and month
inputsArr = [];
inputs.forEach(function (item) {
	inputsArr.push(item);
});
inputsArr.reverse();


const yearsAmount = document.querySelector(".years");
const monthsAmount = document.querySelector(".months");
const daysAmount = document.querySelector(".days");

const arrowBtn = document.querySelector(".circle");

let day;
let month;
let year;

let errCount = 0;

const presentDate = new Date();

currDay = presentDate.getUTCDay();
currMonth = presentDate.getUTCMonth() + 1;
currYear = presentDate.getUTCFullYear();

// depending on input adds either empty error or invalid error
const addErrors = (text) => {
	let box = text.closest(".box");
	box.querySelector(".label").classList.add("label--error");
	box.querySelector(".input").classList.add("input--error");

	if (text.value == "") {
		box.querySelector(".error-text").textContent = "This field is required";
	} else {
		box.querySelector(".error-text").textContent = "This field is invalid";
	}
	box.querySelector(".error-text").style.visibility = "visible";
};

const fillCheck = (text) => {
	const box = text.closest(".box");
	const label = box.querySelector(".label");
	const error = box.querySelector(".error-text");

	label.classList.remove("label--error");
	text.classList.remove("input--error");
	error.style.visibility = "hidden";

	if (text.value == "") {
		errCount++;
		addErrors(text);
	} else {
		if (dateValidation(text) == false) {
			errCount++;
			addErrors(text);
		}
	}
};

// checks if the given date is valid - past
const isPast = (day, month, year) => {
	let givenDate = new Date(year, month - 1, day).getTime();
	return presentDate.getTime() >= givenDate;
};

// validates every input
const dateValidation = (input) => {
	if (input.id == "month") {
		monthString = input.value.toString();
		if (
			input.value > 12 ||
			input.value <= 0 ||
			monthString.indexOf(".") != -1
		) {
			return false;
		}
		month = input.value;
		return true;
	} else if (input.id == "year") {
		yearString = input.value.toString();
		if (
			input.value > presentDate.getFullYear() ||
			input.value <= 0 ||
			yearString.indexOf(".") != -1
		) {
			return false;
		}
		year = input.value;
		return true;
	} else if (input.id == "day") {
		dayString = input.value.toString();
		if (
			input.value > daysInMonth(month, year) ||
			input.value <= 0 ||
			dayString.indexOf(".") != -1
		) {
			return false;
		}
		day = input.value;
		return true;
	}
};

// checks how many days are there in given month
const daysInMonth = (month, year) => {
	return new Date(year, month, 0).getDate();
};

// counts date difference and applies it to html
const countTime = (day, month, year) => {
	let birthday = `${month}.${day}.${year}`;
	let birth = new Date(birthday);
	birth.setFullYear(year); // if user passes in year between 0 and 99 it would be casted to 20th, now it works fine

	let ageDiffMill = presentDate - birth;
	let ageDiffDate = new Date(ageDiffMill);

	yearsAmount.textContent = `${ageDiffDate.getFullYear() - 1970}`;
	monthsAmount.textContent = `${ageDiffDate.getUTCMonth()}`;
	daysAmount.textContent = `${ageDiffDate.getUTCDate()-1}`;
};

const startApp = () => {
	day = 0;
	month = 0;
	year = 0;
	errCount = 0;

	inputsArr.forEach(function (item) {
		fillCheck(item);
	});


	// checks if atleast 1 element has error and applies error to others aswell - just the colors
	inputsArr.forEach(function (item) {
		let err = 0;
		if (item.classList.contains("input--error")) {
			err++;
		}
		if (err > 0) {
			inputsArr.forEach(function (input) {
				let box = input.closest(".box");
				let label = box.querySelector("label");
				input.classList.add("input--error");
				label.classList.add("label--error");
			});
		}
	});

	if (errCount == 0) {
		if (isPast(day, month, year)) {
			countTime(day, month, year);
		} else {
			inputsArr.forEach(function (item) {
				addErrors(item);
			});
		}
	}
};

const enterStart = () => {
	if (event.keyCode === 13) {
		startApp();
	}
};
arrowBtn.addEventListener("click", startApp);
document.addEventListener("keyup", enterStart);
