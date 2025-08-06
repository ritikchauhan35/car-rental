import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Calendar } from 'lucide-react';

export const ProfileStats = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="h-5 w-5" />
          Profile Stats
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Member since</span>
          <div className="flex items-center gap-1 text-sm">
            <Calendar className="h-4 w-4" />
            <span>Jan 2024</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Total trips</span>
          <Badge variant="secondary">0</Badge>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Average rating</span>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm">New User</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};