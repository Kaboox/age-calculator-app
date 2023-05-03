const dayInput = document.querySelector("#day");
const monthInput = document.querySelector("#month");
const yearInput = document.querySelector("#year");

const yearsAmount = document.querySelector(".years");
const monthsAmount = document.querySelector(".months");
const daysAmount = document.querySelector(".days");

const arrowBtn = document.querySelector(".circle");

let day;
let month;
let year;

let currDay;
let currMonth;
let currYear;


let errCount = 0;

const presentDate = new Date();

currDay = presentDate.getUTCDay();
currMonth = presentDate.getUTCMonth() + 1;
currYear = presentDate.getUTCFullYear();

const addErrors = (box) => {
	box.querySelector(".label").classList.add("label--error");
	box.querySelector(".input").classList.add("input--error");
	box.querySelector(".error-text").textContent = "This field is required";
	box.querySelector(".error-text").style.visibility = "visible";
};

const fillCheck = (text) => {
	const box = text.closest(".box");
	const label = box.querySelector(".label");
	const input = box.querySelector(".input");
	const error = box.querySelector(".error-text");

	label.classList.remove("label--error");
	input.classList.remove("input--error");
	error.style.visibility = "hidden";

	if (text.value == "") {
		errCount++;
		addErrors(box);
	} else {
		if (dateValidation(input) == false) {
			errCount++;
			addErrors(box);
			error.textContent = "This value is invalid";
		}
	}
};

const isPast = (day, month, year) => {
	let givenDate = new Date(year, month - 1, day).getTime();
	if (presentDate.getTime() < givenDate) {
		return false;
	}
	return true;
};

const dateValidation = (input) => {
	if (input.id == "month") {
		if (input.value > 12 || input.value <= 0) {
			return false;
		}
		month = input.value;
		return true;
	} else if (input.id == "year") {
		if (input.value > presentDate.getFullYear() || input.value <= 0) {
			return false;
		}
		year = input.value;
		return true;
	} else if (input.id == "day") {
		if (input.value > daysInMonth(month, year) || input.value <= 0) {
			return false;
		}
		day = input.value;
		return true;
	}
};

const daysInMonth = (month, year) => {
	return new Date(year, month, 0).getDate();
};

const countTime = (day, month, year) => {
	let birthday = `${month}.${day}.${year}`;
	let birth = new Date(birthday);
	birth.setFullYear(year) // if user passes in year between 0 and 99 it would be casted to 20th
	
	let ageDiffMill = presentDate - birth;
	let ageDiffDate = new Date(ageDiffMill);
	
	yearsAmount.textContent = `${ageDiffDate.getFullYear() - 1970}`;
	monthsAmount.textContent = `${ageDiffDate.getUTCMonth()}`;
	daysAmount.textContent = `${ageDiffDate.getUTCDate()}`;
};

arrowBtn.addEventListener("click", () => {
	let correctDate = false;
	day = 0;
	month = 0;
	year = 0;
	errCount = 0;
	fillCheck(monthInput);
	fillCheck(yearInput);
	fillCheck(dayInput);

	if (errCount == 0) {
		correctDate = isPast(day, month, year);
	}

	if (correctDate) {
		countTime(day, month, year);
	}
});
