  const mainVisual = document.querySelector('.main-visual');
        const stage = document.getElementById('stage');
        const panelLeft = document.getElementById('panelLeft');
        const panelRight = document.getElementById('panelRight');
        const behindText = document.getElementById('behindText');
        const hint = document.getElementById('hint');
        const skills = document.getElementById('skills'); 

        let isDragging = false;
        let startX = 0;
        let currentOffset = 0;
        let totalOffset = 0;
        const MAX_OFFSET = window.innerWidth * 0.35;
        const REVEAL_THRESHOLD = 0.35;

        function applyOffset(offset) {
            panelLeft.style.transform = `translateX(${-offset}px)`;
            panelRight.style.transform = `translateX(${offset}px)`;

            const ratio = offset / MAX_OFFSET;

            if (ratio > REVEAL_THRESHOLD) {
                behindText.classList.add('revealed');
                skills.classList.add('revealed');
                 document.body.style.overflowY = 'auto';
            } else {
                behindText.classList.remove('revealed');
                skills.classList.remove('revealed');
                   document.body.style.overflowY = 'hidden';
            }
        }
        //드래그시작
        function onStart(e) {
            isDragging = true;
            startX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
            mainVisual.classList.add('dragging');
            panelLeft.style.transition = 'none';
            panelRight.style.transition = 'none';
            hint.classList.add('hidden');
        }

        function onMove(e) {
            if (!isDragging) return;
            const x = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
            const dx = x - startX;

            const delta = totalOffset > 0 ? dx : Math.abs(dx);
            currentOffset = Math.max(0, Math.min(MAX_OFFSET, totalOffset + delta));
            applyOffset(currentOffset);
        }
        //드래그닫힘
        function onEnd() {
            if (!isDragging) return;
            isDragging = false;
            mainVisual.classList.remove('dragging');
            panelLeft.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            panelRight.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';

            const ratio = currentOffset / MAX_OFFSET;

            if (ratio > REVEAL_THRESHOLD) {
                totalOffset = MAX_OFFSET;
            } else {
                totalOffset = 0;
                hint.classList.remove('hidden');
            }

            applyOffset(totalOffset);
            currentOffset = totalOffset;
        }

        // Mouse
        stage.addEventListener('mousedown', onStart);
        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseup', onEnd);

        // Touch
        stage.addEventListener('touchstart', onStart, { passive: true });
        window.addEventListener('touchmove', onMove, { passive: true });
        window.addEventListener('touchend', onEnd);


        //프로젝트 탭
        document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.project-panel').forEach(p => p.classList.remove('active'));

        this.classList.add('active');
        document.getElementById(this.dataset.target).classList.add('active');
    });
});

