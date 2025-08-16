import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TeamAffiliation = ({ currentTeam, previousTeams }) => {
  const getRoleColor = (role) => {
    const colors = {
      'IGL': 'text-warning border-warning/20 bg-warning/5',
      'Fragger': 'text-destructive border-destructive/20 bg-destructive/5',
      'Support': 'text-success border-success/20 bg-success/5',
      'Sniper': 'text-primary border-primary/20 bg-primary/5'
    };
    return colors?.[role] || 'text-muted-foreground border-border bg-muted/20';
  };

  const getRoleIcon = (role) => {
    const icons = {
      'IGL': 'Crown',
      'Fragger': 'Zap',
      'Support': 'Shield',
      'Sniper': 'Target'
    };
    return icons?.[role] || 'User';
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 gaming-shadow">
      <h2 className="text-xl font-bold text-foreground flex items-center gap-2 mb-6">
        <Icon name="Users" size={24} className="text-primary" />
        Team Affiliation
      </h2>
      {/* Current Team */}
      {currentTeam && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Icon name="Star" size={18} className="text-success" />
            Current Team
          </h3>
          
          <div className="bg-muted/30 border border-border/50 rounded-lg p-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-lg overflow-hidden border-2 border-primary gaming-shadow">
                <Image
                  src={currentTeam?.logo}
                  alt={`${currentTeam?.name} logo`}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1">
                <h4 className="text-lg font-bold text-foreground">{currentTeam?.name}</h4>
                <p className="text-sm text-muted-foreground mb-2">{currentTeam?.description}</p>
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getRoleColor(currentTeam?.role)}`}>
                    <Icon name={getRoleIcon(currentTeam?.role)} size={12} />
                    {currentTeam?.role}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Joined {currentTeam?.joinDate}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-border/50">
              <div className="text-center">
                <div className="text-lg font-bold text-primary">{currentTeam?.stats?.tournaments}</div>
                <div className="text-xs text-muted-foreground">Tournaments</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-success">{currentTeam?.stats?.wins}</div>
                <div className="text-xs text-muted-foreground">Wins</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-warning">${currentTeam?.stats?.earnings}</div>
                <div className="text-xs text-muted-foreground">Earnings</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-secondary">#{currentTeam?.stats?.ranking}</div>
                <div className="text-xs text-muted-foreground">Global Rank</div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Previous Teams */}
      {previousTeams && previousTeams?.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Icon name="History" size={18} className="text-muted-foreground" />
            Previous Teams
          </h3>
          
          <div className="space-y-3">
            {previousTeams?.map((team, index) => (
              <div 
                key={index}
                className="bg-muted/20 border border-border/30 rounded-lg p-4 hover:bg-muted/30 transition-gaming"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg overflow-hidden border border-border">
                    <Image
                      src={team?.logo}
                      alt={`${team?.name} logo`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-foreground">{team?.name}</h4>
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getRoleColor(team?.role)}`}>
                        <Icon name={getRoleIcon(team?.role)} size={10} />
                        {team?.role}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {team?.startDate} - {team?.endDate} • {team?.duration}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm font-medium text-foreground">
                      {team?.achievements} achievements
                    </div>
                    <div className="text-xs text-success">
                      ${team?.earnings} earned
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* No Team State */}
      {!currentTeam && (!previousTeams || previousTeams?.length === 0) && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Users" size={32} className="text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No Team Affiliation</h3>
          <p className="text-muted-foreground mb-4">
            This player is currently not affiliated with any team.
          </p>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-gaming">
            Find Teams
          </button>
        </div>
      )}
    </div>
  );
};

export default TeamAffiliation;