import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from 'firebase/auth';

interface ProfileHeaderProps {
  currentUser: User | null;
}

export const ProfileHeader = ({ currentUser }: ProfileHeaderProps) => {
  return (
    <div className="flex items-center gap-4">
      <Avatar className="h-20 w-20">
        <AvatarImage src={currentUser?.photoURL || ''} alt={currentUser?.displayName || 'User'} />
        <AvatarFallback className="text-2xl">
          {currentUser?.displayName?.charAt(0) || currentUser?.email?.charAt(0) || 'U'}
        </AvatarFallback>
      </Avatar>
      <div>
        <h1 className="text-3xl font-bold">{currentUser?.displayName || 'Your Profile'}</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>
    </div>
  );
};