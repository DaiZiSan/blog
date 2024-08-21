var now = new Date();

function createtime() {
    var startDate = new Date("01/08/2024 00:00:00");
    now.setTime(now.getTime() + 250);

    var days = Math.floor((now - startDate) / 1e3 / 60 / 60 / 24);
    var hours = Math.floor((now - startDate) / 1e3 / 60 / 60 - 24 * days);
    if (String(hours).length === 1) hours = "0" + hours;

    var minutes = Math.floor((now - startDate) / 1e3 / 60 - 1440 * days - 60 * hours);
    if (String(minutes).length === 1) minutes = "0" + minutes;

    var seconds = Math.round((now - startDate) / 1e3 - 86400 * days - 3600 * hours - 60 * minutes);
    if (String(seconds).length === 1) seconds = "0" + seconds;

    let message = "";
    if (hours >= 9 && hours < 18) {
        message = `<img class='boardsign' src='https://images.mingming.dev/file/a2dcdeb341a726b2a78fa.png' title='距离达成一个小目标还有点差距'><span class='textTip'> <br> 本站已运行 ${days} 天</span><span id='runtime'> ${hours} 小时 ${minutes} 分 ${seconds} 秒 </span> <i class='fas fa-heartbeat' style='color:red'></i>`;
    } else {
        message = `<img class='boardsign' src='https://images.mingming.dev/file/a2dcdeb341a726b2a78fa.png' title='别着急，慢慢来'><span class='textTip'> <br> 本站已运行 ${days} 天</span><span id='runtime'> ${hours} 小时 ${minutes} 分 ${seconds} 秒 </span> <i class='fas fa-heartbeat' style='color:red'></i>`;
    }

    if (document.getElementById("workboard")) {
        document.getElementById("workboard").innerHTML = message;
    }
}

setInterval(() => {
    createtime();
}, 250);
