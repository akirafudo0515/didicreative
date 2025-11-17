/* =========================
   主要功能初始化
========================= */
(function() {
    'use strict';

    // DOM 載入完成後執行
    document.addEventListener('DOMContentLoaded', function() {
        initHamburgerMenu();
        initSubmenu();
        initCarousel();
        initLightbox();
        initScrollToTop();
        initRevealAnimation();
        initNavbarHide();
        smoothScroll();
    });

    /* =========================
       漢堡選單（手機版）
    ========================= */
    function initHamburgerMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('#navMenu');
        
        if (!hamburger || !navMenu) return;

        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
            hamburger.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('open');
        });

        // 點擊外部關閉選單
        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
                hamburger.setAttribute('aria-expanded', 'false');
                navMenu.classList.remove('open');
            }
        });

        // 點擊連結後關閉選單（手機版）
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 959.98) {
                    hamburger.setAttribute('aria-expanded', 'false');
                    navMenu.classList.remove('open');
                }
            });
        });
    }

    /* =========================
       子選單展開/收合
    ========================= */
    function initSubmenu() {
        const menuItems = document.querySelectorAll('.menu > li.has-sub');
        
        menuItems.forEach(item => {
            const link = item.querySelector('.nav-link');
            const submenu = item.querySelector('.submenu');
            
            if (!link || !submenu) return;

            link.addEventListener('click', function(e) {
                // 桌機版：hover 顯示，不需點擊
                if (window.innerWidth > 959.98) {
                    return;
                }

                // 手機版：點擊展開/收合
                e.preventDefault();
                const isOpen = item.classList.contains('open');
                
                // 關閉其他開啟的子選單
                menuItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('open');
                        const otherSubmenu = otherItem.querySelector('.submenu');
                        if (otherSubmenu) otherSubmenu.style.display = 'none';
                    }
                });

                // 切換當前子選單
                item.classList.toggle('open');
                submenu.style.display = isOpen ? 'none' : 'block';
            });
        });

        // 桌機版 hover 顯示子選單
        if (window.innerWidth > 959.98) {
            menuItems.forEach(item => {
                const submenu = item.querySelector('.submenu');
                if (!submenu) return;

                item.addEventListener('mouseenter', function() {
                    submenu.style.display = 'block';
                });

                item.addEventListener('mouseleave', function() {
                    submenu.style.display = 'none';
                });
            });
        }

        // 視窗大小改變時重置子選單狀態
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                menuItems.forEach(item => {
                    item.classList.remove('open');
                    const submenu = item.querySelector('.submenu');
                    if (submenu) {
                        if (window.innerWidth > 959.98) {
                            submenu.style.display = 'none';
                        } else {
                            submenu.style.display = 'none';
                        }
                    }
                });
            }, 250);
        });
    }

    /* =========================
       輪播（Carousel）功能
    ========================= */
    function initCarousel() {
        const carousels = document.querySelectorAll('.carousel');
        
        carousels.forEach(carousel => {
            const track = carousel.querySelector('.track');
            const prevBtn = carousel.querySelector('.carousel-btn-prev') || carousel.querySelector('.nav.prev');
            const nextBtn = carousel.querySelector('.carousel-btn-next') || carousel.querySelector('.nav.next');
            
            if (!track || !prevBtn || !nextBtn) return;

            // 取得每列顯示數量
            const colsDesktop = parseInt(carousel.dataset.colsDesktop) || 3;
            const colsMobile = parseInt(carousel.dataset.colsMobile) || 2;
            const isMobile = window.innerWidth <= 980;
            const cols = isMobile ? colsMobile : colsDesktop;

            // 計算滑動距離
            function getScrollAmount() {
                const items = track.querySelectorAll('.item');
                if (items.length === 0) return 0;
                
                const firstItem = items[0];
                const itemWidth = firstItem.offsetWidth;
                const gap = parseFloat(getComputedStyle(track).gap) || 16;
                return itemWidth + gap;
            }

            // 上一張
            prevBtn.addEventListener('click', function() {
                const scrollAmount = getScrollAmount();
                track.scrollBy({
                    left: -scrollAmount,
                    behavior: 'smooth'
                });
            });

            // 下一張
            nextBtn.addEventListener('click', function() {
                const scrollAmount = getScrollAmount();
                track.scrollBy({
                    left: scrollAmount,
                    behavior: 'smooth'
                });
            });

            // 視窗大小改變時更新
            let resizeTimer;
            window.addEventListener('resize', function() {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(function() {
                    // 觸發重新計算
                }, 250);
            });
        });
    }

    /* =========================
       燈箱（Lightbox）功能
    ========================= */
    function initLightbox() {
        const lightbox = document.getElementById('lightbox');
        const lbImg = lightbox?.querySelector('.lb-img');
        const lbClose = lightbox?.querySelector('.lb-close');
        const lightboxTriggers = document.querySelectorAll('[data-lightbox]');
        
        if (!lightbox || !lbImg || !lbClose) return;

        // 開啟燈箱
        lightboxTriggers.forEach(trigger => {
            trigger.addEventListener('click', function(e) {
                e.preventDefault();
                const imgSrc = trigger.href || trigger.dataset.lightbox;
                if (imgSrc) {
                    lbImg.src = imgSrc;
                    lbImg.alt = trigger.querySelector('img')?.alt || '燈箱圖片';
                    lightbox.classList.add('open');
                    lightbox.setAttribute('aria-hidden', 'false');
                    document.body.style.overflow = 'hidden'; // 防止背景滾動
                }
            });
        });

        // 關閉燈箱
        function closeLightbox() {
            lightbox.classList.remove('open');
            lightbox.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }

        lbClose.addEventListener('click', closeLightbox);

        // 點擊背景關閉
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        // ESC 鍵關閉
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && lightbox.classList.contains('open')) {
                closeLightbox();
            }
        });
    }

    /* =========================
       回到頂部按鈕
    ========================= */
    function initScrollToTop() {
        const topBtn = document.querySelector('.fab-top');
        if (!topBtn) return;

        // 顯示/隱藏按鈕
        function toggleTopButton() {
            if (window.scrollY > 300) {
                topBtn.style.display = 'grid';
            } else {
                topBtn.style.display = 'none';
            }
        }

        // 滾動到頂部
        topBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        window.addEventListener('scroll', toggleTopButton);
        toggleTopButton(); // 初始狀態
    }

    /* =========================
       Reveal 進場動畫
    ========================= */
    function initRevealAnimation() {
        const reveals = document.querySelectorAll('.reveal');
        if (reveals.length === 0) return;

        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -100px 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in');
                    
                    // 強制觸發 shiny-text 動畫
                    const shinyTexts = entry.target.querySelectorAll('.shiny-text');
                    shinyTexts.forEach(text => {
                        // 強制重新觸發動畫
                        text.style.animation = 'none';
                        void text.offsetWidth; // 觸發重排
                        text.style.animation = null;
                    });
                    
                    // 動畫執行後可以移除 observer（可選）
                    // observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        reveals.forEach(reveal => {
            observer.observe(reveal);
        });
        
        // 如果 hero 已經在視窗內，立即觸發
        const hero = document.querySelector('.hero.reveal');
        if (hero) {
            const rect = hero.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                hero.classList.add('in');
            }
        }
        
        // 強制啟動 shiny-text 動畫（不管 reveal 狀態）
        function forceShinyTextAnimation() {
            const shinyTexts = document.querySelectorAll('.shiny-text');
            shinyTexts.forEach(text => {
                // 確保動畫執行 - 頻率慢一點（5秒），平滑過渡
                if (text.classList.contains('small')) {
                    text.style.animation = 'shine 5s linear infinite';
                } else if (text.classList.contains('big')) {
                    text.style.animation = 'shine 5s linear infinite 2.2s';
                }
                // 確保動畫播放
                text.style.animationPlayState = 'running';
            });
        }
        
        // 立即執行一次
        forceShinyTextAnimation();
        
        // 延遲執行確保樣式已載入
        setTimeout(forceShinyTextAnimation, 100);
        setTimeout(forceShinyTextAnimation, 500);
    }

    /* =========================
       Navbar 滾動隱藏/顯示
       當分隔 icon 離開視窗時隱藏，回到視窗時顯示
    ========================= */
    function initNavbarHide() {
        const header = document.querySelector('.site-header');
        const separator = document.querySelector('.separator');
        
        if (!header || !separator) return;

        // 使用 IntersectionObserver 監聽 separator 的可見性
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0 // 當 separator 完全離開視窗時觸發
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // separator 在視窗中，顯示 navbar
                    header.classList.remove('hide');
                } else {
                    // separator 離開視窗，隱藏 navbar
                    header.classList.add('hide');
                }
            });
        }, observerOptions);

        observer.observe(separator);
    }

    /* =========================
       平滑滾動（錨點連結）
    ========================= */
    function smoothScroll() {
        // 使用 CSS scroll-behavior: smooth 即可
        // 這裡可以添加額外的平滑滾動邏輯（如果需要）
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        
        anchorLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = link.getAttribute('href');
                if (href === '#' || href === '#top') return;
                
                const target = document.querySelector(href);
                if (target) {
                    // 讓瀏覽器自然處理平滑滾動
                    // CSS 已設定 scroll-behavior: smooth
                }
            });
        });
    }

})();
