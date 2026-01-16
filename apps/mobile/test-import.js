// Quick test to see if imports resolve
try {
  const shared = require('../../packages/shared/src/index.ts');
  console.log('✓ Shared package imports:', Object.keys(shared));
} catch (e) {
  console.error('✗ Failed to import shared package:', e.message);
}
