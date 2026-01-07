// 落叶效果实现
function createMeteor() {
  const meteor = document.createElement("div");
  meteor.className = "meteor";

  // 随机位置
  const x = Math.random() * window.innerWidth;
  const delay = Math.random() * 2;
  const duration = 3 + Math.random() * 4; // 3-7秒，缓慢飘落
  const size = 8 + Math.random() * 12; // 8-20px，落叶大小
  const rotationSpeed = 1 + Math.random() * 2; // 1-3圈/秒
  const drift = 50 + Math.random() * 100; // 50-150px横向漂移

  meteor.style.left = x + "px";
  meteor.style.animationDelay = delay + "s";
  meteor.style.animationDuration = duration + "s";
  meteor.style.width = size + "px";
  meteor.style.height = size + "px";

  // 随机颜色变化，使用暖色调
  const colors = [
    "#ffb347", // 橙色
    "#ff8c42", // 深橙色
    "#ffd93d", // 黄色
    "#fce38a", // 浅黄色
    "#ff6b6b", // 红色
    "#ffa07a", // 浅红色
  ];
  const color = colors[Math.floor(Math.random() * colors.length)];

  // 直接设置背景色，移除阴影效果
  meteor.style.background = `linear-gradient(45deg, ${color} 0%, ${color.replace(
    "47",
    "8c"
  )} 100%)`;
  meteor.style.boxShadow = "none";
  meteor.style.zIndex = "100";

  const meteorsContainer = document.querySelector(".meteors");
  meteorsContainer.appendChild(meteor);

  // 动画结束后移除落叶，避免DOM元素堆积
  setTimeout(() => {
    meteor.remove();
  }, (delay + duration) * 1000);
}

// 定期生成落叶
function generateMeteors() {
  // 初始生成5片落叶
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      createMeteor();
    }, i * 400);
  }

  // 之后每1秒生成一片落叶
  setInterval(() => {
    if (Math.random() > 0.4) {
      // 60%的概率生成落叶
      createMeteor();
    }
  }, 1000);
}

// 页面加载完成后启动流星效果
window.addEventListener("load", () => {
  generateMeteors();
});

// 导航栏滚动效果
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// 平滑滚动到锚点
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// 添加滚动动画效果
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// 观察所有section元素
const sections = document.querySelectorAll("section");
sections.forEach((section) => {
  section.style.opacity = "0";
  section.style.transform = "translateY(50px)";
  section.style.transition = "opacity 0.8s ease, transform 0.8s ease";
  observer.observe(section);
});
