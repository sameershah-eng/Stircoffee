import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data/coffeeData';
import { GalleryItem } from '../types';
import { Heart, Instagram, X, ArrowUpRight, Maximize2 } from 'lucide-react';

export const GalleryFeed: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [likesMap, setLikesMap] = useState<Record<string, number>>(
    GALLERY_ITEMS.reduce((acc, item) => ({ ...acc, [item.id]: item.likes }), {})
  );
  const [likedByUser, setLikedByUser] = useState<Record<string, boolean>>({});
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'coffee' | 'food' | 'lates' | 'space'>('all');

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    if (categoryFilter === 'all') return true;
    return item.category === categoryFilter;
  });

  const handleToggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const isLiked = likedByUser[id];
    setLikedByUser((prev) => ({ ...prev, [id]: !isLiked }));
    setLikesMap((prev) => ({
      ...prev,
      [id]: isLiked ? prev[id] - 1 : prev[id] + 1,
    }));
  };

  return (
    <section id="community" className="py-16 lg:py-24 bg-stone-50 border-b border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header mirroring the screenshot copy: FOLLOW US FOR UPDATES */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-bold tracking-[0.25em] text-stone-400 uppercase mb-2">
              COMMUNITY & SOCIAL
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 font-display tracking-tight uppercase">
              FOLLOW US FOR UPDATES
            </h2>
            <div className="mt-2 flex items-center gap-2 text-xs text-stone-500">
              <Instagram className="w-3.5 h-3.5 text-pink-600" />
              <a
                href="https://instagram.com/stir_coffee"
                target="_blank"
                rel="noreferrer"
                className="font-medium hover:text-stone-900 transition-colors underline decoration-stone-300 underline-offset-4"
              >
                @stir_coffee
              </a>
              <span aria-hidden="true">·</span>
              <span>111 Brixton Hill, London</span>
            </div>
          </div>

          {/* Interactive filter tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-200/60 rounded-xl">
            {(
              [
                { id: 'all', label: 'All Updates' },
                { id: 'coffee', label: 'Coffee' },
                { id: 'lates', label: 'Stir Lates' },
                { id: 'food', label: 'Bakes & Deli' },
                { id: 'space', label: 'Café & Shelves' },
              ] as const
            ).map((filter) => (
              <button
                key={filter.id}
                onClick={() => setCategoryFilter(filter.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  categoryFilter === filter.id
                    ? 'bg-white text-stone-900 shadow-2xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid: Modern high-fidelity masonry-style grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-5">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl bg-stone-200 border border-stone-200/80 shadow-2xs aspect-square"
            >
              <img
                src={item.image}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                loading="lazy"
              />

              {/* Hover overlay with glass details */}
              <div className="absolute inset-0 bg-stone-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-4 flex flex-col justify-between text-white">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-full">
                    {item.category}
                  </span>
                  <button
                    onClick={(e) => handleToggleLike(item.id, e)}
                    className="p-1.5 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 transition-colors"
                    title="Like post"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        likedByUser[item.id] ? 'fill-red-500 text-red-500' : 'text-white'
                      }`}
                    />
                  </button>
                </div>

                <div>
                  <h4 className="text-sm font-bold leading-snug line-clamp-1">
                    {item.title}
                  </h4>
                  <div className="flex items-center justify-between text-xs text-stone-300 mt-1">
                    <span>{likesMap[item.id]} likes</span>
                    <span>{item.date}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Instagram Callout Strip */}
        <div className="mt-10 p-6 bg-white rounded-2xl border border-stone-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 text-white flex items-center justify-center shadow-xs">
              <Instagram className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-stone-900">
                Join our Brixton Community
              </div>
              <div className="text-xs text-stone-500">
                Tag @stir_coffee in your cups, bakes, and Friday lates photos to be featured.
              </div>
            </div>
          </div>

          <a
            href="https://instagram.com/stir_coffee"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors whitespace-nowrap"
          >
            <span>Follow @stir_coffee</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Interactive Lightbox Modal */}
      {selectedItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm p-4 sm:p-6 flex items-center justify-center animate-in fade-in duration-200"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative bg-white rounded-2xl overflow-hidden max-w-2xl w-full border border-stone-200 shadow-2xl flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Close Button */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-stone-900/60 hover:bg-stone-900 text-white transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Image */}
            <div className="relative bg-stone-100 aspect-4/3 max-h-[50vh] overflow-hidden">
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-1">
                    {selectedItem.category} · {selectedItem.date}
                  </div>
                  <h3 className="text-xl font-bold text-stone-900 font-display">
                    {selectedItem.title}
                  </h3>
                </div>

                <button
                  onClick={(e) => handleToggleLike(selectedItem.id, e)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                    likedByUser[selectedItem.id]
                      ? 'bg-rose-50 border-rose-200 text-rose-600'
                      : 'bg-stone-100 border-stone-200 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  <Heart
                    className={`w-4 h-4 ${
                      likedByUser[selectedItem.id] ? 'fill-rose-500 text-rose-500' : ''
                    }`}
                  />
                  <span>{likesMap[selectedItem.id]} likes</span>
                </button>
              </div>

              <p className="text-sm text-stone-600 leading-relaxed">
                {selectedItem.caption}
              </p>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <span>Stir Coffee · 111 Brixton Hill, SW2 1AA</span>
                <a
                  href="https://instagram.com/stir_coffee"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-stone-800 font-medium hover:underline"
                >
                  <span>Open Instagram</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
