// FLOWER VARIETIES & SOFT MOONLIT SHADES
const flowerTypes = [
    "cosmos",
    "daisy",
    "tulip",
    "baby",
    "wildflower"
];

const petalTones = [
    "tone-white",
    "tone-ivory",
    "tone-cream",
    "tone-peach"
];

const garden = document.getElementById("flowerGarden");
const starsContainer = document.getElementById("stars");
const grassField = document.getElementById("grassField");
const firefliesContainer = document.getElementById("fireflies");


// PETAL COUNT PER VARIETY
function getPetalCount(type) {
    if (type === "baby") return 4;
    if (type === "daisy") return 12;
    if (type === "tulip") return 6;
    if (type === "wildflower") return 5;
    return 8; // cosmos
}


// CREATE AN INDIVIDUAL FLOWER
function createFlower(x, type, options = {}) {
    if (!garden) return;

    const { isClickBloom = false, customHeight = null } = options;
    const isMobile = window.innerWidth <= 600;

    const flower = document.createElement("div");
    const tone = petalTones[Math.floor(Math.random() * petalTones.length)];

    flower.className = `flower ${type} ${tone}`;
    if (isClickBloom) {
        flower.classList.add("clicked-bloom");
    }

    const minBase = isMobile ? 85 : 120;
    const rangeBase = isMobile ? 190 : 300;
    const height = customHeight !== null
        ? customHeight
        : (type === "baby"
            ? 80 + Math.random() * 125
            : minBase + Math.random() * rangeBase);

    const delay = isClickBloom ? 0 : Math.random() * 3.5;
    const scale = (isMobile ? 0.72 : 0.82) + Math.random() * 0.32;
    const swayDuration = 5 + Math.random() * 3.5;

    flower.style.left = `${Math.max(4, Math.min(96, x))}%`;
    flower.style.setProperty("--flower-height", `${height}px`);
    flower.style.setProperty("--delay", `${delay}s`);
    flower.style.setProperty("--flower-scale", `${scale.toFixed(2)}`);
    flower.style.setProperty("--sway-duration", `${swayDuration.toFixed(1)}s`);

    // STEM
    const stem = document.createElement("div");
    stem.className = "stem";

    // LEAVES AT NATURAL HEIGHTS
    const leftLeaf = document.createElement("div");
    leftLeaf.className = "leaf left";
    leftLeaf.style.bottom = `${24 + Math.random() * 24}%`;

    const rightLeaf = document.createElement("div");
    rightLeaf.className = "leaf right";
    rightLeaf.style.bottom = `${46 + Math.random() * 24}%`;

    // FLOWER HEAD
    const head = document.createElement("div");
    head.className = "flower-head";

    // PETALS
    const petalCount = getPetalCount(type);

    for (let i = 0; i < petalCount; i++) {
        const petal = document.createElement("div");
        petal.className = `petal petal-${i + 1}`;
        head.appendChild(petal);
    }

    // FLOWER CENTRE
    const center = document.createElement("div");
    center.className = "flower-center";
    head.appendChild(center);

    // ASSEMBLE FLOWER
    stem.appendChild(leftLeaf);
    stem.appendChild(rightLeaf);

    flower.appendChild(stem);
    flower.appendChild(head);

    garden.appendChild(flower);
}


// GROW FLOWERS IN NATURAL CLUSTERS
function growGarden() {
    if (!garden) return;
    garden.innerHTML = "";

    const isMobile = window.innerWidth <= 600;
    const clusters = isMobile ? [14, 48, 82] : [6, 26, 48, 70, 91];

    clusters.forEach(center => {
        const flowersInCluster = isMobile
            ? 3 + Math.floor(Math.random() * 2)
            : 5 + Math.floor(Math.random() * 3);

        for (let i = 0; i < flowersInCluster; i++) {
            const spread = isMobile ? 16 : 14;
            const position = center + (Math.random() - 0.5) * spread;
            const type = flowerTypes[Math.floor(Math.random() * flowerTypes.length)];
            createFlower(position, type);
        }
    });
}


// CREATE SUBTLE STARS IN THE NIGHT SKY
function createStars() {
    if (!starsContainer) return;
    starsContainer.innerHTML = "";

    const starCount = window.innerWidth <= 600 ? 22 : 38;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement("span");
        star.className = "star";

        const size = 1.5 + Math.random() * 2;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 56}%`;
        star.style.opacity = `${0.15 + Math.random() * 0.45}`;

        starsContainer.appendChild(star);
    }
}


// CREATE NATURAL GRASS BLADES AND SMALL LOW PLANTS
function createGardenFloor() {
    if (!grassField) return;
    grassField.innerHTML = "";

    const bladeCount = window.innerWidth <= 600 ? 75 : 135;

    for (let i = 0; i < bladeCount; i++) {
        const blade = document.createElement("div");
        const isSmallPlant = i % 9 === 0;

        blade.className = isSmallPlant ? "garden-tuft" : "grass-blade";
        blade.style.left = `${Math.random() * 100}%`;

        if (isSmallPlant) {
            const tuftHeight = 24 + Math.random() * 22;
            blade.style.height = `${tuftHeight}px`;
        } else {
            const bladeHeight = 18 + Math.random() * 38;
            const tilt = -12 + Math.random() * 24;
            const swayDuration = 4.5 + Math.random() * 3.5;
            const swayDelay = Math.random() * 3;

            blade.style.height = `${bladeHeight}px`;
            blade.style.setProperty("--blade-tilt", `${tilt}deg`);
            blade.style.setProperty("--sway-duration", `${swayDuration.toFixed(1)}s`);
            blade.style.setProperty("--sway-delay", `${swayDelay.toFixed(1)}s`);
        }

        grassField.appendChild(blade);
    }
}


// CREATE FLOATING FIREFLIES
function createFireflies() {
    if (!firefliesContainer) return;
    firefliesContainer.innerHTML = "";

    const fireflyCount = window.innerWidth <= 600 ? 6 : 11;

    for (let i = 0; i < fireflyCount; i++) {
        const firefly = document.createElement("span");
        firefly.className = "firefly";

        const driftX = (-30 + Math.random() * 60).toFixed(0);
        const driftY = (-28 + Math.random() * 44).toFixed(0);
        const driftDuration = (11 + Math.random() * 9).toFixed(1);
        const glowDuration = (3.5 + Math.random() * 3.5).toFixed(1);

        firefly.style.left = `${8 + Math.random() * 84}%`;
        firefly.style.top = `${22 + Math.random() * 62}%`;
        firefly.style.setProperty("--drift-x", `${driftX}px`);
        firefly.style.setProperty("--drift-y", `${driftY}px`);
        firefly.style.setProperty("--drift-duration", `${driftDuration}s`);
        firefly.style.setProperty("--glow-duration", `${glowDuration}s`);
        firefly.style.setProperty("--drift-delay", `${(Math.random() * 5).toFixed(1)}s`);
        firefly.style.setProperty("--glow-delay", `${(Math.random() * 4).toFixed(1)}s`);

        firefliesContainer.appendChild(firefly);
    }
}


// CLICK OR TAP TO BLOOM A NEW FLOWER WHERE YOU CLICK
if (garden) {
    garden.addEventListener("click", (event) => {
        const rect = garden.getBoundingClientRect();
        const xPercent = ((event.clientX - rect.left) / rect.width) * 100;
        const clickHeight = Math.max(85, Math.min(430, rect.bottom - event.clientY - 22));
        const type = flowerTypes[Math.floor(Math.random() * flowerTypes.length)];

        createFlower(xPercent, type, {
            isClickBloom: true,
            customHeight: clickHeight
        });
    });
}


// INITIALIZE THE FULL GARDEN
createStars();
createGardenFloor();
growGarden();
createFireflies();