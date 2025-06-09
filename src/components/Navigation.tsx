
import { Home, Plus, Trash2, Edit3 } from "lucide-react";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {
  const navItems = [
    { id: "home", icon: Home, label: "Home" },
    { id: "add", icon: Plus, label: "Ajouter" },
    { id: "delete", icon: Trash2, label: "Supprimer" },
    { id: "edit", icon: Edit3, label: "Modifier" }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-purple-200 shadow-lg">
      <div className="max-w-md mx-auto px-4">
        <div className="flex justify-around items-center py-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`nav-item ${activeTab === item.id ? 'active' : 'text-purple-600 hover:text-purple-700'}`}
            >
              <item.icon size={22} />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
