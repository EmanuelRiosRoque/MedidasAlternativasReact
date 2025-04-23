interface TabsProps {
    current: number;
    onChange: (id: number) => void;
    items: { id: number; label: string }[];
  }
  
  export default function Tabs({ current, onChange, items }: TabsProps) {
    return (
      <div className="flex gap-4 border-b pb-2">
        {items.map(tab => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`px-4 py-2 border-b-2 ${
              current === tab.id ? 'border-emerald-600 font-bold' : 'border-transparent text-gray-500'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    );
  }
  