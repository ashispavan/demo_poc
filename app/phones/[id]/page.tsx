import { ProductDetails } from "@/components/product-details"
import { phones } from "@/data/phones"
import { notFound } from "next/navigation"

export default function PhonePage({ params }: { params: { id: string } }) {
  const phone = phones.find((p) => p.id === params.id)

  if (!phone) {
    notFound()
  }

  return <ProductDetails phone={phone} />
}

