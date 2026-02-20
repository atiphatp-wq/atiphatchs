document.addEventListener('DOMContentLoaded', () => {
    // --- Smooth Scroll & Menu ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
        });
    });

    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => { navLinks.classList.toggle('active'); });
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => { navLinks.classList.remove('active'); });
        });
    }

    console.log("Portfolio script loaded.");

    // --- DOM Elements ---
    const pdfModal = document.getElementById("pdfModal");
    const pdfFrame = document.getElementById("pdfFrame");
    const downloadLink = document.getElementById("downloadLink");
    const closePdfBtn = document.querySelector(".close-modal");

    const lightboxModal = document.getElementById("lightboxModal");
    const carouselEl = document.getElementById("carousel"); // The rotating container
    const carouselScene = document.querySelector(".carousel-scene"); // For hover pause
    const closeLightboxBtn = document.querySelector(".lightbox-close");
    const prevBtn = document.querySelector(".lightbox-prev");
    const nextBtn = document.querySelector(".lightbox-next");

    // --- Configuration ---
    const SECTION_KEYS = ["1-1", "1-2", "1-3", "1-4", "1-5", "2-1", "2-2", "3-1", "3-2", "3-3"];

    // Static (hardcoded) PDFs that always show regardless of DB
    const STATIC_PDFS = {
        "1-4": [
            { name: "วิจัยในชั้นเรียน.pdf", url: "assets/pdfs/วิจัยในชั้นเรียน.pdf" }
        ],
        "1-5": [
            { name: "ผลงานนักเรียน.pdf", url: "assets/pdfs/ผลงานนักเรียน.pdf" }
        ],
        "2-1": [
            { name: "ครูประจำชั้น.pdf", url: "assets/pdfs/ครูประจำชั้น.pdf" }
        ],
        "2-2": [
            { name: "ประชุมผู้ปกครอง.pdf", url: "assets/pdfs/ประชุมผู้ปกครอง.pdf" }
        ],
        "3-2": [
            { name: "จิตอาสา.pdf", url: "assets/pdfs/จิตอาสา.pdf" }
        ],
        "3-3": [
            { name: "พัฒนา.pdf", url: "assets/pdfs/พัฒนา.pdf" }
        ]
    };

    const STATIC_IMAGES = {
        "1-5": [
            { name: "IMG_0424.jpg", url: "assets/images/1.5/IMG_0424.jpg" },
            { name: "IMG_0456.jpg", url: "assets/images/1.5/IMG_0456.jpg" },
            { name: "IMG_0461.jpg", url: "assets/images/1.5/IMG_0461.jpg" },
            { name: "IMG_3407.jpg", url: "assets/images/1.5/IMG_3407.jpg" },
            { name: "IMG_3692.jpg", url: "assets/images/1.5/IMG_3692.jpg" },
            { name: "IMG_3696.jpg", url: "assets/images/1.5/IMG_3696.jpg" },
            { name: "IMG_3700.jpg", url: "assets/images/1.5/IMG_3700.jpg" },
            { name: "IMG_3705.jpg", url: "assets/images/1.5/IMG_3705.jpg" },
            { name: "IMG_3714.jpg", url: "assets/images/1.5/IMG_3714.jpg" },
            { name: "IMG_3716.jpg", url: "assets/images/1.5/IMG_3716.jpg" },
            { name: "IMG_3729.jpg", url: "assets/images/1.5/IMG_3729.jpg" },
            { name: "IMG_3731.jpg", url: "assets/images/1.5/IMG_3731.jpg" }
        ],
        "2-1": [
            { name: "IMG_2592 - Copy - Copy - Copy.jpg", url: "assets/images/2.1/IMG_2592 - Copy - Copy - Copy.jpg" },
            { name: "IMG_2602 - Copy.jpg", url: "assets/images/2.1/IMG_2602 - Copy.jpg" },
            { name: "IMG_2687 - Copy.jpg", url: "assets/images/2.1/IMG_2687 - Copy.jpg" },
            { name: "IMG_2698.jpg", url: "assets/images/2.1/IMG_2698.jpg" },
            { name: "IMG_2771.jpg", url: "assets/images/2.1/IMG_2771.jpg" },
            { name: "IMG_2911.jpg", url: "assets/images/2.1/IMG_2911.jpg" },
            { name: "IMG_2912.jpg", url: "assets/images/2.1/IMG_2912.jpg" },
            { name: "IMG_3182.jpg", url: "assets/images/2.1/IMG_3182.jpg" },
            { name: "IMG_3183.jpg", url: "assets/images/2.1/IMG_3183.jpg" },
            { name: "IMG_3184.jpg", url: "assets/images/2.1/IMG_3184.jpg" },
            { name: "IMG_3575.jpg", url: "assets/images/2.1/IMG_3575.jpg" },
            { name: "IMG_3580.jpg", url: "assets/images/2.1/IMG_3580.jpg" },
            { name: "IMG_3584.jpg", url: "assets/images/2.1/IMG_3584.jpg" }
        ],
        "3-2": [
            { name: "IMG_2588.jpg", url: "assets/images/3.2/IMG_2588.jpg" },
            { name: "IMG_2603.jpg", url: "assets/images/3.2/IMG_2603.jpg" },
            { name: "IMG_2859.jpg", url: "assets/images/3.2/IMG_2859.jpg" },
            { name: "IMG_2862.jpg", url: "assets/images/3.2/IMG_2862.jpg" },
            { name: "IMG_2863.jpg", url: "assets/images/3.2/IMG_2863.jpg" },
            { name: "IMG_2868.jpg", url: "assets/images/3.2/IMG_2868.jpg" },
            { name: "IMG_2869.jpg", url: "assets/images/3.2/IMG_2869.jpg" },
            { name: "IMG_2877.jpg", url: "assets/images/3.2/IMG_2877.jpg" },
            { name: "IMG_2879.jpg", url: "assets/images/3.2/IMG_2879.jpg" },
            { name: "IMG_2880.jpg", url: "assets/images/3.2/IMG_2880.jpg" },
            { name: "IMG_2891.JPG", url: "assets/images/3.2/IMG_2891.JPG" },
            { name: "IMG_2892.JPG", url: "assets/images/3.2/IMG_2892.JPG" },
            { name: "IMG_2896.jpg", url: "assets/images/3.2/IMG_2896.jpg" },
            { name: "IMG_2899.jpg", url: "assets/images/3.2/IMG_2899.jpg" },
            { name: "IMG_2911.jpg", url: "assets/images/3.2/IMG_2911.jpg" },
            { name: "IMG_3743.jpg", url: "assets/images/3.2/IMG_3743.jpg" },
            { name: "IMG_3746.jpg", url: "assets/images/3.2/IMG_3746.jpg" }
        ],
        "3-3": [
            { name: "IMG_2796.JPG", url: "assets/images/3.3/IMG_2796.JPG" },
            { name: "IMG_2840.JPG", url: "assets/images/3.3/IMG_2840.JPG" },
            { name: "IMG_2841.JPG", url: "assets/images/3.3/IMG_2841.JPG" },
            { name: "IMG_2842.JPG", url: "assets/images/3.3/IMG_2842.JPG" },
            { name: "IMG_3513.jpg", url: "assets/images/3.3/IMG_3513.jpg" },
            { name: "IMG_3515.jpg", url: "assets/images/3.3/IMG_3515.jpg" },
            { name: "IMG_3516.jpg", url: "assets/images/3.3/IMG_3516.jpg" },
            { name: "IMG_3521.jpg", url: "assets/images/3.3/IMG_3521.jpg" },
            { name: "IMG_3724.jpg", url: "assets/images/3.3/IMG_3724.jpg" }
        ]
    };

    // State
    let sectionData = {};
    let imageData = {};

    // 3D Carousel State
    let carouselAngle = 0;
    let carouselTheta = 0;
    let carouselRadius = 0;
    let currentImageCount = 0;
    let animationId = null;
    let isAutoRotating = false;
    let isHovering = false;

    // --- IndexedDB Persistence ---
    const DB_NAME = "PortfolioDB";
    const DB_VERSION = 1;
    const STORE_NAME = "files";
    let db;

    function openDB() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(DB_NAME, DB_VERSION);

            request.onupgradeneeded = (event) => {
                db = event.target.result;
                if (!db.objectStoreNames.contains(STORE_NAME)) {
                    const store = db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
                    store.createIndex("section", "section", { unique: false });
                }
            };

            request.onsuccess = (event) => {
                db = event.target.result;
                console.log("IndexedDB opened successfully");
                resolve(db);
            };

            request.onerror = (event) => {
                console.error("IndexedDB error:", event.target.errorCode);
                reject("IndexedDB error");
            };
        });
    }

    function addFileToDB(fileData) {
        return new Promise((resolve, reject) => {
            if (!db) {
                console.error("DB not initialized");
                reject("DB not initialized");
                return;
            }
            const transaction = db.transaction([STORE_NAME], "readwrite");
            const store = transaction.objectStore(STORE_NAME);
            const request = store.add(fileData);

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    function removeFileFromDB(id) {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([STORE_NAME], "readwrite");
            const store = transaction.objectStore(STORE_NAME);
            const request = store.delete(id);

            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    function getAllFilesFromDB() {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([STORE_NAME], "readonly");
            const store = transaction.objectStore(STORE_NAME);
            const request = store.getAll();

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    // --- Data Loading ---
    async function loadData() {
        try {
            await openDB();
            const allFiles = await getAllFilesFromDB();

            // Revoke old URLs to prevent memory leaks
            SECTION_KEYS.forEach(k => {
                if (sectionData[k]) sectionData[k].forEach(f => URL.revokeObjectURL(f.url));
                if (imageData[k]) imageData[k].forEach(f => URL.revokeObjectURL(f.url));
            });

            // Clear current state
            sectionData = {};
            imageData = {};

            // Initialize Headers (optional, if you want empty lists to verify they exist)
            SECTION_KEYS.forEach(k => {
                sectionData[k] = [];
                imageData[k] = [];
            });

            // Distribute files
            allFiles.forEach(item => {
                // Reconstruct URL for display
                const fileUrl = URL.createObjectURL(item.blob);
                const entry = {
                    id: item.id,
                    name: item.name,
                    url: fileUrl,
                    isDefault: false
                };

                if (item.type === 'pdf') {
                    if (!sectionData[item.section]) sectionData[item.section] = [];
                    sectionData[item.section].push(entry);
                } else if (item.type === 'image') {
                    if (!imageData[item.section]) imageData[item.section] = [];
                    imageData[item.section].push(entry);
                }
            });

            // Add Static Images
            Object.keys(STATIC_IMAGES).forEach(key => {
                STATIC_IMAGES[key].forEach(img => {
                    if (!imageData[key]) imageData[key] = [];
                    imageData[key].push({
                        ...img,
                        id: null, // Static files don't have DB IDs
                        isDefault: true
                    });
                });
            });

            // Set Default if empty (only for 1-1 example logic)
            if (sectionData["1-1"].length === 0) {
                // Note: We can't easily put a default local file into IDB logic without fetching it as blob first.
                // For now, we'll just leave the static default in the UI if we want, or skip it.
                // Keeping it simple: No default file if IDB is empty to avoid complexity.
            }

            renderAll();

        } catch (err) {
            console.error("Failed to load data from DB:", err);
        }
    }

    // No explicit saveData() needed as we save on action

    // --- Rendering ---
    function renderAll() {
        SECTION_KEYS.forEach(key => {
            renderPdfList(key);
            renderImageList(key);
        });
    }

    function renderPdfList(key) {
        const list = document.getElementById(`pdfList-${key}`);
        if (!list) return;

        list.innerHTML = "";

        // แสดง static PDFs ก่อนเสมอ (ไม่มีปุ่มลบ)
        const staticFiles = STATIC_PDFS[key] || [];
        staticFiles.forEach((file) => {
            const li = document.createElement("li");
            li.className = "pdf-item";
            li.innerHTML = `
                <a href="${file.url}" target="_blank" class="pdf-info"
                    style="display: flex; align-items: center; gap: 10px; text-decoration: none; color: inherit; width: 100%;">
                    <i class="fa-solid fa-file-pdf" style="color: #f0ff22; font-size: 1.2rem;"></i>
                    <span>${file.name}</span>
                </a>
            `;
            list.appendChild(li);
        });

        // ตามด้วยไฟล์ที่ upload จาก IndexedDB
        const files = sectionData[key] || [];
        files.forEach((file, index) => {
            const li = document.createElement("li");
            li.className = "pdf-item";

            const deleteAttr = file.id
                ? `onclick="event.stopPropagation(); deletePdf('${key}', ${file.id})"`
                : `style="display:none"`;

            li.innerHTML = `
                <div class="pdf-info" onclick="openPdfModal('${file.url}')">
                    <i class="fa-solid fa-file-pdf"></i> <span>${file.name}</span>
                </div>
                <button class="delete-btn" ${deleteAttr} title="ลบ">
                    <i class="fa-solid fa-trash"></i>
                </button>
            `;
            list.appendChild(li);
        });
    }

    function renderImageList(key) {
        const grid = document.getElementById(`imgList-${key}`);
        if (!grid) return;

        grid.innerHTML = "";
        const images = imageData[key] || [];

        const viewBtn = document.getElementById(`viewBtn-${key}`);
        if (viewBtn) {
            viewBtn.style.display = images.length > 0 ? "inline-flex" : "none";
        }

        images.forEach((img, index) => {
            const div = document.createElement("div");
            div.className = "image-item";
            div.onclick = () => openLightbox(key, index);

            const deleteAttr = img.id
                ? `onclick="event.stopPropagation(); deleteImage('${key}', ${img.id})"`
                : `style="display:none"`;

            div.innerHTML = `
                <img src="${img.url}" loading="lazy">
                <button class="image-delete-btn" ${deleteAttr}>
                    <i class="fa-solid fa-times"></i>
                </button>
            `;
            grid.appendChild(div);
        });
    }

    // --- Actions ---
    window.deletePdf = async function (key, id) {
        if (!confirm("Are you sure you want to delete this file?")) return;
        try {
            await removeFileFromDB(id);
            // Reload to refresh state
            await loadData();
        } catch (e) {
            console.error("Delete failed", e);
            alert("Failed to delete file.");
        }
    };

    window.deleteImage = async function (key, id) {
        if (!confirm("Are you sure you want to delete this image?")) return;
        try {
            await removeFileFromDB(id);
            await loadData();
        } catch (e) {
            console.error("Delete failed", e);
            alert("Failed to delete image.");
        }
    };

    // --- Event Listeners (Uploads) ---
    document.body.addEventListener('change', function (e) {
        if (e.target.matches('input[type="file"][data-section]')) {
            const input = e.target;
            const key = input.dataset.section;
            const type = input.dataset.type; // 'image' or undefined(pdf)
            const files = Array.from(input.files);

            if (type === 'image') {
                handleImageUpload(key, files);
            } else {
                handlePdfUpload(key, files);
            }
            input.value = '';
        }
    });

    async function handlePdfUpload(key, files) {
        if (!files || files.length === 0) return;

        for (const file of files) {
            if (file.type !== "application/pdf") {
                alert(`File ${file.name} is not a PDF. Skipping.`);
                continue;
            }
            // IndexedDB handles large files well, but let's keep a sanity limit like 100MB if needed, 
            // otherwise remove limit or verify with user.
            // User asked to fix large file issue, so let's remove the 5MB limit check.

            try {
                await addFileToDB({
                    section: key,
                    type: 'pdf',
                    name: file.name,
                    blob: file, // Store the File object directly
                    createdAt: new Date()
                });
            } catch (e) {
                console.error("Upload error", e);
                alert(`Failed to save ${file.name}: ${e.message}`);
            }
        }
        await loadData();
    }

    async function handleImageUpload(key, files) {
        for (const file of files) {
            if (!file.type.startsWith('image/')) continue;

            try {
                await addFileToDB({
                    section: key,
                    type: 'image',
                    name: file.name,
                    blob: file,
                    createdAt: new Date()
                });
            } catch (e) {
                console.error("Upload error", e);
                alert(`Failed to save ${file.name}: ${e.message}`);
            }
        }
        await loadData();
    }

    // --- PDF Modal ---
    window.openPdfModal = function (url) {
        if (pdfModal) {
            pdfFrame.src = url;
            downloadLink.href = url;
            pdfModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    };

    // --- 3D Carousel Lightbox Logic ---
    window.openLightbox = function (key, selectedIndex) {
        const imgs = imageData[key];
        if (!imgs || imgs.length === 0) return;

        currentImageCount = imgs.length;
        carouselEl.innerHTML = ""; // Clear old

        // 1. Calculate Geometry
        const screenWidth = window.innerWidth;
        const width = screenWidth < 768 ? screenWidth * 0.85 : 600; // Responsive width
        const height = width * 0.67; // Maintain aspect ratio
        const gap = screenWidth < 768 ? 15 : 30;

        carouselScene.style.width = `${width}px`;
        carouselScene.style.height = `${height}px`;

        if (currentImageCount === 1) {
            carouselRadius = 0;
            carouselTheta = 0;
        } else {
            carouselTheta = 360 / currentImageCount;
            const perimeter = (width + gap) * currentImageCount;
            carouselRadius = Math.round((perimeter / 2) / Math.PI);
            carouselRadius = Math.max(carouselRadius, screenWidth < 768 ? 180 : 250);
        }

        // 2. Build Items
        imgs.forEach((img, i) => {
            const item = document.createElement('div');
            item.className = 'carousel-item-3d';
            item.style.width = `${width}px`;
            item.style.height = `${height}px`;
            item.innerHTML = `<img src="${img.url}">`;

            // Layout in Circle
            const angle = carouselTheta * i;
            item.style.transform = `rotateY(${angle}deg) translateZ(${carouselRadius}px)`;
            item.dataset.index = i;
            carouselEl.appendChild(item);
        });

        // 3. Set Initial Rotation
        carouselAngle = -(selectedIndex * carouselTheta);
        updateCarousel();

        // 4. Show Modal & Start Animation
        lightboxModal.style.display = 'flex';

        // Start Auto Rotation
        startAnimation();
    };

    function updateCarousel() {
        const zOffset = -carouselRadius;
        // Apply transform
        carouselEl.style.transform = `translateZ(${zOffset}px) rotateY(${carouselAngle}deg)`;
    }

    // Animation Loop
    function animateCarousel() {
        if (!isAutoRotating) return;

        if (!isHovering) {
            // Spin slowly to the left (decrement angle)
            carouselAngle -= 0.2;
            updateCarousel();
        }

        animationId = requestAnimationFrame(animateCarousel);
    }

    function startAnimation() {
        if (animationId) cancelAnimationFrame(animationId);
        isAutoRotating = true;
        isHovering = false;
        animateCarousel();
    }

    function stopAnimation() {
        isAutoRotating = false;
        if (animationId) cancelAnimationFrame(animationId);
    }

    // Hover Interaction
    if (carouselScene) {
        carouselScene.addEventListener('mouseenter', () => { isHovering = true; });
        carouselScene.addEventListener('mouseleave', () => { isHovering = false; });
    }

    function rotateNext() {
        carouselAngle -= carouselTheta;
        updateCarousel();
    }

    function rotatePrev() {
        carouselAngle += carouselTheta;
        updateCarousel();
    }

    // Modal Close logic helper
    function closeLightbox() {
        lightboxModal.style.display = 'none';
        document.body.style.overflow = '';
        stopAnimation();
    }

    // Modal Close/Nav Events
    if (closePdfBtn) closePdfBtn.onclick = () => { pdfModal.style.display = 'none'; document.body.style.overflow = ''; pdfFrame.src = ''; };
    if (closeLightboxBtn) closeLightboxBtn.onclick = () => { closeLightbox(); };

    // Note: Clicking buttons will jump rotation, animation continues from there
    if (nextBtn) nextBtn.onclick = (e) => { e.stopPropagation(); rotateNext(); };
    if (prevBtn) prevBtn.onclick = (e) => { e.stopPropagation(); rotatePrev(); };

    window.onclick = function (event) {
        if (event.target == pdfModal) {
            pdfModal.style.display = 'none';
            document.body.style.overflow = '';
            pdfFrame.src = '';
        }
        if (event.target == lightboxModal) {
            closeLightbox();
        }
    };

    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape") {
            pdfModal.style.display = 'none';
            if (lightboxModal.style.display === 'flex') closeLightbox();
            document.body.style.overflow = '';
        }
        if (lightboxModal.style.display === 'flex') {
            if (e.key === "ArrowRight") rotateNext();
            if (e.key === "ArrowLeft") rotatePrev();
        }
    });

    // --- Intersection Observer for Animations ---
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });

    // Init
    loadData();
    renderAll();
});
