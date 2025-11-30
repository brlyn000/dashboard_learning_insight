import { 
  TrendingUp, Clock, Award, Lightbulb, Zap, Moon, Sun, 
  BatteryWarning, Bell, MessageCircle, BookOpen, 
  Star, CheckCircle, FileText, PlayCircle, User, Layers 
} from 'lucide-react';

export const getIcon = (iconName) => {
  const icons = {
    // Mapping Nama String ke Komponen React
    "TrendingUp": TrendingUp,
    "Clock": Clock,
    "Award": Award,
    "Lightbulb": Lightbulb,
    "Zap": Zap,                 // Dipakai Bujang
    "Moon": Moon,
    "Sun": Sun,
    "BatteryWarning": BatteryWarning,
    "Bell": Bell,
    "MessageCircle": MessageCircle,
    "BookOpen": BookOpen,       // Dipakai Budi
    "Star": Star,               // Dipakai Newbie
    "CheckCircle": CheckCircle, // Dipakai Sarah
    "FileText": FileText,
    "PlayCircle": PlayCircle,
    "User": User,
    "Layers": Layers
  };

  // Jika ikon ditemukan, kembalikan komponennya. 
  // Jika tidak, kembalikan 'Star' sebagai default agar tidak error.
  return icons[iconName] || Star; 
};