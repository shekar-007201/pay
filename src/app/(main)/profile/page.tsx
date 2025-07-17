import Link from 'next/link';
import {
  User,
  Settings,
  ShieldCheck,
  HelpCircle,
  LogOut,
  ChevronRight,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { userProfile } from '@/lib/data';

const ProfileMenuItem = ({
  icon: Icon,
  label,
  href = '#',
}: {
  icon: React.ElementType;
  label: string;
  href?: string;
}) => (
  <Link
    href={href}
    className="flex items-center gap-4 rounded-lg p-3 transition-colors hover:bg-muted"
  >
    <Icon className="h-6 w-6 text-muted-foreground" />
    <span className="flex-grow font-medium">{label}</span>
    <ChevronRight className="h-5 w-5 text-muted-foreground" />
  </Link>
);

export default function ProfilePage() {
  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6">
      <header className="text-center">
        <h1 className="text-2xl font-bold">Profile</h1>
      </header>

      <Card>
        <CardContent className="flex flex-col items-center gap-4 p-6 pt-8">
          <Avatar className="h-24 w-24 border-4 border-primary">
            <AvatarImage src={userProfile.avatarUrl} alt={userProfile.name} data-ai-hint="person portrait" />
            <AvatarFallback className="text-4xl">
              {userProfile.avatarFallback}
            </AvatarFallback>
          </Avatar>
          <div className="text-center">
            <h2 className="text-2xl font-bold">{userProfile.name}</h2>
            <p className="text-muted-foreground">{userProfile.phone}</p>
          </div>
          <Button variant="outline">Edit Profile</Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-2">
          <nav className="flex flex-col">
            <ProfileMenuItem icon={User} label="Account" />
            <ProfileMenuItem icon={Settings} label="Settings" />
            <ProfileMenuItem icon={ShieldCheck} label="Security" />
            <ProfileMenuItem icon={HelpCircle} label="Help & Support" />
          </nav>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-2">
          <ProfileMenuItem icon={LogOut} label="Logout" />
        </CardContent>
      </Card>
    </div>
  );
}
