export const queryKeys = {
  courses: {
    all: ["courses"] as const,
    lists: () => [...queryKeys.courses.all, "list"] as const,
    detail: (id: string) => [...queryKeys.courses.all, "detail", id] as const,
  },
} as const;
