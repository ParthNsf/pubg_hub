import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const EsportsNews = () => {
  const newsArticles = [
    {
      id: 1,
      title: "PUBG Mobile World Championship 2025 Announced",
      description: "The biggest tournament of the year is coming with a massive $2M prize pool. Registration opens next month for qualifying rounds.",
      thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=250&fit=crop",
      category: "Tournament",
      publishDate: "2025-08-10",
      readTime: "3 min read",
      author: "Esports Central"
    },
    {
      id: 2,
      title: "New Meta Strategies for Sanhok Map",
      description: "Professional players share their latest rotation strategies and hot drop locations for the updated Sanhok map in competitive play.",
      thumbnail: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=250&fit=crop",
      category: "Strategy",
      publishDate: "2025-08-09",
      readTime: "5 min read",
      author: "Pro Gaming Tips"
    },
    {
      id: 3,
      title: "Top 10 Weapons for Competitive PUBG",
      description: "Complete weapon tier list and damage analysis for tournament play. Learn which weapons the pros prefer and why.",
      thumbnail: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&h=250&fit=crop",
      category: "Guide",
      publishDate: "2025-08-08",
      readTime: "7 min read",
      author: "Weapon Master"
    },
    {
      id: 4,
      title: "Interview with World Champion Team",
      description: "Exclusive interview with the current world champions discussing their training routine, team dynamics, and future plans.",
      thumbnail: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400&h=250&fit=crop",
      category: "Interview",
      publishDate: "2025-08-07",
      readTime: "10 min read",
      author: "Esports Today"
    },
    {
      id: 5,
      title: "Mobile Gaming Hardware Guide 2025",
      description: "Best phones, controllers, and accessories for competitive PUBG Mobile gaming. Performance benchmarks and recommendations.",
      thumbnail: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&h=250&fit=crop",
      category: "Hardware",
      publishDate: "2025-08-06",
      readTime: "8 min read",
      author: "Tech Gaming"
    },
    {
      id: 6,
      title: "Upcoming Tournament Schedule",
      description: "Complete calendar of major tournaments, qualifiers, and regional championships for the rest of 2025. Mark your calendars!",
      thumbnail: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop",
      category: "Schedule",
      publishDate: "2025-08-05",
      readTime: "4 min read",
      author: "Tournament Hub"
    }
  ];

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Tournament': return 'text-primary bg-primary/10';
      case 'Strategy': return 'text-secondary bg-secondary/10';
      case 'Guide': return 'text-accent bg-accent/10';
      case 'Interview': return 'text-warning bg-warning/10';
      case 'Hardware': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const handleReadMore = (articleId) => {
    window.location.href = '/game-information-hub';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
            Esports News & Tips
          </h2>
          <p className="text-muted-foreground">
            Stay updated with the latest PUBG competitive scene
          </p>
        </div>
        
        <Button
          variant="outline"
          onClick={() => window.location.href = '/game-information-hub'}
          iconName="ArrowRight"
          iconPosition="right"
          className="border-primary text-primary hover:bg-primary/10"
        >
          View All
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {newsArticles?.map((article) => (
          <div
            key={article?.id}
            className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-gaming group gaming-shadow cursor-pointer"
            onClick={() => handleReadMore(article?.id)}
          >
            {/* Article Image */}
            <div className="relative h-48 overflow-hidden">
              <Image
                src={article?.thumbnail}
                alt={article?.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-gaming-slow"
              />
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(article?.category)}`}>
                  {article?.category}
                </span>
              </div>
            </div>

            {/* Article Content */}
            <div className="p-6">
              <h3 className="text-lg font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-gaming">
                {article?.title}
              </h3>
              
              <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                {article?.description}
              </p>

              {/* Article Meta */}
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                <div className="flex items-center space-x-4">
                  <span className="flex items-center">
                    <Icon name="Calendar" size={12} className="mr-1" />
                    {formatDate(article?.publishDate)}
                  </span>
                  <span className="flex items-center">
                    <Icon name="Clock" size={12} className="mr-1" />
                    {article?.readTime}
                  </span>
                </div>
              </div>

              {/* Author */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  By {article?.author}
                </span>
                <Icon 
                  name="ArrowRight" 
                  size={16} 
                  className="text-muted-foreground group-hover:text-primary transition-gaming" 
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EsportsNews;