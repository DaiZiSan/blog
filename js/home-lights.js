class Light {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.alpha = 1;
    this.element = document.createElement('div');
    this.element.className = 'home-light';
    this.element.style.left = `${x}px`;
    this.element.style.top = `${y}px`;
    document.body.appendChild(this.element);
  }

  moveTo(targetX, targetY, duration) {
    return new Promise(resolve => {
      this.element.style.transition = `all ${duration}ms ease-in-out`;
      this.element.style.left = `${targetX}px`;
      this.element.style.top = `${targetY}px`;
      setTimeout(resolve, duration);
    });
  }

  remove() {
    this.element.remove();
  }
}

async function initHomeAnimation() {
  // 只在首页执行
  if (!document.querySelector('.home-content')) return;

  // 创建遮罩层
  const overlay = document.createElement('div');
  overlay.className = 'home-overlay';
  document.body.appendChild(overlay);

  // 隐藏主要内容
  const mainContent = document.querySelector('.home-content');
  if (mainContent) mainContent.style.opacity = '0';

  // 创建多个光点
  const lights = [];
  const numLights = 30;
  
  for (let i = 0; i < numLights; i++) {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    lights.push(new Light(x, y));
  }

  // 等待一小段时间
  await new Promise(resolve => setTimeout(resolve, 1000));

  // 让光点汇聚到中心
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  
  await Promise.all(lights.map(light => 
    light.moveTo(centerX + (Math.random() - 0.5) * 50, 
                 centerY + (Math.random() - 0.5) * 50, 
                 1500)
  ));

  // 创建爆炸效果
  const explosion = document.createElement('div');
  explosion.className = 'home-explosion';
  explosion.style.left = `${centerX}px`;
  explosion.style.top = `${centerY}px`;
  document.body.appendChild(explosion);

  // 移除所有光点
  lights.forEach(light => light.remove());

  // 显示主要内容
  if (mainContent) {
    mainContent.style.opacity = '1';
    mainContent.style.transition = 'opacity 1s ease-in-out';
  }

  // 移除遮罩层
  setTimeout(() => {
    overlay.style.opacity = '0';
    setTimeout(() => overlay.remove(), 1000);
  }, 500);
}

// 页面加载完成后执行动画
document.addEventListener('DOMContentLoaded', initHomeAnimation); 