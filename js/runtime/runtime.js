var now=new Date;function createtime(){var e=new Date("08/01/2024 00:00:00");now.setTime(now.getTime()+250);var a=Math.floor((now-e)/1e3/60/60/24),t=Math.floor((now-e)/1e3/60/60-24*a);1===String(t).length&&(t="0"+t);var n=Math.floor((now-e)/1e3/60-1440*a-60*t);1===String(n).length&&(n="0"+n);var r=Math.round((now-e)/1e3-86400*a-3600*t-60*n);1===String(r).length&&(r="0"+r);let s="";s=t>=9&&t<18?`<img class='boardsign' src='https://images.mingming.dev/file/a2dcdeb341a726b2a78fa.png' title='距离达成一个小目标还有点差距'><span class='textTip'> <br> 本站已运行 ${a} 天</span><span id='runtime'> ${t} 小时 ${n} 分 ${r} 秒 </span> <i class='fas fa-heartbeat' style='color:red'></i>`:`<img class='boardsign' src='https://images.mingming.dev/file/a2dcdeb341a726b2a78fa.png' title='别着急，慢慢来'><span class='textTip'> <br> 本站已运行 ${a} 天</span><span id='runtime'> ${t} 小时 ${n} 分 ${r} 秒 </span> <i class='fas fa-heartbeat' style='color:red'></i>`,document.getElementById("workboard")&&(document.getElementById("workboard").innerHTML=s)}setInterval((()=>{createtime()}),250);