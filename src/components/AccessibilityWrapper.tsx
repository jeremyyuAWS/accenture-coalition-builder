import React, { useEffect, useRef } from 'react';

interface AccessibilityWrapperProps {
  children: React.ReactNode;
  label?: string;
  role?: string;
  onKeyDown?: (event: React.KeyboardEvent) => void;
}

export function AccessibilityWrapper({ 
  children, 
  label, 
  role,
  onKeyDown 
}: AccessibilityWrapperProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    // Add keyboard navigation support
    const handleKeyDown = (event: KeyboardEvent) => {
      const focusableElements = wrapper.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      const focusableArray = Array.from(focusableElements) as HTMLElement[];
      const currentIndex = focusableArray.indexOf(document.activeElement as HTMLElement);

      switch (event.key) {
        case 'ArrowDown':
        case 'Tab':
          if (!event.shiftKey) {
            event.preventDefault();
            const nextIndex = (currentIndex + 1) % focusableArray.length;
            focusableArray[nextIndex]?.focus();
          }
          break;
        case 'ArrowUp':
          if (event.shiftKey && event.key === 'Tab') {
            event.preventDefault();
            const prevIndex = currentIndex === 0 ? focusableArray.length - 1 : currentIndex - 1;
            focusableArray[prevIndex]?.focus();
          }
          break;
        case 'Home':
          event.preventDefault();
          focusableArray[0]?.focus();
          break;
        case 'End':
          event.preventDefault();
          focusableArray[focusableArray.length - 1]?.focus();
          break;
      }
      
      onKeyDown?.(event as any);
    };

    wrapper.addEventListener('keydown', handleKeyDown);
    return () => wrapper.removeEventListener('keydown', handleKeyDown);
  }, [onKeyDown]);

  return (
    <div
      ref={wrapperRef}
      aria-label={label}
      role={role}
      className="focus-within:outline-none"
    >
      {children}
    </div>
  );
}

// Skip to Content Link
export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-black text-white px-4 py-2 rounded-md z-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      Skip to main content
    </a>
  );
}

// Screen Reader Only Text
export function ScreenReaderOnly({ children }: { children: React.ReactNode }) {
  return <span className="sr-only">{children}</span>;
}

// Focus Trap for Modals
export function FocusTrap({ children, active }: { children: React.ReactNode; active: boolean }) {
  const trapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active) return;

    const trap = trapRef.current;
    if (!trap) return;

    const focusableElements = trap.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleTabKey);
    firstElement?.focus();

    return () => {
      document.removeEventListener('keydown', handleTabKey);
    };
  }, [active]);

  return (
    <div ref={trapRef}>
      {children}
    </div>
  );
}