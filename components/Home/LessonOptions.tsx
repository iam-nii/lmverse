"use client";

const lessonOptions = [
    {
        title: "Elementary",
        description:
            "For those who are not familiar with the language at all. Lots of grammar and basic rules.",
        accentColor: "border-l-secondary",
    },
    {
        title: "Individual",
        description:
            "Courses tailored to your individual learning style and pace, guaranteeing progress and success.",
        accentColor: "border-l-secondary",
    },
    {
        title: "Business English",
        description:
            "Course focused on developing the key skills necessary for a successful career.",
        accentColor: "border-l-secondary",
    },
    {
        title: "Group lessons",
        description:
            "Lessons in a group of up to 8 people. A lot of conversational practice. Interactive learning materials.",
        accentColor: "border-l-secondary",
    },
];

export default function LessonOptions() {
    return (
        <section className="py-16 md:py-20 md:px-40 px-5">
            <h2 className="text-center text-2xl font-bold mb-10">lesson options</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {lessonOptions.map((opt, i) => (
                    <div
                        key={i}
                        className={`border-l-4 ${opt.accentColor} rounded-r-xl border border-border pl-5 pr-4 py-5`}
                    >
                        <p className="text-secondary font-semibold text-sm mb-2 underline underline-offset-2 cursor-pointer hover:text-secondary/80">
                            {opt.title}
                        </p>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            {opt.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
