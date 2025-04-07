import { useEffect, useRef } from 'react';
import { logEvent } from 'firebase/analytics';
import { analytics } from '../config/firebase';

export const useAnalytics = (pageName: string) => {
  const isVisible = useRef(true);

  useEffect(() => {
    // Log page view
    logEvent(analytics, 'page_view', {
      page_title: pageName,
      page_location: window.location.pathname,
      page_path: window.location.pathname
    });

    // Handle visibility change
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && !isVisible.current) {
        // Page became visible
        logEvent(analytics, 'page_visible', {
          page_title: pageName,
          page_location: window.location.pathname
        });
        isVisible.current = true;
      } else if (document.visibilityState === 'hidden' && isVisible.current) {
        // Page became hidden
        logEvent(analytics, 'page_hidden', {
          page_title: pageName,
          page_location: window.location.pathname
        });
        isVisible.current = false;
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [pageName]);
}; 