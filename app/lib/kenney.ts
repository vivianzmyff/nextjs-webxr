// Kenney City Kit Suburban - All GLB model URLs
// These are the 3D models available for building our city scene

export const KENNEY_URLS = [
  // Building types (houses and structures)
  '/kenney_city-kit-suburban_20/models/GLB format/building-type-a.glb',
  '/kenney_city-kit-suburban_20/models/GLB format/building-type-b.glb',
  '/kenney_city-kit-suburban_20/models/GLB format/building-type-c.glb',
  '/kenney_city-kit-suburban_20/models/GLB format/building-type-d.glb',
  '/kenney_city-kit-suburban_20/models/GLB format/building-type-e.glb',
  '/kenney_city-kit-suburban_20/models/GLB format/building-type-f.glb',
  '/kenney_city-kit-suburban_20/models/GLB format/building-type-g.glb',
  '/kenney_city-kit-suburban_20/models/GLB format/building-type-h.glb',
  '/kenney_city-kit-suburban_20/models/GLB format/building-type-i.glb',
  '/kenney_city-kit-suburban_20/models/GLB format/building-type-j.glb',
  '/kenney_city-kit-suburban_20/models/GLB format/building-type-k.glb',
  '/kenney_city-kit-suburban_20/models/GLB format/building-type-l.glb',
  '/kenney_city-kit-suburban_20/models/GLB format/building-type-m.glb',
  '/kenney_city-kit-suburban_20/models/GLB format/building-type-n.glb',
  '/kenney_city-kit-suburban_20/models/GLB format/building-type-o.glb',
  '/kenney_city-kit-suburban_20/models/GLB format/building-type-p.glb',
  '/kenney_city-kit-suburban_20/models/GLB format/building-type-q.glb',
  '/kenney_city-kit-suburban_20/models/GLB format/building-type-r.glb',
  '/kenney_city-kit-suburban_20/models/GLB format/building-type-s.glb',
  '/kenney_city-kit-suburban_20/models/GLB format/building-type-t.glb',
  '/kenney_city-kit-suburban_20/models/GLB format/building-type-u.glb',
  
  // Driveways and paths
  '/kenney_city-kit-suburban_20/models/GLB format/driveway-long.glb',
  '/kenney_city-kit-suburban_20/models/GLB format/driveway-short.glb',
  '/kenney_city-kit-suburban_20/models/GLB format/path-long.glb',
  '/kenney_city-kit-suburban_20/models/GLB format/path-short.glb',
  '/kenney_city-kit-suburban_20/models/GLB format/path-stones-long.glb',
  '/kenney_city-kit-suburban_20/models/GLB format/path-stones-messy.glb',
  '/kenney_city-kit-suburban_20/models/GLB format/path-stones-short.glb',
  
  // Fences and barriers
  '/kenney_city-kit-suburban_20/models/GLB format/fence-1x2.glb',
  '/kenney_city-kit-suburban_20/models/GLB format/fence-1x3.glb',
  '/kenney_city-kit-suburban_20/models/GLB format/fence-1x4.glb',
  '/kenney_city-kit-suburban_20/models/GLB format/fence-2x2.glb',
  '/kenney_city-kit-suburban_20/models/GLB format/fence-2x3.glb',
  '/kenney_city-kit-suburban_20/models/GLB format/fence-3x2.glb',
  '/kenney_city-kit-suburban_20/models/GLB format/fence-3x3.glb',
  '/kenney_city-kit-suburban_20/models/GLB format/fence-low.glb',
  '/kenney_city-kit-suburban_20/models/GLB format/fence.glb',
  
  // Decorative elements
  '/kenney_city-kit-suburban_20/models/GLB format/planter.glb',
  '/kenney_city-kit-suburban_20/models/GLB format/tree-large.glb',
  '/kenney_city-kit-suburban_20/models/GLB format/tree-small.glb',
];

// Filter for just the building/house models
export const KENNEY_HOUSES = KENNEY_URLS.filter(u => u.includes('building-type'));

// Filter for trees only
export const KENNEY_TREES = KENNEY_URLS.filter(u => u.includes('tree'));

// Filter for fences only
export const KENNEY_FENCES = KENNEY_URLS.filter(u => u.includes('fence'));

// Filter for paths and driveways
export const KENNEY_PATHS = KENNEY_URLS.filter(u => u.includes('path') || u.includes('driveway'));

// Filter for decorative elements (planters, etc.)
export const KENNEY_DECOR = KENNEY_URLS.filter(u => u.includes('planter'));
