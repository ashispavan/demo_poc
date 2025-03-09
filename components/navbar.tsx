"use client"
import Link from "next/link"
import { Search, ShoppingCart, User, ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const internetItems = [
  { title: "High Speed Internet", href: "#" },
  { title: "Internet Deals", href: "#" },
  { title: "Internet Speed Test", href: "#" },
]

const mobileItems = [
  { title: "Mobile Plans", href: "#" },
  { title: "Mobile Phones", href: "#" },
  { title: "Mobile Coverage", href: "#" },
]

const tvItems = [
  { title: "TV Packages", href: "#" },
  { title: "Stream TV", href: "#" },
  { title: "Channel Lineup", href: "#" },
]

const supportItems = [
  { title: "Help Center", href: "#" },
  { title: "Contact Support", href: "#" },
  { title: "Schedule Service", href: "#" },
]

const offerItems = [
  { title: "Best Mobile Plans", href: "#" },
  { title: "Best Smartphone Deals", href: "#" },
  { title: "Shop for Combo Plans", href: "#" },
  { title: "Shop All Devices", href: "#" },
  { title: "Student Offers", href: "#" },
]

export function Navbar() {
  return (
    <header className="w-full bg-white left-0 z-50">
      {/* Top Bar */}
      <div className="border-b bg-[#f2f6f7]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2">
          <div className="flex items-center space-x-4 text-sm">
            <Link href="#" className="hover:underline">
              Residential
            </Link>
            <span>|</span>
            <Link href="#" className="hover:underline">
              Cox Business
            </Link>
            <span>|</span>
            <Link href="#" className="hover:underline">
              Español
            </Link>
          </div>
          <div className="flex items-center space-x-4 text-sm">
            <Link href="#" className="hover:underline">
              Contact Us
            </Link>
            <span>|</span>
            <button className="flex items-center hover:underline">
              <User className="mr-1 h-4 w-4" />
              Select a Location
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="border-b">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-blue-500">
            <img className="cox-logo" src="https://www.cox.com/content/dam/cox/common/icons/ui_components/cox_logo.png" aria-label="Cox Residential Logo" alt="Cox Residential Logo" />
          </Link>

          {/* Navigation Menu */}
          <div className="flex items-center space-x-6">
            <NavItem title="Offers" items={offerItems} />
            <NavItem title="Internet" items={internetItems} />
            <NavItem title="Mobile" items={mobileItems} />
            <NavItem title="TV & Home" items={tvItems} />
            <NavItem title="Support" items={supportItems} />
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-6">
            <button aria-label="Search" className="hover:text-blue-500">
              <Search className="h-6 w-6" />
            </button>
            <button aria-label="Shopping cart" className="hover:text-blue-500">
              <ShoppingCart className="h-6 w-6" />
            </button>
            <button aria-label="User account" className="hover:text-blue-500">
              <User className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
      <div className="bottom-gradient"></div>
    </header>
  )
}

interface NavItemProps {
  title: string
  items: { title: string; href: string }[]
}

function NavItem({ title, items }: NavItemProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center text-base font-medium outline-none">
        {title} <ChevronDown className="ml-1 h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        {items.map((item) => (
          <DropdownMenuItem className="outline-none" key={item.title} asChild>
            <Link href={item.href} style={{ textDecoration: "none" }} className="block outline-none w-full cursor-pointer py-2 hover:bg-gray-100 no-underline">
              {item.title}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

