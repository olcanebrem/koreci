---
import { onMount } from 'astro';

// Varsayılan katman sayısı
let layers = 5;

// Sayfa yüklendiğinde çalışacak kod

const cardsPerLayer = [5, 8, 12, 16, 20]; // Örnek kart sayıları

const getCardPositions = (layer, totalCards) => {
  const radius = 400 + layer * 150; // Yarıçapı katmana göre artır
  const angleStep = 360 / totalCards; // Her kart için eşit açı adımı
  const positions = [];

  for (let i = 0; i < totalCards; i++) {
    const positionAngle = angleStep * i; // Kartın açısı
    const tiltAngle = -positionAngle; // Kartın eğim açısı
    positions.push({
      positionAngle,
      tiltAngle,
      radius,
    });
  }
  return positions;
};

const getImagePath = (index) => {
  const imageNum = (index % 9) + 1;
  return `/images/users/user-${imageNum}.png`;
};
---
<script>
window.onload = () => {
  console.log('Page loaded!');

  const getDynamicLayers = () => {
    const width = window.innerWidth;

    if (width < 576) return 1;
    if (width < 768) return 2;
    if (width < 992) return 3;
    if (width < 1200) return 4;
    return 5;
  };

  let layers = getDynamicLayers();
  console.log(layers); // Katman sayısını kontrol et

  // Pencere boyutu değiştiğinde katman sayısını güncelle
  window.addEventListener('resize', () => {
    layers = getDynamicLayers();
    console.log(layers); // Güncellenen katman sayısını kontrol et
  });
};
</script>

<div class="cardi-container">
  <!-- Logo -->
  <div class="cardi-layer">
    <img src="/images/koreci_applogo.png" alt="Logo" />
  </div>

  {Array.from({ length: layers }).map((_, layerIndex) => {
    const totalCards = cardsPerLayer[layerIndex];
    const positions = getCardPositions(layerIndex, totalCards);
    const diameter = 300 + layerIndex * 260;
    const zIndexValue = layers - layerIndex;
    return (
      <div
        class="cardi-layer"
        style={{
          '--diameter': `${diameter}px`,
          '--layer': layerIndex,
          '--z-index': zIndexValue,
        }}
      >
        {positions.map((pos, cardIndex) => (
          <div
            class="cardi-wrapper"
            style={{
              '--position-angle': `${pos.positionAngle}deg`,
              '--radius': `${pos.radius}px`,
            }}
          >
            <div
              class="cardi"
              style={{
                '--tilt-angle': `${pos.tiltAngle}deg`,
                '--layer': layerIndex,
                '--z-index': zIndexValue,
              }}
            >
              <img src={getImagePath(cardIndex)} alt={`User ${cardIndex}`} />
            </div>
          </div>
        ))}
      </div>
    );
  })}
</div>

<style lang="scss">
.cardi-container {
  position: relative;
  width: 100vw;
  height: 500px;
  justify-content: center;
  align-items: center;
}

.cardi-layer {
  position: absolute;
  width: var(--diameter);
  height: var(--diameter);
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 2px dashed rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  animation: rotateLayer calc(50s - (var(--layer) * 3s)) infinite linear;
  z-index: var(--z-index);
}

.cardi-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform-origin: center;
  z-index: var(--z-index);
  transform: 
    translate(-50%, -50%)
    rotate(var(--position-angle))
    translateX(var(--radius));
}

.cardi {
  position: relative;
  width: 225px;
  height: 300px;
  transform-origin: center;
  z-index: var(--z-index);
  transform: rotate(var(--tilt-angle));
  animation: rotateCardi calc(50s - (var(--layer) * 1s)) infinite linear reverse;
  transition: transform 0.3s ease;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }

  &:hover {
    transform: rotate(var(--tilt-angle)) scale(1.2);
    z-index: 10;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.785);
  }

  @media (max-width: 1200px) {
    width: 200px;
    height: 250px;
  }

  @media (max-width: 992px) {
    width: 180px;
    height: 220px;
  }

  @media (max-width: 768px) {
    width: 150px;
    height: 200px;
  }

  @media (max-width: 576px) {
    width: 120px;
    height: 160px;
  }
}

@keyframes rotateLayer {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

@keyframes rotateCardi {
  from {
    transform: rotate(var(--tilt-angle));
  }
  to {
    transform: rotate(calc(var(--tilt-angle) + 360deg));
  }
}
</style>