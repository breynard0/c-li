let intro_completed = false;

let initial_container = document.getElementById("initial_container");
let blink_container = document.getElementById("blink_container");
let initial_text = initial_container.innerText;
let blink_text = blink_container.innerText;

let main_content_open = false;

const replace_dictionary = {
    "#c-li": "<a href=\"https://hackclub.enterprise.slack.com/archives/C0BL66JKRUJ\">#c-li</a>",
    "this form here": "<a href=\"https://forms.hackclub.com/c-li-submission\">this form here</a>",
    "Hacknet": "<a href=\"https://store.steampowered.com/app/365450/Hacknet\">Hacknet</a>",
    "TIS-100": "<a href=\"https://store.steampowered.com/app/370360/TIS100/\">TIS100</a>",
    "MOLEK-SYNTEZ": "<a href=\"https://store.steampowered.com/app/1168880/MOLEKSYNTEZ/\">MOLEK-SYNTEZ</a>",
    "Move Code Lines": "<a href=\"https://store.steampowered.com/app/1300310/Move_Code_Lines/\">Move Code Lines</a>",
    "Duskers": "<a href=\"https://store.steampowered.com/app/254320/Duskers\">Duskers</a>",
}

const end_timestamp = Date.UTC(2026, 6, 30, 20, 0, 0, 0)
let countdown_element = document.getElementById("countdown");
setInterval(() => {
    let time = end_timestamp - Date.now();
    let days = Math.floor(time / (1000 * 60 * 60 * 24));
    let hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((time % (1000 * 60)) / 1000);
    countdown_element.innerText = `${days}d ${hours}h ${minutes}m ${seconds}s left!`;
});

let len = 0;
const tick_interval = setInterval(() => {
    if (len >= initial_text.length + blink_text.length) {
        intro_completed = true;
        clearInterval(tick_interval);
    }
    initial_container.innerText = initial_text.slice(0, len);
    if (len < initial_text.length) {
        initial_container.innerText += "_";
    } else {
        blink_container.innerText += "_";
    }
    blink_container.innerText = blink_text.slice(0, Math.max(0, len - initial_text.length));
    len++;
}, 5);


const cursor_tick = setInterval(() => {
    if (!intro_completed) {
        return;
    }
    if (main_content_open) {
        if (blink_container.innerText[blink_container.innerText.length - 1] === "_") {
            blink_container.innerText = blink_container.innerText.slice(0, -1);
        }
        clearInterval(cursor_tick);
        return;
    }
    if (blink_container.innerText[blink_container.innerText.length - 1] === "_") {
        blink_container.innerText = blink_container.innerText.slice(0, -1);
    } else {
        blink_container.innerText += "_";
    }
}, 500);

onkeydown = (e) => {
    if (e.key === "Enter") {
        start_main_content_fade_in();
    }
};

onclick = (_ => {
    start_main_content_fade_in();
});

ontouchstart = (_ => {
    start_main_content_fade_in();
});

function start_main_content_fade_in() {
    if (!main_content_open) {
        let collection = document.getElementsByClassName("fill_in_text");
        document.getElementById("logo_img").style.animationPlayState = 'running';
        for (let i = 0; i < collection.length; i++) {
            let element = collection[i];
            let len = 0;
            let text = element.getAttribute("text").replace(/\n/g, "");
            let interval = setInterval(() => {
                element.innerText = text.slice(0, len);
                if (len >= text.length) {
                    for (let key in replace_dictionary) {
                        element.innerHTML = element.innerHTML.replace(key, replace_dictionary[key]);
                    }
                    clearInterval(interval);
                }
                len++;
            }, 5);
        }
        main_content_open = true;
    }
}