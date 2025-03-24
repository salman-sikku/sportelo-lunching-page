"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { format, parse, isToday, isTomorrow, addMinutes } from "date-fns";

// Define the interface for match data
interface Match {
    id: number;
    Date: string;
    Location: string;
    Rival: string;
    Time: string;
    hasReminder?: boolean;
}

// Team colors mapping for styling
const teamColors = {
    CSK: { primary: "#FFFF00", secondary: "#0081C8", short: "CSK", full: "Chennai Super Kings" },
    MI: { primary: "#004BA0", secondary: "#D1AB3E", short: "MI", full: "Mumbai Indians" },
    RCB: { primary: "#EC1C24", secondary: "#000000", short: "RCB", full: "Royal Challengers Bengaluru" },
    KKR: { primary: "#3A225D", secondary: "#B3A123", short: "KKR", full: "Kolkata Knight Riders" },
    DC: { primary: "#0078BC", secondary: "#EF1B23", short: "DC", full: "Delhi Capitals" },
    PBKS: { primary: "#ED1B24", secondary: "#A7A9AC", short: "PBKS", full: "Punjab Kings" },
    RR: { primary: "#FF69B4", secondary: "#254AA5", short: "RR", full: "Rajasthan Royals" },
    SRH: { primary: "#FF822A", secondary: "#000000", short: "SRH", full: "Sunrisers Hyderabad" },
    GT: { primary: "#1D78BC", secondary: "#0F3A73", short: "GT", full: "Gujarat Titans" },
    LSG: { primary: "#A4123F", secondary: "#5CC1E3", short: "LSG", full: "Lucknow Super Giants" },
};

// Component to extract team abbreviation from match rival string
const TeamLogo = ({ teamName }: { teamName: string }) => {
    const teams = teamName.split(" vs ");

    return (
        <div className="flex items-center space-x-3">
            <TeamBadge team={teams[0]} />
            <span className="text-white opacity-80 text-xs md:text-sm">vs</span>
            <TeamBadge team={teams[1]} />
        </div>
    );
};

// Component for team badge/logo
const TeamBadge = ({ team }: { team: string }) => {
    const teamInfo = Object.values(teamColors).find(t => t.short === team);

    if (!teamInfo) return <span className="text-white">{team}</span>;

    return (
        <div className="flex items-center">
            <div
                className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold text-sm"
                style={{
                    background: teamInfo.primary,
                    color: teamInfo.secondary,
                    boxShadow: `0 0 10px ${teamInfo.primary}40`
                }}
            >
                {team}
            </div>
            <span className="ml-2 text-white text-xs md:text-sm hidden md:block">{teamInfo.full}</span>
        </div>
    );
};

// Date formatter for match dates
const formatMatchDate = (dateStr: string) => {
    if (dateStr === "Today") return "Today";
    if (dateStr === "Tomorrow") return "Tomorrow";

    try {
        const parsedDate = parse(dateStr, "EEE, MMM d", new Date());
        return format(parsedDate, "EEE, MMM d");
    } catch (e) {
        return dateStr;
    }
};

// Function to group matches by date
const groupMatchesByDate = (matches: Match[]) => {
    const grouped: Record<string, Match[]> = {};

    matches.forEach(match => {
        if (!grouped[match.Date]) {
            grouped[match.Date] = [];
        }
        grouped[match.Date].push(match);
    });

    return grouped;
};

// Function to parse match time and create a Date object
const parseMatchDateTime = (dateStr: string, timeStr: string): Date => {
    let baseDate: Date;

    if (dateStr === "Today") {
        baseDate = new Date();
    } else if (dateStr === "Tomorrow") {
        baseDate = new Date();
        baseDate.setDate(baseDate.getDate() + 1);
    } else {
        baseDate = parse(dateStr, "EEE, MMM d", new Date());
    }

    const [hours, minutes] = timeStr.split(':').map(Number);
    baseDate.setHours(hours, minutes, 0, 0);

    return baseDate;
};

export default function IPLSchedule() {
    const [matches, setMatches] = useState<Match[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [visibleDates, setVisibleDates] = useState<string[]>([]);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<'upcoming' | 'all'>('upcoming');
    const [displayedDates, setDisplayedDates] = useState<string[]>([]);
    const [dateOffset, setDateOffset] = useState(0);
    const maxVisibleDates = 5; // Adjust based on your UI

    useEffect(() => {
        const fetchSchedule = async () => {
            try {
                setLoading(true);

                // Direct fetch from the external API
                const response = await fetch('/api/ipl-schedule');

                if (!response.ok) {
                    throw new Error(`API returned status: ${response.status}`);
                }

                const data = await response.json();

                // Convert object with "Match X" keys to array
                let matchesArray: Match[] = [];

                if (Array.isArray(data)) {
                    matchesArray = data;
                } else if (typeof data === 'object') {
                    // Check for nested data structure
                    if (data.matches || data.data || data.schedule) {
                        matchesArray = data.matches || data.data || data.schedule;
                    } else {
                        // Extract from object with "Match X" keys
                        matchesArray = Object.entries(data).map(([key, value]) => {
                            // Extract match number from key (e.g., "Match 1" -> 1)
                            const matchId = parseInt(key.replace(/\D/g, '')) || 0;
                            return {
                                id: matchId,
                                hasReminder: false, // Add reminder flag
                                ...(value as any)
                            };
                        });
                    }
                }

                if (matchesArray.length === 0) {
                    throw new Error('No valid match data found in API response');
                }

                // Sort matches by ID if available
                matchesArray.sort((a, b) => (a.id || 0) - (b.id || 0));

                // Check for existing reminders in localStorage
                const savedReminders = localStorage.getItem('iplMatchReminders');
                if (savedReminders) {
                    const reminderIds = JSON.parse(savedReminders);
                    matchesArray = matchesArray.map(match => ({
                        ...match,
                        hasReminder: reminderIds.includes(match.id)
                    }));
                }

                setMatches(matchesArray);

                // Set first date with matches as selected
                if (matchesArray.length > 0) {
                    const firstDate = matchesArray[0].Date;
                    setSelectedDate(firstDate);
                    setVisibleDates([firstDate]);
                }

            } catch (err) {
                console.error('Error details:', err);
                setError('Failed to load the IPL schedule. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchSchedule();

        // Check for permission to send notifications
        if ('Notification' in window) {
            Notification.requestPermission();
        }
    }, []);

    // Calculate dates to display based on offset
    useEffect(() => {
        const calculateVisibleDates = () => {
            const dates = filteredDates.slice(dateOffset, dateOffset + maxVisibleDates);
            setDisplayedDates(dates);
        };

        calculateVisibleDates();
    }, [dateOffset, viewMode, matches]);

    // Group matches by date
    const groupedMatches = groupMatchesByDate(matches);

    // Get all unique dates
    const allDates = Object.keys(groupedMatches);

    // Filter dates based on view mode
    const filteredDates = viewMode === 'upcoming'
        ? allDates.filter(date => {
            if (date === 'Today' || date === 'Tomorrow') return true;
            try {
                const parsedDate = parse(date, 'EEE, MMM d', new Date());
                return parsedDate >= new Date();
            } catch {
                return true;
            }
        })
        : allDates;

    // Navigate dates
    const handlePrevDates = () => {
        if (dateOffset > 0) {
            setDateOffset(dateOffset - 1);
        }
    };

    const handleNextDates = () => {
        if (dateOffset + maxVisibleDates < filteredDates.length) {
            setDateOffset(dateOffset + 1);
        }
    };

    // Handle date click
    const handleDateClick = (date: string) => {
        setSelectedDate(date);

        // Add to visible dates if not already there
        if (!visibleDates.includes(date)) {
            setVisibleDates([...visibleDates, date]);
        }
    };

    // Handle reminder toggle
    const handleReminder = (match: Match) => {
        // Toggle reminder state
        const updatedMatches = matches.map(m => {
            if (m.id === match.id) {
                return { ...m, hasReminder: !m.hasReminder };
            }
            return m;
        });

        setMatches(updatedMatches);

        // Save reminder state to localStorage
        const matchesWithReminders = updatedMatches.filter(m => m.hasReminder).map(m => m.id);
        localStorage.setItem('iplMatchReminders', JSON.stringify(matchesWithReminders));

        // Handle reminder notification
        if (!match.hasReminder) {
            // Schedule notification for match time
            try {
                const matchTime = parseMatchDateTime(match.Date, match.Time);
                const teams = match.Rival.split(' vs ');

                // Notification permission check
                if ('Notification' in window && Notification.permission === 'granted') {
                    // Show toast for current confirmation
                    showToast(`Reminder set for ${teams[0]} vs ${teams[1]}`);

                    // Schedule notification for match time (using setTimeout)
                    const now = new Date();
                    const timeUntilMatch = matchTime.getTime() - now.getTime();

                    if (timeUntilMatch > 0) {
                        // Schedule notification 15 minutes before match
                        const timeUntilReminder = timeUntilMatch - (15 * 60 * 1000);
                        setTimeout(() => {
                            sendMatchNotification(match);
                        }, Math.max(0, timeUntilReminder));

                        // Also schedule for exact match time
                        setTimeout(() => {
                            sendMatchStartNotification(match);
                        }, timeUntilMatch);
                    }
                } else {
                    showToast('Please grant notification permission to set reminders');
                    Notification.requestPermission();
                }
            } catch (err) {
                console.error('Error setting reminder:', err);
                showToast('Failed to set reminder');
            }
        } else {
            showToast('Reminder removed');
        }
    };

    // Function to send notification
    const sendMatchNotification = (match: Match) => {
        if ('Notification' in window && Notification.permission === 'granted') {
            const teams = match.Rival.split(' vs ');
            new Notification('IPL Match Reminder', {
                body: `${teams[0]} vs ${teams[1]} starts in 15 minutes at ${match.Time}!`,
                icon: '/ipl-logo.png'
            });
        }
    };

    // Function to send match start notification
    const sendMatchStartNotification = (match: Match) => {
        if ('Notification' in window && Notification.permission === 'granted') {
            const teams = match.Rival.split(' vs ');
            new Notification('IPL Match Starting Now!', {
                body: `${teams[0]} vs ${teams[1]} is starting now at ${match.Location}!`,
                icon: '/ipl-logo.png'
            });
        }
    };

    // Simple toast notification system
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    const showToast = (message: string) => {
        setToastMessage(message);
        setTimeout(() => {
            setToastMessage(null);
        }, 3000);
    };

    if (loading) {
        return (
            <div className="w-full flex justify-center py-12">
                <div className="w-16 h-16 border-4 border-t-transparent border-red-600 border-solid rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full text-center py-12">
                <p className="text-red-500">{error}</p>
                <button
                    className="mt-4 px-5 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full"
                    onClick={() => window.location.reload()}
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="w-full max-w-4xl mx-auto mt-6 md:mt-12 sm:mb-16 mb-11">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-white">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-red-600">
                            IPL 2025 Schedule
                        </span>
                    </h2>

                    <div className="flex space-x-2">
                        <button
                            className={`px-3 py-1 text-xs md:text-sm rounded-full transition-all ${viewMode === 'upcoming'
                                ? 'bg-red-600 text-white'
                                : 'bg-white/10 text-gray-300 hover:bg-white/20'
                                }`}
                            onClick={() => {
                                setViewMode('upcoming');
                                setDateOffset(0);
                            }}
                        >
                            Upcoming
                        </button>
                        <button
                            className={`px-3 py-1 text-xs md:text-sm rounded-full transition-all ${viewMode === 'all'
                                ? 'bg-red-600 text-white'
                                : 'bg-white/10 text-gray-300 hover:bg-white/20'
                                }`}
                            onClick={() => {
                                setViewMode('all');
                                setDateOffset(0);
                            }}
                        >
                            All Matches
                        </button>
                    </div>
                </div>

                {/* Date selector with navigation buttons */}
                <div className="mb-6 relative">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={handlePrevDates}
                            className={`flex-shrink-0 p-2 rounded-full bg-white/5 text-white/80 
                                ${dateOffset === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/10'}`}
                            disabled={dateOffset === 0}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        <div className="flex space-x-2 px-2 overflow-hidden">
                            {displayedDates.map(date => (
                                <motion.button
                                    key={date}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`mb:px-6 px-5 py-2 md:text-base text-sm rounded-xl flex-shrink-0 transition-all font-medium ${selectedDate === date
                                        ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-700/20'
                                        : 'bg-white/5 text-gray-300 hover:bg-white/10'
                                        }`}
                                    onClick={() => handleDateClick(date)}
                                >
                                    {formatMatchDate(date)}
                                </motion.button>
                            ))}
                        </div>

                        <button
                            onClick={handleNextDates}
                            className={`flex-shrink-0 p-2 rounded-full bg-white/5 text-white/80 
                                ${dateOffset + maxVisibleDates >= filteredDates.length ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/10'}`}
                            disabled={dateOffset + maxVisibleDates >= filteredDates.length}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Matches for selected date */}
                {selectedDate && groupedMatches[selectedDate] && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-4"
                    >
                        {groupedMatches[selectedDate].map((match, index) => (
                            <motion.div
                                key={match.id || index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className="relative rounded-xl p-4 overflow-hidden"
                                style={{
                                    background: 'rgba(18, 18, 18, 0.6)',
                                    backdropFilter: 'blur(16px)',
                                    WebkitBackdropFilter: 'blur(16px)',
                                    borderWidth: '1px',
                                    borderColor: 'rgba(255, 255, 255, 0.1)'
                                }}
                            >
                                {/* Match Number Badge */}
                                <div className="absolute top-0 right-0 bg-red-600 text-white text-xs px-2 py-1 rounded-bl-lg rounded-tr-lg font-medium">
                                    Match {match.id || index + 1}
                                </div>

                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                    <div className="flex-1">
                                        {/* Teams */}
                                        <div className="mb-2">
                                            <TeamLogo teamName={match.Rival} />
                                        </div>

                                        {/* Venue */}
                                        <div className="text-gray-400 text-xs md:text-sm flex items-center">
                                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            {match.Location}
                                        </div>
                                    </div>

                                    {/* Time */}
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                                        <div className="bg-white/10 px-3 py-2 rounded-lg">
                                            <div className="text-xs text-gray-400">Time</div>
                                            <div className="text-white font-medium">{match.Time}</div>
                                        </div>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className={`flex-shrink-0 flex items-center space-x-1 text-white px-3 py-2 rounded-lg text-sm transition-all ${match.hasReminder
                                                ? "bg-green-600 hover:bg-green-700"
                                                : "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600"
                                                }`}
                                            onClick={() => handleReminder(match)}
                                        >
                                            {match.hasReminder ? (
                                                <>
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    <span>Reminded</span>
                                                </>
                                            ) : (
                                                <>
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                                    </svg>
                                                    <span>Reminder</span>
                                                </>
                                            )}
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {/* No matches message */}
                {selectedDate && (!groupedMatches[selectedDate] || groupedMatches[selectedDate].length === 0) && (
                    <div className="text-center py-12 text-gray-400">
                        No matches scheduled for this date.
                    </div>
                )}
            </motion.div>
        </div>
    );
}