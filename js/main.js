// --- ส่วนจัดการรูปภาพอัตโนมัติ ---
const imageBasePath = 'images/';
const imageFiles = {
    'exterior': ['1.jpg', '2.jpg', '3.jpg', '4.jpg'],
    'first-floor': ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg', '11.jpg', '12.jpg'],
    'second-floor': ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg'],
    'bathrooms': ['1.jpg', '2.jpg', '3.jpg']
};

/**
 * ฟังก์ชันสำหรับสร้างแกลเลอรีและจัดเรียง Grid อัตโนมัติ
 */
function renderGallery(galleryId, images) {
    const gallery = document.getElementById(galleryId);
    if (!gallery || images.length === 0) {
        if(gallery) gallery.innerHTML = '<p class="text-center text-gray-500">ไม่มีรูปภาพในหมวดหมู่นี้</p>';
        return;
    }
    gallery.innerHTML = '';
    if (images.length === 1) gallery.className = 'grid grid-cols-1 gap-4';
    else if (images.length === 2) gallery.className = 'grid grid-cols-1 sm:grid-cols-2 gap-4';
    else if (images.length === 3) gallery.className = 'grid grid-cols-1 sm:grid-cols-3 gap-4';
    else if (images.length === 4) gallery.className = 'grid grid-cols-2 lg:grid-cols-4 gap-4';
    else gallery.className = 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4';

    images.forEach((src, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-item rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden';
        if (images.length > 2 && index === 0) {
            item.classList.add('col-span-2', 'row-span-2');
        }
        const imgElement = document.createElement('img');
        imgElement.src = src;
        imgElement.alt = `ภาพที่ ${index + 1} ของ ${galleryId.replace('-gallery', '')}`;
        imgElement.loading = 'lazy';
        item.appendChild(imgElement);
        gallery.appendChild(item);
    });
}

// --- ส่วนจัดการ Logic ของหน้าเว็บ ---
document.addEventListener('DOMContentLoaded', () => {
    // 1. สร้าง Gallery รูปภาพ
    Object.keys(imageFiles).forEach(folderKey => {
        const galleryId = `${folderKey}-gallery`;
        const fullImagePaths = imageFiles[folderKey].map(fileName => `${imageBasePath}${folderKey}/${fileName}`);
        renderGallery(galleryId, fullImagePaths);
    });

    // 2. Logic สำหรับ Modal แสดงรูปภาพ (Lightbox)
    const modal = document.getElementById("image-modal");
    const modalImg = document.getElementById("image-modal-content");
    const closeBtn = document.getElementById("modal-close");

    // ใช้ Event Delegation เพื่อประสิทธิภาพที่ดีกว่า
    document.body.addEventListener('click', function(event) {
        if (event.target.tagName === 'IMG' && event.target.closest('.gallery-item')) {
            modal.style.display = "flex";
            modalImg.src = event.target.src;
            document.body.style.overflow = 'hidden'; // ป้องกันการ scroll ด้านหลัง
        }
    });
    
    const closeModal = () => {
        modal.style.display = "none";
        document.body.style.overflow = 'auto'; // คืนค่าการ scroll
    }
    closeBtn.onclick = closeModal;
    modal.onclick = function(event) {
        // ปิดเมื่อคลิกที่พื้นหลัง (ตัว modal เอง) ไม่ใช่ที่รูป
        if (event.target === modal) {
            closeModal();
        }
    }
    
    // 3. Logic สำหรับ Scrolling Effect (Animate on Scroll)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // ให้ animation เกิดขึ้นแค่ครั้งเดียว
            }
        });
    }, {
        threshold: 0.1 // ให้เริ่มทำงานเมื่อ element แสดงผล 10%
    });

    document.querySelectorAll('.scroll-animate').forEach(el => {
        observer.observe(el);
    });

    // 4. Logic for Mobile Menu
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Close menu when a link is clicked
        mobileMenu.addEventListener('click', (event) => {
            if (event.target.tagName === 'A') {
                mobileMenu.classList.add('hidden');
            }
        });
    }
});