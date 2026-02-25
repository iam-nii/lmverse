"use client";

const programs = [
    {
        icon: "📋",
        label: "Individual consultations",
        bg: "bg-amber-50 dark:bg-amber-900/20",
        iconBg: "bg-amber-100",
    },
    {
        icon: "💼",
        label: "Corporate Training",
        bg: "bg-rose-50 dark:bg-rose-900/20",
        iconBg: "bg-rose-100",
    },
    {
        icon: "🖥️",
        label: "Exam preparations",
        bg: "bg-indigo-50 dark:bg-indigo-900/20",
        iconBg: "bg-indigo-100",
    },
];

export default function Programs() {
    return (
        <section className="py-16 bg-gradient-to-b from-[#e8f5e9]/60 to-[#e3f2fd]/60 dark:from-slate-900/60 dark:to-slate-800/60">
            <div className="md:px-40 px-5">
                <h2 className="text-center text-xl md:text-2xl font-bold mb-10">
                    Our Programs have been designed for your convenience.
                </h2>
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                    {programs.map((p, i) => (
                        <div
                            key={i}
                            className={`flex items-center gap-4 rounded-2xl px-6 py-5 w-full sm:w-64 border border-border ${p.bg}`}
                        >
                            <span
                                className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${p.iconBg}`}
                            >
                                {p.icon}
                            </span>
                            <p className="font-semibold text-sm">{p.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
