import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const RecentMatches = ({ matches }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const matchesPerPage = 5;
  const totalPages = Math.ceil(matches?.length / matchesPerPage);
  
  const currentMatches = matches?.slice(
    (currentPage - 1) * matchesPerPage,
    currentPage * matchesPerPage
  );

  const getPlacementColor = (placement) => {
    if (placement === 1) return 'text-warning';
    if (placement <= 3) return 'text-success';
    if (placement <= 10) return 'text-primary';
    return 'text-muted-foreground';
  };

  const getPlacementIcon = (placement) => {
    if (placement === 1) return 'Crown';
    if (placement <= 3) return 'Medal';
    if (placement <= 10) return 'Award';
    return 'Hash';
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 gaming-shadow">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="History" size={24} className="text-primary" />
          Recent Matches
        </h2>
        <div className="text-sm text-muted-foreground">
          Last {matches?.length} matches
        </div>
      </div>
      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-2 text-sm font-semibold text-muted-foreground">Date</th>
              <th className="text-left py-3 px-2 text-sm font-semibold text-muted-foreground">Map</th>
              <th className="text-center py-3 px-2 text-sm font-semibold text-muted-foreground">Kills</th>
              <th className="text-center py-3 px-2 text-sm font-semibold text-muted-foreground">Damage</th>
              <th className="text-center py-3 px-2 text-sm font-semibold text-muted-foreground">Placement</th>
              <th className="text-center py-3 px-2 text-sm font-semibold text-muted-foreground">Duration</th>
              <th className="text-center py-3 px-2 text-sm font-semibold text-muted-foreground">Mode</th>
            </tr>
          </thead>
          <tbody>
            {currentMatches?.map((match, index) => (
              <tr 
                key={index} 
                className="border-b border-border/50 hover:bg-muted/30 transition-gaming"
              >
                <td className="py-4 px-2">
                  <div className="text-sm text-foreground">{match?.date}</div>
                  <div className="text-xs text-muted-foreground">{match?.time}</div>
                </td>
                <td className="py-4 px-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded overflow-hidden">
                      <Image
                        src={match?.mapImage}
                        alt={match?.map}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-sm font-medium text-foreground">{match?.map}</span>
                  </div>
                </td>
                <td className="py-4 px-2 text-center">
                  <span className="text-warning font-bold">{match?.kills}</span>
                </td>
                <td className="py-4 px-2 text-center">
                  <span className="text-destructive font-bold">{match?.damage}</span>
                </td>
                <td className="py-4 px-2 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Icon 
                      name={getPlacementIcon(match?.placement)} 
                      size={16} 
                      className={getPlacementColor(match?.placement)} 
                    />
                    <span className={`font-bold ${getPlacementColor(match?.placement)}`}>
                      #{match?.placement}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-2 text-center">
                  <span className="text-sm text-muted-foreground">{match?.duration}</span>
                </td>
                <td className="py-4 px-2 text-center">
                  <span className="text-xs px-2 py-1 bg-secondary/10 text-secondary rounded-full">
                    {match?.mode}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4">
        {currentMatches?.map((match, index) => (
          <div 
            key={index}
            className="bg-muted/30 border border-border/50 rounded-lg p-4 hover:bg-muted/50 transition-gaming"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded overflow-hidden">
                  <Image
                    src={match?.mapImage}
                    alt={match?.map}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-medium text-foreground">{match?.map}</div>
                  <div className="text-xs text-muted-foreground">{match?.date} • {match?.time}</div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Icon 
                  name={getPlacementIcon(match?.placement)} 
                  size={18} 
                  className={getPlacementColor(match?.placement)} 
                />
                <span className={`font-bold ${getPlacementColor(match?.placement)}`}>
                  #{match?.placement}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-warning font-bold text-lg">{match?.kills}</div>
                <div className="text-xs text-muted-foreground">Kills</div>
              </div>
              <div>
                <div className="text-destructive font-bold text-lg">{match?.damage}</div>
                <div className="text-xs text-muted-foreground">Damage</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">{match?.duration}</div>
                <div className="text-xs text-muted-foreground">Duration</div>
              </div>
            </div>
            
            <div className="mt-3 flex justify-center">
              <span className="text-xs px-3 py-1 bg-secondary/10 text-secondary rounded-full">
                {match?.mode}
              </span>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6 pt-6 border-t border-border">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-gaming"
          >
            <Icon name="ChevronLeft" size={16} />
          </button>
          
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1)?.map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-lg text-sm font-medium transition-gaming ${
                  currentPage === page
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted text-muted-foreground'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-gaming"
          >
            <Icon name="ChevronRight" size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default RecentMatches;