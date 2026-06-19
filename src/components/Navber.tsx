// "use client";

// import Link from "next/link";
// import { useState } from "react";
// import { useCart } from "@/hooks/useCart";
// import CartDrawer from "@/components/cart/CartDrawer";
// import { useCategories } from "@/hooks/queries/useCategories";

// export default function Navbar() {
//   const [cartOpen, setCartOpen] = useState(false);
//   const { totals } = useCart();
//   const { data: categories } = useCategories();

//   return (
//     <>
//       <header className="sticky top-0 z-30 bg-white border-b border-gray-100 shadow-sm">
//         <div className="container-custom">
//           <div className="flex items-center gap-4 h-16">
//             {/* Logo */}
//             <Link href="/" className="flex items-center gap-2 flex-shrink-0">
//               <span className="text-2xl">🛒</span>
//               <span className="font-bold text-text-primary text-lg">
//                 Grocer<span className="text-primary">Banga</span>
//               </span>
//             </Link>

//             {/* Search */}
//             <div className="flex-1 max-w-xl">
//               <div className="relative">
//                 <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary text-sm">
//                   🔍
//                 </span>
//                 <input
//                   type="text"
//                   placeholder="Search for fresh vegetables, milk, or everyday essentials..."
//                   className="w-full pl-9 pr-4 py-2 text-sm rounded-custom border border-gray-200 bg-bg-gray outline-none focus:border-primary transition-colors"
//                 />
//               </div>
//             </div>

//             {/* Cart button */}
//             <button
//               onClick={() => setCartOpen(true)}
//               className="flex items-center gap-2 btn-primary text-sm py-2 px-4 relative"
//             >
//               <span>🛒</span>
//               <span className="hidden sm:inline">Bag</span>
//               {totals.totalQty > 0 && (
//                 <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-secondary text-text-primary text-xs font-bold flex items-center justify-center">
//                   {totals.totalQty}
//                 </span>
//               )}
//             </button>
//           </div>

//           {/* Category nav strip */}
//           {categories && (
//             <nav className="flex items-center gap-1 overflow-x-auto pb-2 scrollbar-hide">
//               {categories
//                 .filter((c) => c.showInMenu)
//                 .sort((a, b) => a.order - b.order)
//                 .map((cat) => (
//                   <Link
//                     key={cat._id}
//                     href={`/category/${cat.slug}`}
//                     className="flex-shrink-0 text-sm px-3 py-1.5 rounded-full text-text-secondary hover:text-primary hover:bg-primary/10 transition-colors whitespace-nowrap capitalize"
//                   >
//                     {cat.name}
//                   </Link>
//                 ))}
//             </nav>
//           )}
//         </div>
//       </header>

//       <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
//     </>
//   );
// }
