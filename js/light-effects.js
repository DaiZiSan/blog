// 添加调试日志
console.log('Light effects script loaded');

// 创建悬浮光点
function createFloatingLight() {
  console.log('Creating new light');
  const light = document.createElement('div');
  light.className = 'floating-light';
  
  // 随机起始位置
  const startX = Math.random() * window.innerWidth;
  const startY = Math.random() * window.innerHeight;
  light.style.left = `${startX}px`;
  light.style.top = `${startY}px`;
  
  // 随机移动方向和距离
  const moveX = (Math.random() - 0.5) * 200;
  const moveY = (Math.random() - 0.5) * 200;
  light.style.setProperty('--move-x', `${moveX}px`);
  light.style.setProperty('--move-y', `${moveY}px`);
  
  document.body.appendChild(light);
  
  // 动画结束后移除光点
  light.addEventListener('animationend', () => {
    light.remove();
  });
}

// 初始化函数
function initLightEffect() {
  console.log('Initializing light effects');
  // 每秒创建一个新光点
  setInterval(createFloatingLight, 1000);
  
  // 初始创建一些光点
  for(let i = 0; i < 5; i++) {
    createFloatingLight();
  }
}

// 确保在 DOM 加载完成后初始化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLightEffect);
} else {
  initLightEffect();
}

// 鼠标移动效果
let lastTime = 0;
document.addEventListener('mousemove', (e) => {
  const now = Date.now();
  if (now - lastTime > 50) {
    const light = document.createElement('div');
    light.className = 'floating-light';
    light.style.left = `${e.clientX}px`;
    light.style.top = `${e.clientY}px`;
    
    const moveX = (Math.random() - 0.5) * 100;
    const moveY = (Math.random() - 0.5) * 100;
    light.style.setProperty('--move-x', `${moveX}px`);
    light.style.setProperty('--move-y', `${moveY}px`);
    
    document.body.appendChild(light);
    lastTime = now;
  }
}); 