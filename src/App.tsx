/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { RoasterShowcase } from './components/RoasterShowcase';
import { FlavorWheelMatcher } from './components/FlavorWheelMatcher';
import { CafeMenu } from './components/CafeMenu';
import { DigitalStampCard } from './components/DigitalStampCard';
import { CoffeeSavingsCalculator } from './components/CoffeeSavingsCalculator';
import { StirLates } from './components/StirLates';
import { GalleryFeed } from './components/GalleryFeed';
import { BrewCalculator } from './components/BrewCalculator';
import { VisitSection } from './components/VisitSection';
import { Footer } from './components/Footer';
import { BeanOrderModal } from './components/BeanOrderModal';
import { RSVPModal } from './components/RSVPModal';
import { BaristaAIAssistant } from './components/BaristaAIAssistant';
import { Toast } from './components/Toast';
import { CoffeeBean, EventItem } from './types';
import { FEATURED_BEANS } from './data/coffeeData';

export default function App() {
  const [selectedBean, setSelectedBean] = useState<CoffeeBean | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [isRSVPModalOpen, setIsRSVPModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [addressCopied, setAddressCopied] = useState(false);
  const [isOpenNow, setIsOpenNow] = useState(false);

  // Calculate live opening status in London time
  useEffect(() => {
    const calculateOpenStatus = () => {
      try {
        const now = new Date();
        const londonFormatter = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Europe/London',
          weekday: 'short',
          hour: 'numeric',
          minute: 'numeric',
          hourCycle: 'h23',
        });
        
        const parts = londonFormatter.formatToParts(now);
        const weekday = parts.find((p) => p.type === 'weekday')?.value || '';
        const hour = parseInt(parts.find((p) => p.type === 'hour')?.value || '0', 10);
        const minute = parseInt(parts.find((p) => p.type === 'minute')?.value || '0', 10);
        const timeInMins = hour * 60 + minute;

        const isWeekend = weekday === 'Sat' || weekday === 'Sun';
        const isFriday = weekday === 'Fri';

        if (isWeekend) {
          // Sat - Sun: 09:00 (540m) to 15:00 (900m)
          setIsOpenNow(timeInMins >= 540 && timeInMins < 900);
        } else {
          // Mon - Fri: 07:30 (450m) to 15:00 (900m)
          const isStandardDay = timeInMins >= 450 && timeInMins < 900;
          // Friday Stir Lates: 17:00 (1020m) to 22:00 (1320m)
          const isLates = isFriday && timeInMins >= 1020 && timeInMins < 1320;
          setIsOpenNow(isStandardDay || isLates);
        }
      } catch (err) {
        setIsOpenNow(true);
      }
    };

    calculateOpenStatus();
    const interval = setInterval(calculateOpenStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText('111 Brixton Hill, London, SW2 1AA');
    setAddressCopied(true);
    setToastMessage('Address copied to clipboard: 111 Brixton Hill, London SW2 1AA');
    setTimeout(() => setAddressCopied(false), 2500);
  };

  const handleOpenOrderModalForBean = (bean: CoffeeBean) => {
    setSelectedBean(bean);
    setIsOrderModalOpen(true);
  };

  const handleGeneralOrderClick = () => {
    setSelectedBean(FEATURED_BEANS[0]);
    setIsOrderModalOpen(true);
  };

  const handleRSVPClick = (event: EventItem) => {
    setSelectedEvent(event);
    setIsRSVPModalOpen(true);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 selection:bg-amber-100 selection:text-amber-900 flex flex-col font-sans">
      {/* Sticky Glass Navigation Bar */}
      <Navbar
        onOpenOrderModal={handleGeneralOrderClick}
        isOpenNow={isOpenNow}
      />

      {/* Main Page Layout */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onExploreRoasters={() => scrollToSection('roasters')}
          onViewMenu={() => scrollToSection('menu')}
          onCopyAddress={handleCopyAddress}
          addressCopied={addressCopied}
          isOpenNow={isOpenNow}
        />

        {/* Roasters & Shelf Showcase */}
        <RoasterShowcase onSelectBean={handleOpenOrderModalForBean} />

        {/* Sensory Flavor Wheel & Bean Matcher */}
        <FlavorWheelMatcher onSelectBean={handleOpenOrderModalForBean} />

        {/* Daily Café Menu */}
        <CafeMenu />

        {/* Digital Coffee Stamp Card Loyalty Section */}
        <DigitalStampCard onShowToast={(msg) => setToastMessage(msg)} />

        {/* London Coffee Habit Economics & Subscription Configurator */}
        <CoffeeSavingsCalculator onSubscribe={(msg) => setToastMessage(msg)} />

        {/* Stir Lates & Events */}
        <StirLates onRSVP={handleRSVPClick} />

        {/* Community Grid: Follow Us For Updates */}
        <GalleryFeed />

        {/* Interactive Brew Ratio Calculator */}
        <BrewCalculator />

        {/* Visit, Hours, Transit, FAQs & Contact */}
        <VisitSection
          onCopyAddress={handleCopyAddress}
          addressCopied={addressCopied}
          isOpenNow={isOpenNow}
        />
      </main>

      {/* Modern Light Footer */}
      <Footer
        onCopyAddress={handleCopyAddress}
        addressCopied={addressCopied}
      />

      {/* Bean Reservation Modal */}
      <BeanOrderModal
        bean={selectedBean}
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        onSuccess={(msg) => setToastMessage(msg)}
      />

      {/* Community Event RSVP Modal */}
      <RSVPModal
        event={selectedEvent}
        isOpen={isRSVPModalOpen}
        onClose={() => setIsRSVPModalOpen(false)}
        onSuccess={(msg) => setToastMessage(msg)}
      />

      {/* Floating Barista AI Assistant / Bean Sommelier */}
      <BaristaAIAssistant onSelectBean={handleOpenOrderModalForBean} />

      {/* Floating Toast Feedback */}
      <Toast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />
    </div>
  );
}
