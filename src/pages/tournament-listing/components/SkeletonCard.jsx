import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden gaming-shadow animate-pulse">
      {/* Banner Skeleton */}
      <div className="h-48 bg-muted/50" />
      
      {/* Content Skeleton */}
      <div className="p-4 space-y-4">
        {/* Title and Organizer */}
        <div className="space-y-2">
          <div className="h-6 bg-muted/50 rounded w-3/4" />
          <div className="h-4 bg-muted/30 rounded w-1/2" />
        </div>

        {/* Details */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <div className="h-4 bg-muted/30 rounded w-1/3" />
            <div className="h-4 bg-muted/30 rounded w-1/4" />
          </div>
          <div className="flex justify-between">
            <div className="h-4 bg-muted/30 rounded w-1/4" />
            <div className="h-4 bg-muted/30 rounded w-1/3" />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="h-3 bg-muted/30 rounded w-16" />
            <div className="h-5 bg-muted/50 rounded w-12" />
          </div>
          <div className="h-8 bg-muted/50 rounded w-20" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;