export const SearchFilter = ({ search, setSearch, filter, setFilter }) => {
  const filters = [
    { key: "all", label: "Hammasi" },
    { key: "active", label: "Faol" },
    { key: "completed", label: "Bajarilgan" },
  ];

  return (
    <div className="px-6 pt-4 space-y-3">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Qidirish..."
        className="w-full bg-slate-800/60 text-slate-200 placeholder-slate-500 text-sm rounded-lg px-3 py-2 border border-slate-800 focus:outline-none focus:border-slate-600 transition"
      />
      <div className="flex gap-1">
        {filters.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`text-xs px-3 py-1.5 rounded-full transition ${
              filter === key
                ? "bg-emerald-500 text-slate-950 font-medium"
                : "text-slate-400 hover:text-slate-200 bg-slate-800/50"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};