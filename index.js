/*Loading function*/
window.addEventListener('load', function (event) {
    const loadingOverlay = document.getElementById('loadingOverlay');
    setTimeout(function () {
        loadingOverlay.style.display = 'none';
    }, 0);
});

/*Home_add button*/
const addbtn = document.querySelector(".add-btn");
const popupoverlay = document.querySelector(".popup-overlay");
const popupbox = document.querySelector(".popup-box");
const popuptitle = document.querySelector(".content-header");
const mainbox = document.querySelector(".main");
const inputbox = document.getElementById("input-box");
const container = document.querySelector(".container");
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

addbtn.addEventListener("click", function () {
    popupoverlay.style.display = "block";
    popupbox.style.display = "block";
    document.body.style.overflow = 'hidden';
    inputbox.focus();
});

/*Hide Welcome Menu*/
const welcome = document.querySelector(".welcome");

function hidewelcome() {
    var element = welcome
    var style = window.getComputedStyle(element);
    var display = style.getPropertyValue('display');
    localStorage.setItem('displayofwelcome', display);
    welcome.style.display = "none";
}

/*Retrieve hidden welcome*/
document.addEventListener('DOMContentLoaded', function () {
    let hiddenwelcome = localStorage.getItem('displayofwelcome');

    if (hiddenwelcome) {
        document.querySelector(".welcome").style.display = "none";
    }

});

/*Theme popup open*/
const changetheme = document.querySelector(".change-theme");
const backgroundpopup = document.querySelector(".change-background-window");

changetheme.addEventListener("click", function () {
    popupoverlay.style.display = "block";
    backgroundpopup.style.display = "block"
    document.body.style.overflow = 'hidden';
});

/*Theme popup close*/
const closechangetheme = document.querySelector(".background-popup-cancel");

closechangetheme.addEventListener("click", function () {
    popupoverlay.style.display = "none";
    backgroundpopup.style.display = "none"
    document.body.style.overflow = 'auto';
});

/*Change Theme*/
document.querySelectorAll('.cb').forEach(function (element) {

    element.addEventListener('click', function () {
        const imageUrl = element.getAttribute('data-image');
        document.querySelector(".background").style.backgroundImage = `url(${imageUrl})`;
        localStorage.setItem('backgroundUrl', imageUrl);
        popupoverlay.style.display = "none";
        backgroundpopup.style.display = "none"
        document.body.style.overflow = 'auto';
    });

});

/*Retrieve themes after reload*/

document.addEventListener('DOMContentLoaded', function () {
    let storedBackgroundUrl = localStorage.getItem('backgroundUrl');
    if (storedBackgroundUrl) {
        document.querySelector(".background").style.backgroundImage = `url(${storedBackgroundUrl})`;
    }
});

/* Add date & time to container */
function getCurrentDateTime() {
    let dateobj = new Date(),
        month = months[dateobj.getMonth()],
        day = dateobj.getDate(),
        year = dateobj.getFullYear(),
        hours = dateobj.getHours(),
        minutes = dateobj.getMinutes().toString().padStart(2, '0'),
        seconds = dateobj.getSeconds().toString().padStart(2, '0');

    return `${month} ${day}, ${year} ${hours}:${minutes}:${seconds}`;
}

/* Add task to container */
function addTask() {
    if (inputbox.value === '') {
        alert("Can't add empty task");
    } else {
        let div = document.createElement("div");
        div.setAttribute("class", "container-list");
        div.innerHTML = `
            <input id="checkbox"  type="checkbox" onchange="toggleTask(event)">
            <p>${inputbox.value}</p>
            <span>
                <button onclick="deleteTask(event)">🗑️ Delete</button> ${getCurrentDateTime()}
            </span>`;
        container.prepend(div);
        popupoverlay.style.display = "none";
        popupbox.style.display = "none";
        document.body.style.overflow = 'auto';
        inputbox.value = "";
        saveData();
    }
}

/* Close popup */
const cancelpopup = document.querySelector(".popup-cancel");

cancelpopup.addEventListener("click", function () {
    popupoverlay.style.display = "none";
    popupbox.style.display = "none";
    document.body.style.overflow = 'auto';
});

/* Delete task after added */
function deleteTask(event) {
    event.target.parentElement.parentElement.remove();
    saveData();
}

/* Task done strike */
function toggleTask(event) {
    event.target.parentElement.classList.toggle("checked");
    saveData();
}

/* Save data */
function saveData() {
    const tasks = [];
    document.querySelectorAll('.container-list').forEach(task => {
        tasks.push({
            text: task.querySelector('p').innerText,
            dateTime: task.querySelector('span').childNodes[2].textContent.trim(),
            checked: task.querySelector('input[type="checkbox"]').checked
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

/* Show data after reload */
function showTask() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks && tasks.length > 0) {
        tasks.forEach(task => {
            let div = document.createElement('div');
            div.setAttribute('class', 'container-list');
            div.innerHTML = `
                <input id="checkbox"  type="checkbox" ${task.checked ? 'checked' : ''} onchange="toggleTask(event)">
                <p>${task.text}</p>
                <span>
                    <button onclick="deleteTask(event)">🗑️ Delete</button> ${task.dateTime}
                </span>`;
            if (task.checked) {
                div.classList.add("checked");
            }
            container.appendChild(div); // Use appendChild to avoid prepending initial task again
            saveData();
        });
    }
}

showTask();


