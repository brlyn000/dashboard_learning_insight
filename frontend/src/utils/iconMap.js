// File: src/utils/iconMap.js - UPDATED
import { 
  TrendingUp, Clock, Award, Lightbulb, Zap, Moon, Sun, 
  BatteryWarning, Bell, MessageCircle, BookOpen, 
  Star, CheckCircle, FileText, PlayCircle, User, Layers,
  Brain // Tambahkan ini
} from 'lucide-react';

export const getIcon = (iconName) => {
  const icons = {
    // Mapping Nama String ke Komponen React
    "TrendingUp": TrendingUp,
    "Clock": Clock,
    "Award": Award,
    "Lightbulb": Lightbulb,
    "Zap": Zap,
    "Moon": Moon,
    "Sun": Sun,
    "BatteryWarning": BatteryWarning,
    "Bell": Bell,
    "MessageCircle": MessageCircle,
    "BookOpen": BookOpen,
    "Star": Star,
    "CheckCircle": CheckCircle,
    "FileText": FileText,
    "PlayCircle": PlayCircle,
    "User": User,
    "Layers": Layers,
    "Brain": Brain // Tambahkan mapping untuk Brain
  };

  // Jika ikon ditemukan, kembalikan komponennya. 
  // Jika tidak, kembalikan 'Star' sebagai default agar tidak error.
  return icons[iconName] || Star; 
};