import type { Phone } from "@/types/phone"

export const phones: Phone[] = [
  {
    id: "samsung-s25-ultra",
    brand: "Samsung",
    name: "Galaxy S25 Ultra",
    price: 1299.99,
    image: "/phones/s25_ultra.webp",
    model: "samsung-s25-ultra",
    specs: {
      display: {
        size: "6.8 inch QHD+",
        type: "Dynamic AMOLED",
        refreshRate: "120Hz Display",
      },
      processor: {
        name: "Snapdragon 8 Gen 3",
        type: "Processor",
      },
      camera: {
        main: "200MP + 12MP + 50MP + 10MP",
        mainDesc: "Primary + UW + Tele + Depth",
        selfie: "12MP",
        selfieDesc: "Selfie Camera",
      },
      battery: {
        capacity: "5000mAh",
        charging: "45W charging",
      },
    },
    features: {
      battery: 5000,
      memory: 12,
      storage: 512,
      waterproof: true,
    },
  },
  {
    id: "samsung-s25-plus",
    brand: "Samsung",
    name: "Galaxy S25+",
    price: 999.99,
    image: "/phones/s25_plus.webp",
    model: "samsung-s25-plus",
    specs: {
      display: {
        size: "6.6 inch FHD+",
        type: "Dynamic AMOLED",
        refreshRate: "120Hz Display",
      },
      processor: {
        name: "Snapdragon 8 Gen 3",
        type: "Processor",
      },
      camera: {
        main: "50MP + 12MP + 10MP",
        mainDesc: "Primary + UW + Tele",
        selfie: "12MP",
        selfieDesc: "Selfie Camera",
      },
      battery: {
        capacity: "4800mAh",
        charging: "45W charging",
      },
    },
    features: {
      battery: 4500,
      memory: 8,
      storage: 256,
      waterproof: true,
    },
  },
  {
    id: "samsung-s25",
    brand: "Samsung",
    name: "Galaxy S25",
    price: 799.99,
    image: "/phones/s25.webp",
    model: "samsung-s25",
    specs: {
      display: {
        size: "6.2 inch FHD+",
        type: "Dynamic AMOLED",
        refreshRate: "120Hz Display",
      },
      processor: {
        name: "Snapdragon 8 Gen 3",
        type: "Processor",
      },
      camera: {
        main: "50MP + 12MP + 10MP",
        mainDesc: "Primary + UW + Tele",
        selfie: "10MP",
        selfieDesc: "Selfie Camera",
      },
      battery: {
        capacity: "4000mAh",
        charging: "25W charging",
      },
    },
    features: {
      battery: 4000,
      memory: 8,
      storage: 128,
      waterproof: true,
    },
  },
  {
    id: "iphone-16-pro",
    brand: "Apple",
    name: "iPhone 16 Pro",
    price: 1099.99,
    image: "/phones/iphone16_pro.png",
    model: "iphone-16-pro",
    specs: {
      display: {
        size: "6.1 inch Super Retina XDR",
        type: "OLED",
        refreshRate: "120Hz ProMotion",
      },
      processor: {
        name: "A17 Bionic",
        type: "Processor",
      },
      camera: {
        main: "48MP + 12MP + 12MP",
        mainDesc: "Wide + Ultra Wide + Telephoto",
        selfie: "12MP",
        selfieDesc: "TrueDepth Camera",
      },
      battery: {
        capacity: "3279mAh",
        charging: "20W fast charging",
      },
    },
    features: {
      battery: 3279,
      memory: 8,
      storage: 256,
      waterproof: true,
    },
  },
  {
    id: "google-pixel-9-pro-xl",
    brand: "Google",
    name: "Pixel 9 Pro XL",
    price: 1099.0,
    image: "/phones/pixel9_pro_xl.webp",
    model: "google-pixel-9-pro-xl",
    specs: {
      display: {
        size: "6.7 inch QHD+",
        type: "LTPO OLED",
        refreshRate: "120Hz Display",
      },
      processor: {
        name: "Tensor G4",
        type: "Processor",
      },
      camera: {
        main: "50MP + 48MP + 48MP",
        mainDesc: "Primary + UW + Tele",
        selfie: "11MP",
        selfieDesc: "Selfie Camera",
      },
      battery: {
        capacity: "5000mAh",
        charging: "30W charging",
      },
    },
    features: {
      battery: 4800,
      memory: 12,
      storage: 256,
      waterproof: true,
    },
  },
  {
    id: "google-pixel-9-pro",
    brand: "Google",
    name: "Pixel 9 Pro",
    price: 999.0,
    image: "/phones/pixel9_pro.webp",
    model: "google-pixel-9-pro",
    specs: {
      display: {
        size: "6.3 inch QHD+",
        type: "LTPO OLED",
        refreshRate: "120Hz Display",
      },
      processor: {
        name: "Tensor G4",
        type: "Processor",
      },
      camera: {
        main: "50MP + 48MP + 48MP",
        mainDesc: "Primary + UW + Tele",
        selfie: "11MP",
        selfieDesc: "Selfie Camera",
      },
      battery: {
        capacity: "4500mAh",
        charging: "30W charging",
      },
    },
    features: {
      battery: 4500,
      memory: 12,
      storage: 256,
      waterproof: true,
    },
  },
]
