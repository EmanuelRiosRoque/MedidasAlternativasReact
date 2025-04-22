import { type FC } from 'react';

interface Tab {
    id: string;
    label: string;
    icon: React.ElementType;
}

interface TabsNavProps {
    tabs: Tab[];
    activeTab: string;
    setActiveTab: (tabId: string) => void;
}

const TabsNav: FC<TabsNavProps> = ({ tabs, activeTab, setActiveTab }) => {
    return (
        <div className="flex justify-center space-x-6 border-b border-neutral-700 mb-6">
            {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`relative flex items-center gap-2 py-4 text-sm font-medium transition duration-200 ${
                            isActive
                                ? 'text-emerald-600'
                                : 'text-gray-400 hover:text-emerald-500'
                        }`}
                    >
                        <Icon className={`h-5 w-5 ${isActive ? 'text-emerald-600' : 'text-gray-400'}`} />
                        <span>{tab.label}</span>
                        {isActive && (
                            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 rounded-full" />
                        )}
                    </button>
                );
            })}
        </div>
    );
};

export default TabsNav;
