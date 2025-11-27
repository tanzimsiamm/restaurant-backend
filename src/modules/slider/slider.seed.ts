import Slider from './slider.model';

const sliderSeedData = [
  {
    title: 'BREAKFAST',
    subtitle: 'Start Your Day Right',
    description:
      'Breakfast provides essential nutrients to kick-start the day with fruits, cereals, dairy, and proteins that contribute to a balanced diet.',
    image:
      'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=800',
    thumbnailImage:
      'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=800',
    bgColor: '#8B0000',
    order: 1,
    isActive: true,
  },
  {
    title: 'BREAKFAST',
    subtitle: 'Fresh & Healthy',
    description:
      'Breakfast provides essential nutrients to kick-start the day with fruits, cereals, dairy, and proteins that contribute to a balanced diet.',
    image:
      'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=800',
    thumbnailImage:
      'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=800',
    bgColor: '#A52A2A',
    order: 2,
    isActive: true,
  },
  {
    title: 'BREAKFAST',
    subtitle: 'Delicious Morning',
    description:
      'Breakfast provides essential nutrients to kick-start the day with fruits, cereals, dairy, and proteins that contribute to a balanced diet.',
    image:
      'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800',
    thumbnailImage:
      'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800',
    bgColor: '#C71585',
    order: 3,
    isActive: true,
  },
  {
    title: 'BREAKFAST',
    subtitle: 'Perfect Start',
    description:
      'Breakfast provides essential nutrients to kick-start the day with fruits, cereals, dairy, and proteins that contribute to a balanced diet.',
    image:
      'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=800',
    thumbnailImage:
      'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=800',
    bgColor: '#B22222',
    order: 4,
    isActive: true,
  },
];

export const seedSliders = async () => {
  try {
    // Clear existing sliders
    await Slider.deleteMany({});
    console.log('🗑️  Cleared existing sliders');

    // Insert new sliders
    const result = await Slider.insertMany(sliderSeedData);
    console.log(`✅ Successfully seeded ${result.length} sliders`);

    return result;
  } catch (error) {
    console.error('❌ Error seeding sliders:', error);
    throw error;
  }
};