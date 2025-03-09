# 3D Phone Model Instructions

To use a 3D model for the phone viewer, you need to add a GLB/GLTF model file to your project.

## Steps to add a 3D phone model:

1. **Get a 3D phone model**:
   - Download a free phone model from sites like [Sketchfab](https://sketchfab.com/search?q=smartphone&type=models)
   - Create your own using Blender or other 3D modeling software
   - Purchase a model from a 3D marketplace like TurboSquid or CGTrader

2. **Prepare the model**:
   - Ensure the model is in GLB or GLTF format (preferred for web)
   - Optimize the model for web (reduce polygon count, texture sizes)
   - Make sure the model has proper materials that can be colored

3. **Add to your project**:
   - Create a folder at `public/models/` if it doesn't exist
   - Place your model file there and name it `phone.glb`

4. **Adjust the code if needed**:
   - You may need to adjust the scale, position, and rotation in the `PhoneModel` component
   - Update the material selection logic in the `useEffect` hook to target the correct parts of your model
   - If your model has a different structure, you might need to modify how colors are applied

## Example models you can use:

- [Free Smartphone on Sketchfab](https://sketchfab.com/3d-models/smartphone-b57b3cb3c9a94c3c9a0a3d0a93c8d649)
- [iPhone 13 Pro Max on Sketchfab](https://sketchfab.com/3d-models/iphone-13-pro-max-4328dea00e47497dbeac73c556121bc9)
- [Samsung Galaxy S21 on Sketchfab](https://sketchfab.com/3d-models/samsung-galaxy-s21-ultra-5g-4e7a4e73c2ce4238a387baf81fd3e3b8)

Remember to check the license of any model you use to ensure it allows commercial use if needed.

