export interface Phone {
  id: string
  brand: string
  name: string
  price: number
  image: string
  model: string
  specs: {
    display: {
      size: string
      type: string
      refreshRate: string
    }
    processor: {
      name: string
      type: string
    }
    camera: {
      main: string
      mainDesc: string
      selfie: string
      selfieDesc: string
    }
    battery: {
      capacity: string
      charging: string
    }
  }
  features: {
    battery: number
    memory: number
    storage: number
    waterproof: boolean
  }
}

