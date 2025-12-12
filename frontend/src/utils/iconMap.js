
import { 
  TrendingUp, Clock, Award, Lightbulb, Zap, Moon, Sun, 
  BatteryWarning, Bell, MessageCircle, BookOpen, 
  Star, CheckCircle, FileText, PlayCircle, User, Layers,
  Brain
} from 'lucide-react';

export const getIcon = (iconName) => {
  const icons = {

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
    "Brain": Brain
  };


  return icons[iconName] || Star; 
};