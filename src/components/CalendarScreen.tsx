import { motion } from "motion/react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Clock,
  MapPin,
  Users,
  Video,
  Phone,
  Calendar as CalendarIcon
} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { toast } from "sonner@2.0.3";

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  startTime: string;
  endTime: string;
  type: "meeting" | "call" | "video" | "event";
  location?: string;
  attendees: number;
  color: string;
}

export function CalendarScreen() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [viewMode, setViewMode] = useState<"month" | "week" | "day">("month");

  const events: CalendarEvent[] = [
    {
      id: "1",
      title: "Partnership Strategy Meeting",
      date: new Date(2025, 9, 15, 10, 0),
      startTime: "10:00 AM",
      endTime: "11:30 AM",
      type: "meeting",
      location: "Conference Room A",
      attendees: 8,
      color: "bg-blue-500"
    },
    {
      id: "2",
      title: "Vendor Onboarding Call",
      date: new Date(2025, 9, 15, 14, 0),
      startTime: "2:00 PM",
      endTime: "2:45 PM",
      type: "video",
      attendees: 4,
      color: "bg-purple-500"
    },
    {
      id: "3",
      title: "Q4 Review",
      date: new Date(2025, 9, 18, 9, 0),
      startTime: "9:00 AM",
      endTime: "10:30 AM",
      type: "meeting",
      location: "Main Office",
      attendees: 12,
      color: "bg-green-500"
    },
    {
      id: "4",
      title: "Client Check-in",
      date: new Date(2025, 9, 20, 15, 0),
      startTime: "3:00 PM",
      endTime: "3:30 PM",
      type: "call",
      attendees: 2,
      color: "bg-orange-500"
    },
    {
      id: "5",
      title: "Team Building Event",
      date: new Date(2025, 9, 25, 17, 0),
      startTime: "5:00 PM",
      endTime: "7:00 PM",
      type: "event",
      location: "Sky Lounge",
      attendees: 25,
      color: "bg-pink-500"
    }
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek, firstDay, lastDay };
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const getEventsForDate = (day: number) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getDate() === day &&
             eventDate.getMonth() === currentDate.getMonth() &&
             eventDate.getFullYear() === currentDate.getFullYear();
    });
  };

  const getTodayEvents = () => {
    const today = new Date();
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.toDateString() === today.toDateString();
    });
  };

  const getEventIcon = (type: CalendarEvent["type"]) => {
    switch (type) {
      case "video": return Video;
      case "call": return Phone;
      case "meeting": return Users;
      case "event": return CalendarIcon;
      default: return CalendarIcon;
    }
  };

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="min-h-screen bg-muted/30 pb-24 md:pb-8">
      {/* Header */}
      <div className="bg-background border-b sticky top-16 z-40 safe-area-inset-top">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={goToPreviousMonth}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-xl">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h1>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={goToNextMonth}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button size="icon">
                  <Plus className="h-5 w-5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Add Event</DialogTitle>
                  <DialogDescription>Create a new event or appointment in your calendar</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Event Title</Label>
                    <Input id="title" placeholder="Enter event title" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input id="date" type="date" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="startTime">Start Time</Label>
                      <Input id="startTime" type="time" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endTime">End Time</Label>
                      <Input id="endTime" type="time" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Event Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="meeting">Meeting</SelectItem>
                        <SelectItem value="call">Phone Call</SelectItem>
                        <SelectItem value="video">Video Call</SelectItem>
                        <SelectItem value="event">Event</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location (optional)</Label>
                    <Input id="location" placeholder="Enter location" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea id="notes" placeholder="Add any additional notes" rows={3} />
                  </div>
                  <Button 
                    className="w-full" 
                    onClick={() => toast.success("Event added successfully!")}
                  >
                    Add Event
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* View mode selector - Mobile optimized */}
          <div className="flex gap-2">
            {(["month", "week", "day"] as const).map((mode) => (
              <Button
                key={mode}
                variant={viewMode === mode ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode(mode)}
                className="flex-1 sm:flex-initial capitalize"
              >
                {mode}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Today's Events - Quick access */}
        {getTodayEvents().length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Today's Schedule</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {getTodayEvents().map((event) => {
                  const Icon = getEventIcon(event.type);
                  return (
                    <div
                      key={event.id}
                      className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className={`${event.color} p-2 rounded-lg shrink-0`}>
                        <Icon className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{event.title}</p>
                        <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {event.startTime}
                          </span>
                          {event.location && (
                            <span className="flex items-center gap-1 truncate">
                              <MapPin className="h-3 w-3 shrink-0" />
                              <span className="truncate">{event.location}</span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Calendar Grid - Mobile optimized */}
        <Card>
          <CardContent className="p-3 sm:p-6">
            {/* Day names */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {dayNames.map((day) => (
                <div
                  key={day}
                  className="text-center text-xs sm:text-sm text-muted-foreground py-2"
                >
                  {day.substring(0, 3)}
                </div>
              ))}
            </div>

            {/* Calendar days */}
            <div className="grid grid-cols-7 gap-1">
              {/* Empty cells for days before month starts */}
              {Array.from({ length: startingDayOfWeek }).map((_, index) => (
                <div key={`empty-${index}`} className="aspect-square" />
              ))}

              {/* Days of the month */}
              {Array.from({ length: daysInMonth }).map((_, index) => {
                const day = index + 1;
                const dayEvents = getEventsForDate(day);
                const isToday = new Date().getDate() === day &&
                               new Date().getMonth() === currentDate.getMonth() &&
                               new Date().getFullYear() === currentDate.getFullYear();

                return (
                  <motion.button
                    key={day}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.01 }}
                    className={`aspect-square p-1 rounded-lg border transition-all hover:border-primary relative ${
                      isToday ? 'bg-primary/10 border-primary' : 'border-border'
                    }`}
                    onClick={() => setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
                  >
                    <div className={`text-sm sm:text-base ${isToday ? 'font-bold text-primary' : ''}`}>
                      {day}
                    </div>
                    {dayEvents.length > 0 && (
                      <div className="flex gap-0.5 justify-center mt-1 flex-wrap">
                        {dayEvents.slice(0, 3).map((event, i) => (
                          <div
                            key={i}
                            className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full ${event.color}`}
                          />
                        ))}
                      </div>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events - Linearized list for mobile */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {events
              .filter(event => event.date >= new Date())
              .sort((a, b) => a.date.getTime() - b.date.getTime())
              .map((event, index) => {
                const Icon = getEventIcon(event.type);
                const eventDate = new Date(event.date);
                const dateStr = `${monthNames[eventDate.getMonth()].substring(0, 3)} ${eventDate.getDate()}`;

                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-start gap-3 p-3 rounded-lg border hover:border-primary transition-colors"
                  >
                    <div className={`${event.color} p-2.5 rounded-lg shrink-0`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="font-medium truncate">{event.title}</h4>
                        <Badge variant="outline" className="shrink-0 text-xs">
                          {dateStr}
                        </Badge>
                      </div>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5 shrink-0" />
                          <span>{event.startTime} - {event.endTime}</span>
                        </div>
                        {event.location && (
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5 shrink-0" />
                            <span className="truncate">{event.location}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Users className="h-3.5 w-3.5 shrink-0" />
                          <span>{event.attendees} attendees</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
