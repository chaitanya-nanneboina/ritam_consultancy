import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../pages/Home/HomePage';
import ExploreCollegesPage from '../pages/ExploreColleges/ExploreCollegesPage';
import BlogsPage from '../pages/Blogs/BlogsPage';
import BlogArticlePage from '../pages/Blogs/BlogArticlePage';
import ResourcesPage from '../pages/Resources/ResourcesPage';
import AboutUsPage from '../pages/AboutUs/AboutUsPage';
import PrivacyPolicyPage from '../pages/Legal/PrivacyPolicyPage';
import TermsAndConditionsPage from '../pages/Legal/TermsAndConditionsPage';

/**
 * Clean URL Routing Architecture for Ritam Consultancy
 * 
 * Routes:
 * - '/'                      -> Home Page
 * - '/explore-colleges'      -> Explore Colleges Page
 * - '/blogs'                 -> Blogs Listing Page
 * - '/blogs/college-guide'   -> College Guide Article Page
 * - '/blogs/career-branches' -> Career & Branches Article Page
 * - '/blogs/student-checklist'-> Student Checklist Article Page
 * - '/blogs/:slug'           -> Dynamic Blog Article Route
 * - '/resources'             -> Resources Page (from reosucespage.pdf)
 * - '/about-us'              -> About Us Page
 * - '/privacy-policy'        -> Official Privacy Policy Page
 * - '/terms-and-conditions'  -> Official Terms & Conditions Page
 * - '*'                      -> Redirects cleanly to '/'
 */
export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/explore-colleges" element={<ExploreCollegesPage />} />
      <Route path="/blogs" element={<BlogsPage />} />
      {/* 301 SEO Redirects for Legacy Blog Slugs */}
      <Route
        path="/blogs/college-guide"
        element={<Navigate to="/blogs/how-to-choose-engineering-college-after-intermediate" replace />}
      />
      <Route
        path="/blogs/career-branches"
        element={<Navigate to="/blogs/which-btech-branch-to-choose" replace />}
      />
      <Route
        path="/blogs/student-checklist"
        element={<Navigate to="/blogs/things-to-check-before-joining-engineering-college" replace />}
      />
      <Route path="/blogs/:slug" element={<BlogArticlePage />} />
      <Route path="/resources" element={<ResourcesPage />} />
      <Route path="/about-us" element={<AboutUsPage />} />
      <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
      <Route path="/privacy" element={<Navigate to="/privacy-policy" replace />} />
      <Route path="/terms-and-conditions" element={<TermsAndConditionsPage />} />
      <Route path="/terms" element={<Navigate to="/terms-and-conditions" replace />} />
      <Route path="/terms-conditions" element={<Navigate to="/terms-and-conditions" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
