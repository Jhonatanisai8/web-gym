import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const images = [
  // Hero Carousel Images (1400w)
  {
    url: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=85&w=1600&auto=format&fit=crop',
    name: 'hero-1.webp',
    width: 1400,
    quality: 82,
  },
  {
    url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=85&w=1600&auto=format&fit=crop',
    name: 'hero-2.webp',
    width: 1400,
    quality: 82,
  },
  {
    url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=85&w=1600&auto=format&fit=crop',
    name: 'hero-3.webp',
    width: 1400,
    quality: 82,
  },
  {
    url: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=85&w=1600&auto=format&fit=crop',
    name: 'hero-4.webp',
    width: 1400,
    quality: 82,
  },
  {
    url: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=85&w=1600&auto=format&fit=crop',
    name: 'hero-5.webp',
    width: 1400,
    quality: 82,
  },

  // Bento Grid Zones
  {
    url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=85&w=1200&auto=format&fit=crop',
    name: 'zona-peso-libre.webp',
    width: 900,
    quality: 82,
  },
  {
    url: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=85&w=1000&auto=format&fit=crop',
    name: 'zona-funcional.webp',
    width: 800,
    quality: 82,
  },
  {
    url: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=85&w=1000&auto=format&fit=crop',
    name: 'zona-cycling.webp',
    width: 800,
    quality: 82,
  },
  {
    url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=85&w=1200&auto=format&fit=crop',
    name: 'zona-wellness.webp',
    width: 900,
    quality: 82,
  },

  // Locations / Sedes
  {
    url: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?q=85&w=1000&auto=format&fit=crop',
    name: 'sede-san-isidro.webp',
    width: 800,
    quality: 82,
  },
  {
    url: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=85&w=1000&auto=format&fit=crop',
    name: 'sede-miraflores.webp',
    width: 800,
    quality: 82,
  },

  // Services Sticky Scroll (1200w)
  {
    url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=85&w=1400&auto=format&fit=crop',
    name: 'servicio-maquinas.webp',
    width: 1200,
    quality: 82,
  },
  {
    url: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=85&w=1400&auto=format&fit=crop',
    name: 'servicio-clases.webp',
    width: 1200,
    quality: 82,
  },
  {
    url: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?q=85&w=1400&auto=format&fit=crop',
    name: 'servicio-suplementos.webp',
    width: 1200,
    quality: 82,
  },
  {
    url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=85&w=1400&auto=format&fit=crop',
    name: 'servicio-psicologia.webp',
    width: 1200,
    quality: 82,
  },
  {
    url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=85&w=1400&auto=format&fit=crop',
    name: 'servicio-entrenadores.webp',
    width: 1200,
    quality: 82,
  },
  {
    url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=85&w=1400&auto=format&fit=crop',
    name: 'servicio-sauna.webp',
    width: 1200,
    quality: 82,
  },

  // Avatars (Square 240x240 for high-DPI screens)
  {
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=85&w=400&auto=format&fit=crop',
    name: 'avatar-carlos.webp',
    width: 240,
    height: 240,
    quality: 85,
  },
  {
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=85&w=400&auto=format&fit=crop',
    name: 'avatar-valeria.webp',
    width: 240,
    height: 240,
    quality: 85,
  },
  {
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=85&w=400&auto=format&fit=crop',
    name: 'avatar-diego.webp',
    width: 240,
    height: 240,
    quality: 85,
  },

  // OpenGraph Image (1200w)
  {
    url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=85&w=1400&auto=format&fit=crop',
    name: 'og-image.webp',
    width: 1200,
    quality: 80,
  },
];

const targetDir = path.resolve(process.cwd(), 'public/images');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

console.log(`Iniciando optimización de ${images.length} imágenes a formato WebP...`);

for (const img of images) {
  const destPath = path.join(targetDir, img.name);
  try {
    console.log(`Descargando y optimizando: ${img.name}...`);
    const res = await fetch(img.url);
    if (!res.ok) {
      throw new Error(`Error en fetch HTTP ${res.status}: ${res.statusText}`);
    }
    const buffer = Buffer.from(await res.arrayBuffer());

    let pipeline = sharp(buffer);
    if (img.width && img.height) {
      pipeline = pipeline.resize(img.width, img.height, { fit: 'cover', position: 'center' });
    } else if (img.width) {
      pipeline = pipeline.resize(img.width, null, { withoutEnlargement: true });
    }

    await pipeline
      .webp({ quality: img.quality || 80, effort: 6 })
      .toFile(destPath);

    const stats = fs.statSync(destPath);
    console.log(`✓ Guardado ${img.name} (${(stats.size / 1024).toFixed(1)} KB)`);
  } catch (err) {
    console.error(`✗ Error procesando ${img.name}:`, err.message);
  }
}

console.log('¡Todas las imágenes han sido optimizadas exitosamente a WebP!');
