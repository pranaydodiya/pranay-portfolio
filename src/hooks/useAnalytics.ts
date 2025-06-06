
import { useEffect, useCallback } from 'react';

interface AnalyticsData {
  pageViews: number;
  sectionViews: { [key: string]: number };
  chatbotInteractions: number;
  chatbotQuestions: string[];
  dailyViews: { date: string; views: number }[];
  timeSpent: number;
  lastVisit: string;
  sessionStart: number;
}

export const useAnalytics = () => {
  const getAnalytics = (): AnalyticsData => {
    const saved = localStorage.getItem('portfolioAnalytics');
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      pageViews: 0,
      sectionViews: {},
      chatbotInteractions: 0,
      chatbotQuestions: [],
      dailyViews: [],
      timeSpent: 0,
      lastVisit: new Date().toISOString(),
      sessionStart: Date.now()
    };
  };

  const saveAnalytics = (data: AnalyticsData) => {
    localStorage.setItem('portfolioAnalytics', JSON.stringify(data));
  };

  const trackPageView = useCallback(() => {
    const analytics = getAnalytics();
    analytics.pageViews += 1;
    analytics.sessionStart = Date.now();
    
    // Update daily views
    const today = new Date().toISOString().split('T')[0];
    const todayData = analytics.dailyViews.find(d => d.date === today);
    if (todayData) {
      todayData.views += 1;
    } else {
      analytics.dailyViews.push({ date: today, views: 1 });
    }
    
    // Keep only last 30 days
    analytics.dailyViews = analytics.dailyViews.slice(-30);
    
    saveAnalytics(analytics);
  }, []);

  const trackSectionView = useCallback((section: string) => {
    const analytics = getAnalytics();
    analytics.sectionViews[section] = (analytics.sectionViews[section] || 0) + 1;
    saveAnalytics(analytics);
  }, []);

  const trackEvent = useCallback((eventName: string, data?: any) => {
    console.log('Event tracked:', eventName, data);
    // For now, just log the event. In a real app, you'd send this to your analytics service
  }, []);

  const trackChatbotInteraction = useCallback((question?: string) => {
    const analytics = getAnalytics();
    analytics.chatbotInteractions += 1;
    if (question) {
      analytics.chatbotQuestions.push(question);
      // Keep only last 100 questions
      analytics.chatbotQuestions = analytics.chatbotQuestions.slice(-100);
    }
    saveAnalytics(analytics);
  }, []);

  const trackTimeSpent = useCallback(() => {
    const analytics = getAnalytics();
    const sessionTime = Math.floor((Date.now() - analytics.sessionStart) / 1000);
    analytics.timeSpent += sessionTime;
    analytics.lastVisit = new Date().toISOString();
    saveAnalytics(analytics);
  }, []);

  // Track session time on page unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      trackTimeSpent();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      trackTimeSpent();
    };
  }, [trackTimeSpent]);

  return {
    trackPageView,
    trackSectionView,
    trackEvent,
    trackChatbotInteraction,
    trackTimeSpent,
    getAnalytics
  };
};
