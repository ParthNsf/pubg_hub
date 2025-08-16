import React from 'react';
import Header from '../../components/ui/Header';
import HeroBanner from './components/HeroBanner';
import TournamentCarousel from './components/TournamentCarousel';
import StreamersCarousel from './components/StreamersCarousel';
import MiniLeaderboard from './components/MiniLeaderboard';
import EsportsNews from './components/EsportsNews';
import CallToActionCards from './components/CallToActionCards';
import Footer from './components/Footer';

const HomeDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="container mx-auto px-4 lg:px-6 py-8">
          {/* Hero Section */}
          <HeroBanner />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Content - Main Feed */}
            <div className="lg:col-span-3 space-y-12">
              <TournamentCarousel />
              <StreamersCarousel />
              <EsportsNews />
              <CallToActionCards />
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <MiniLeaderboard />
                
                {/* Quick Stats Card */}
                <div className="bg-card border border-border rounded-xl p-6 gaming-shadow">
                  <h3 className="text-lg font-bold text-foreground mb-4">
                    Platform Stats
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground text-sm">Active Players</span>
                      <span className="text-primary font-bold">2.8M</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground text-sm">Live Tournaments</span>
                      <span className="text-secondary font-bold">47</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground text-sm">Prize Pool Today</span>
                      <span className="text-accent font-bold">$125K</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground text-sm">Streamers Online</span>
                      <span className="text-warning font-bold">1,247</span>
                    </div>
                  </div>
                </div>

                {/* Featured Tournament Card */}
                <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-xl p-6 gaming-shadow">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mx-auto mb-4">
                      <span className="text-background font-bold text-lg">🏆</span>
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      Featured Event
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      Join the Weekly Championship starting in 2 hours
                    </p>
                    <div className="text-2xl font-bold text-primary mb-4">
                      $50,000
                    </div>
                    <button
                      onClick={() => window.location.href = '/tournament-listing'}
                      className="w-full bg-gradient-to-r from-primary to-secondary text-background font-semibold py-2 px-4 rounded-lg hover:from-primary/90 hover:to-secondary/90 transition-gaming"
                    >
                      Join Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HomeDashboard;