/* 텍스트 애니메이션 */
const lenis = new Lenis({
    duration: 2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);




// ScrollTrigger와 Lenis 연동
gsap.registerPlugin(ScrollTrigger);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

ScrollTrigger.defaults({
  scroller: document.querySelector('.lenis')
});

// nav 링크 클릭시 부드러운 스크롤
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        
        if (href === '#') {
            lenis.scrollTo(0);  // 맨 위로 이동
        } else {
            const target = document.querySelector(href);
            if (target) {
                lenis.scrollTo(target);
            }
        }
    });
});


