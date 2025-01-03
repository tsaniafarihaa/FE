// "use client";

// import { useState, useEffect } from "react";
// import EventCard from "@/components/home/EventCard";
// import { Event } from "@/types/event";

// interface CategoryOption {
//   value: "all" | "Music" | "Orchestra" | "Opera" | "Other";
//   label: string;
// }

// interface LocationOption {
//   value: "all" | "Bandung" | "Bali" | "Surabaya" | "Jakarta";
//   label: string;
// }

// const categories: CategoryOption[] = [
//   { value: "all", label: "All Categories" },
//   { value: "Music", label: "Music" },
//   { value: "Orchestra", label: "Orchestra" },
//   { value: "Opera", label: "Opera" },
//   { value: "Other", label: "Other" },
// ];

// const locations: LocationOption[] = [
//   { value: "all", label: "All Locations" },
//   { value: "Bandung", label: "Bandung" },
//   { value: "Jakarta", label: "Jakarta" },
//   { value: "Surabaya", label: "Surabaya" },
//   { value: "Bali", label: "Bali" },
// ];

// export default function ViewAllEvents() {
//   const [events, setEvents] = useState<Event[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [activeCategory, setActiveCategory] = useState<CategoryOption["value"]>("all");
//   const [activeLocation, setActiveLocation] = useState<LocationOption["value"]>("all");
//   const [currentPage, setCurrentPage] = useState(1);
//   const eventsPerPage = 15;

//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const response = await fetch("http://localhost:8000/api/events");
//         if (!response.ok) throw new Error("Failed to fetch events");
//         const data = await response.json();
//         if (!Array.isArray(data)) {
//           console.error("Received data is not an array:", data);
//           setEvents([]);
//           return;
//         }
//         setEvents(data);
//       } catch (error) {
//         console.error("Error fetching events:", error);
//         setEvents([]);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchEvents();
//   }, []);

//   const filteredEvents = events.filter((event) => {
//     const matchesCategory = activeCategory === "all" || event.category === activeCategory;
//     const matchesLocation = activeLocation === "all" || event.location === activeLocation;
//     return matchesCategory && matchesLocation;
//   });

//   const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
//   const indexOfLastEvent = currentPage * eventsPerPage;
//   const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
//   const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-black">
//         <div className="flex items-center justify-center min-h-[400px]">
//           <div className="h-12 w-12 animate-spin rounded-full border-t-2 border-orange-500" />
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-black">
//       <div className="container mx-auto px-4 py-8 space-y-8">
//         <h1 className="text-2xl font-bold text-white">All Events</h1>
        
//         <div className="space-y-4">
//           <div className="flex gap-2 overflow-x-auto pb-2">
//             {categories.map((category) => (
//               <button
//                 key={category.value}
//                 onClick={() => {
//                   setActiveCategory(category.value);
//                   setCurrentPage(1);
//                 }}
//                 className={`rounded-full px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors
//                   ${
//                     activeCategory === category.value
//                       ? "bg-orange-500 text-white"
//                       : "bg-zinc-800 text-gray-300 hover:bg-zinc-700"
//                   }`}
//               >
//                 {category.label}
//               </button>
//             ))}
//           </div>

//           <div className="flex gap-2 overflow-x-auto pb-2">
//             {locations.map((location) => (
//               <button
//                 key={location.value}
//                 onClick={() => {
//                   setActiveLocation(location.value);
//                   setCurrentPage(1);
//                 }}
//                 className={`rounded-full px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors
//                   ${
//                     activeLocation === location.value
//                       ? "bg-orange-500 text-white"
//                       : "bg-zinc-800 text-gray-300 hover:bg-zinc-700"
//                   }`}
//               >
//                 {location.label}
//               </button>
//             ))}
//           </div>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
//           {currentEvents.map((event) => (
//             <EventCard
//               key={event.id}
//               event={{
//                 id: event.id,
//                 slug: event.slug,
//                 title: event.title,
//                 date: event.date,
//                 venue: event.venue,
//                 tickets: event.tickets,
//                 thumbnail: event.thumbnail,
//                 category: event.category,
//                 location: event.location,
//                 isTopEvent: false,
//               }}
//             />
//           ))}
//         </div>

//         {totalPages > 1 && (
//           <div className="flex justify-center gap-2 mt-8">
//             <button
//               onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//               disabled={currentPage === 1}
//               className="px-4 py-2 rounded-lg bg-zinc-800 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-700"
//             >
//               Previous
//             </button>
//             {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//               <button
//                 key={page}
//                 onClick={() => setCurrentPage(page)}
//                 className={`px-4 py-2 rounded-lg ${
//                   currentPage === page
//                     ? "bg-orange-500 text-white"
//                     : "bg-zinc-800 text-white hover:bg-zinc-700"
//                 }`}
//               >
//                 {page}
//               </button>
//             ))}
//             <button
//               onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//               disabled={currentPage === totalPages}
//               className="px-4 py-2 rounded-lg bg-zinc-800 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-700"
//             >
//               Next
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }