import { useState, useEffect } from 'react';

export default function CardComponent({ cardsPerLayer }) {
  const [layers, setLayers] = useState(5);

  useEffect(() => {
    const getDynamicLayers = () => {
      const width = window.innerWidth;

      if (width < 576) return 1;
      if (width < 768) return 2;
      if (width < 992) return 3;
      if (width < 1200) return 4;
      return 5;
    };

    setLayers(getDynamicLayers());

    const handleResize = () => {
      setLayers(getDynamicLayers());
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const getCardPositions = (layer, totalCards) => {
    const radius = 400 + layer * 150;
    const angleStep = 360 / totalCards;
    const positions = [];

    for (let i = 0; i < totalCards; i++) {
      const positionAngle = angleStep * i;
      const tiltAngle = -positionAngle;
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

  return (
    <div className="cardi-container">
      {/* Logo */}
      <div className="cardi-layer">
        <img src="/images/koreci_applogo.png" alt="Logo" />
      </div>

      {Array.from({ length: layers }).map((_, layerIndex) => {
        const totalCards = cardsPerLayer[layerIndex];
        const positions = getCardPositions(layerIndex, totalCards);
        const diameter = 300 + layerIndex * 260;
        const zIndexValue = layers - layerIndex;
        return (
          <div
            key={layerIndex}
            className="cardi-layer"
            style={{
              '--diameter': `${diameter}px`,
              '--layer': layerIndex,
              '--z-index': zIndexValue,
            }}
          >
            {positions.map((pos, cardIndex) => (
              <div
                key={cardIndex}
                className="cardi-wrapper"
                style={{
                  '--position-angle': `${pos.positionAngle}deg`,
                  '--radius': `${pos.radius}px`,
                }}
              >
                <div
                  className="cardi"
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
  );
}