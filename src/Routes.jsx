import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import HomeDashboard from './pages/home-dashboard';
import StreamersDirectory from './pages/streamers-directory';
import UserAuthentication from './pages/user-authentication';
import TournamentListing from './pages/tournament-listing';
import PlayerProfile from './pages/player-profile';
import GameInformationHub from './pages/game-information-hub';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<GameInformationHub />} />
        <Route path="/home-dashboard" element={<HomeDashboard />} />
        <Route path="/streamers-directory" element={<StreamersDirectory />} />
        <Route path="/user-authentication" element={<UserAuthentication />} />
        <Route path="/tournament-listing" element={<TournamentListing />} />
        <Route path="/player-profile" element={<PlayerProfile />} />
        <Route path="/game-information-hub" element={<GameInformationHub />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
