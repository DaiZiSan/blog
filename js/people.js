"use strict";

// 将非数组对象转换为数组
function _toConsumableArray(e) { 
    return _arrayWithoutHoles(e) || _iterableToArray(e) || _unsupportedIterableToArray(e) || _nonIterableSpread() 
}

// 抛出非可迭代对象的错误
function _nonIterableSpread() { 
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.") 
}

// 将不支持的可迭代对象转换为数组
function _unsupportedIterableToArray(e, r) { 
    if (e) { 
        if ("string" == typeof e) return _arrayLikeToArray(e, r); 
        var t = Object.prototype.toString.call(e).slice(8, -1); 
        return "Object" === t && e.constructor && (t = e.constructor.name), "Map" === t || "Set" === t ? Array.from(e) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(e, r) : void 0 
    } 
}

// 将可迭代对象转换为数组
function _iterableToArray(e) { 
    if ("undefined" != typeof Symbol && null != e[Symbol.iterator] || null != e["@@iterator"]) return Array.from(e) 
}

// 将非holes数组转换为数组
function _arrayWithoutHoles(e) { 
    if (Array.isArray(e)) return _arrayLikeToArray(e) 
}

// 将类数组对象转换为数组
function _arrayLikeToArray(e, r) { 
    (null == r || r > e.length) && (r = e.length); 
    for (var t = 0, a = new Array(r); t < r; t++)a[t] = e[t]; 
    return a 
}

// 检查类调用
function _classCallCheck(e, r) { 
    if (!(e instanceof r)) throw new TypeError("Cannot call a class as a function") 
}

// 定义属性
function _defineProperties(e, r) { 
    for (var t = 0; t < r.length; t++) { 
        var a = r[t]; 
        a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(e, a.key, a) 
    } 
}

// 创建类
function _createClass(e, r, t) { 
    return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), e 
// 配置
var config = {
    width: window.innerWidth,
    height: window.innerHeight,
    particleCount: 100, // 光点数量
    maxSpeed: 2, // 最大速度
    minSpeed: 0.5 // 最小速度
};

// 随机范围
randomRange = function (e, r) {
    return e + Math.random() * (r - e);
};

// 随机颜色
randomColor = function () {
    return `rgb(${0 | randomRange(0, 255)}, ${0 | randomRange(0, 255)}, ${0 | randomRange(0, 255)})`;
};

// 光点类
class Particle {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.x = randomRange(0, this.canvas.width);
        this.y = randomRange(0, this.canvas.height);
        this.speedX = randomRange(config.minSpeed, config.maxSpeed);
        this.speedY = randomRange(config.minSpeed, config.maxSpeed);
        this.color = randomColor();
        this.size = randomRange(1, 3);
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > this.canvas.width || this.x < 0) this.speedX = -this.speedX;
        if (this.y > this.canvas.height || this.y < 0) this.speedY = -this.speedY;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }
}

// 初始化Canvas
var canvas = document.createElement('canvas');
canvas.width = config.width;
canvas.height = config.height;
document.body.appendChild(canvas);

// 创建光点
var particles = [];
for (let i = 0; i < config.particleCount; i++) {
    particles.push(new Particle(canvas));
}

// 动画循环
function animate() {
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    requestAnimationFrame(animate);
}

animate();

// 配置
var config = { src: "https://f.zhheo.com/Guli/others/open-peeps-sheet.png", rows: 15, cols: 7 },

// 随机范围
randomRange = function (e, r) { 
    return e + Math.random() * (r - e) 
},

// 随机索引
randomIndex = function (e) { 
    return 0 | randomRange(0, e.length) 
},

// 从数组中移除元素
removeFromArray = function (e, r) { 
    return e.splice(r, 1)[0] 
},

// 从数组中移除指定元素
removeItemFromArray = function (e, r) { 
    return removeFromArray(e, e.indexOf(r)) 
},

// 从数组中随机移除元素
removeRandomFromArray = function (e) { 
    return removeFromArray(e, randomIndex(e)) 
},

// 从数组中随机获取元素
getRandomFromArray = function (e) { 
    return e[0 | randomIndex(e)] 
},

// 重置角色
resetPeep = function (e) { 
    var r, t, a = e.stage, n = e.peep, o = .5 < Math.random() ? 1 : -1, i = 100 - 250 * gsap.parseEase("power2.in")(Math.random()), s = a.height - n.height + i; 
    return 1 == o ? (r = -n.width, t = a.width, n.scaleX = 1) : (r = a.width + n.width, t = 0, n.scaleX = -1), n.x = r, n.y = s, { startX: r, startY: n.anchorY = s, endX: t } 
},

// 正常行走
normalWalk = function (e) { 
    var r = e.peep, t = e.props, a = (t.startX, t.startY), n = t.endX, o = gsap.timeline(); 
    return o.timeScale(randomRange(.5, 1.5)), o.to(r, { duration: 10, x: n, ease: "none" }, 0), o.to(r, { duration: .25, repeat: 40, yoyo: !0, y: a - 10 }, 0), o 
},

// 行走方式
walks = [normalWalk],

// 角色类
Peep = function () { 
    function e(r) { 
        var t = r.image, a = r.rect; 
        _classCallCheck(this, e), this.image = t, this.setRect(a), this.x = 0, this.y = 0, this.anchorY = 0, this.scaleX = 1, this.walk = null 
    } 
    return _createClass(e, [{ key: "setRect", value: function (e) { this.rect = e, this.width = e[2], this.height = e[3], this.drawArgs = [this.image].concat(_toConsumableArray(e), [0, 0, this.width, this.height]) } }, { key: "render", value: function (e) { e.save(), e.translate(this.x, this.y), e.scale(this.scaleX, 1), e.drawImage.apply(e, _toConsumableArray(this.drawArgs)), e.restore() } }]), e 
}(),

// 创建图片元素
img = document.createElement("img"); 
img.onload = init, img.src = config.src; 

// 获取canvas和上下文
let canvas = document.querySelector("#peoplecanvas"), ctx = canvas ? canvas.getContext("2d") : void 0, stage = { width: 0, height: 0 }, allPeeps = [], availablePeeps = [], crowd = []; 

// 初始化
function init() { 
    canvas && (createPeeps(), resize(), gsap.ticker.add(render), window.addEventListener("resize", resize)) 
}

// 创建角色
function createPeeps() { 
    for (var e = config.rows, r = config.cols, t = e * r, a = img.naturalWidth / e, n = img.naturalHeight / r, o = 0; o < t; o++)allPeeps.push(new Peep({ image: img, rect: [o % e * a, (o / e | 0) * n, a, n] })) 
}

// 调整大小
function resize() { 
    canvas && 0 != canvas.clientWidth && (stage.width = canvas.clientWidth, stage.height = canvas.clientHeight, canvas.width = stage.width * devicePixelRatio, canvas.height = stage.height * devicePixelRatio, crowd.forEach((function (e) { e.walk.kill() })), crowd.length = 0, availablePeeps.length = 0, availablePeeps.push.apply(availablePeeps, allPeeps), initCrowd()) 
}

// 初始化人群
function initCrowd() { 
    for (; availablePeeps.length;)addPeepToCrowd().walk.progress(Math.random()) 
}

// 添加角色到人群
function addPeepToCrowd() { 
    var e = removeRandomFromArray(availablePeeps), r = getRandomFromArray(walks)({ peep: e, props: resetPeep({ peep: e, stage: stage }) }).eventCallback("onComplete", (function () { removePeepFromCrowd(e), addPeepToCrowd() })); 
    return e.walk = r, crowd.push(e), crowd.sort((function (e, r) { return e.anchorY - r.anchorY })), e 
}

// 从人群中移除角色
function removePeepFromCrowd(e) { 
    removeItemFromArray(crowd, e), availablePeeps.push(e) 
}

// 渲染
function render() { 
    canvas && (canvas.width = canvas.width, ctx.save(), ctx.scale(devicePixelRatio, devicePixelRatio), crowd.forEach((function (e) { e.render(ctx) })), ctx.restore()) 
}

// 监听pjax成功事件
document.addEventListener("pjax:success", (e => { 
    canvas = document.querySelector("#peoplecanvas"), ctx = canvas ? canvas.getContext("2d") : void 0, window.removeEventListener("resize", resize), gsap.ticker.remove(render), setTimeout((() => { init() }), 300) 
}));