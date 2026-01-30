'use client';

import React, { useEffect, useState } from 'react';

const watermarkImages = [
  'https://picsum.photos/seed/jallikattu/1920/1080',
  'https://picsum.photos/seed/silambam/1920/1080',
  'https://images.unsplash.com/photo-1720052473937-858c68dd0783?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHx0ZW1wbGUlMjBhcmNoaXRlY3R1cmV8ZW58MHx8fHwxNzY5NjI3MTcwfDA&ixlib=rb-4.1.0&q=80&w=1080',
  'https://picsum.photos/seed/tamil-culture/1920/1080',
];

export function DynamicWatermark() {
  const [bgImage, setBgImage] = useState('');

  useEffect(() => {
    const randomImage = watermarkImages[Math.floor(Math.random() * watermarkImages.length)];
    setBgImage(randomImage);
  }, []);

  if (!bgImage) return null;

  const style = `
    body::before {
      content: "";
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-image: url(${bgImage});
      background-size: cover;
      background-position: center;
      opacity: 0.05;
      z-index: -1;
      pointer-events: none;
    }
    .dark body::before {
      opacity: 0.03;
      filter: invert(1) brightness(0.8);
    }
  `;

  return <style>{style}</style>;
}
