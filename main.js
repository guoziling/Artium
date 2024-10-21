import './assets/scss/all.scss';
import 'bootstrap/dist/js/bootstrap.min.js';

console.log("Hello world!");

// module.exports = {
//     plugins: [
//       require('autoprefixer')
//     ]
//   };
  

$(document).ready(function() {
    const navigationItems = $('.navigation-item'); // 取得所有導航圈圈
    const detailItems = $('.detail-item'); // 取得所有細節內容
    let currentIndex = 0; // 記錄當前選中的索引

    detailItems.removeClass('active'); // 移除所有細節項目的 active 樣式
    detailItems.eq(currentIndex).addClass('active'); // 將當前索引對應的細節項目標記為 active

    // 修改的函數：使被選中的圈圈移動到圓的最上方
    function rotateNavigationItems(index) {
        const totalItems = navigationItems.length;  // 獲取圈圈的總數量
        const angleStep = 360 / totalItems;  // 每個圈圈在圓周上的角度差

        navigationItems.each(function(i, item) {
            // 計算每個圈圈的旋轉角度，將選中的圈圈放到頂部 (0 度)
            const rotationAngle = angleStep * ((i - index + totalItems) % totalItems); 
            const radian = (rotationAngle - 90) * Math.PI / 180; // 調整角度，使選中項目顯示在最上方

            // 使用 GSAP 設定動畫
            gsap.to(item, {
                duration: 0.3,
                ease: 'power2.out',
                x: 150 * Math.cos(radian),  // X 軸位置
                y: 150 * Math.sin(radian),  // Y 軸位置
                scale: i === index ? 1.2 : 0.8  // 被選中的圈圈放大，其它圈圈縮小
            });

            // 處理圈圈的選中狀態動畫效果
            if ($(item).hasClass('active')) {
                gsap.to(item, {
                    scale: 1.2 // 放大選中的圈圈
                });
            } else {
                gsap.to(item, {
                    scale: 0.8 // 未選中的圈圈縮小
                });
            }
        });
    }

    // 初始化旋轉導航圈圈
    rotateNavigationItems(currentIndex);

    // 當用戶點擊某個導航圈圈時
    navigationItems.on('click', function() {
        const index = $(this).index(); // 取得被點擊圈圈的索引

        if (index !== currentIndex) {
            // 移除所有圈圈的 active 樣式
            navigationItems.removeClass('active');
            // 為被點擊的圈圈添加 active 樣式
            $(this).addClass('active');

            // 移除所有細節項目的 active 樣式
            detailItems.removeClass('active');
            // 為點擊對應的細節項目添加 active 樣式
            detailItems.eq(index).addClass('active');

            // 旋轉圈圈，並將選中的移到最上方
            rotateNavigationItems(index);

            // 更新當前索引
            currentIndex = index;

            // 為當前顯示的細節項目添加動畫
            const currentDetail = detailItems.eq(index);
            gsap.from(currentDetail.find('.headline'), {
                duration: 0.5,
                y: 50,
                opacity: 0,
                ease: 'power2.out'
            });

            gsap.from(currentDetail.find('.background'), {
                duration: 0.8,
                scale: 1.1,
                ease: 'power2.out'
            });
        }
    });
});
