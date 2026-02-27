import { create } from 'zustand';

// Types derived from gemini.md JSON Schema
export type LessonFormat = 'Individual' | 'Group';
export type BookingStatus = 'scheduled' | 'completed' | 'cancelled';

export interface Booking {
    id: string;
    student_id: string;
    tutor_id: string;
    lesson_id: string;
    start_time: string; // ISO String
    end_time: string;   // ISO String
    status: BookingStatus;
}

interface BookingState {
    bookings: Booking[];
    isLoading: boolean;
    error: string | null;
    setBookings: (bookings: Booking[]) => void;
    addBooking: (booking: Booking) => void;
    updateBooking: (id: string, updates: Partial<Booking>) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
}

export const useBookingStore = create<BookingState>((set) => ({
    bookings: [],
    isLoading: false,
    error: null,
    setBookings: (bookings) => set({ bookings }),
    addBooking: (booking) => set((state) => ({ bookings: [...state.bookings, booking] })),
    updateBooking: (id, updates) => set((state) => ({
        bookings: state.bookings.map(b => b.id === id ? { ...b, ...updates } : b)
    })),
    setLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error }),
}));
