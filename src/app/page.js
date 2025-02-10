import TravelItineraryList from "@/components/TravelItineraryList";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="py-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          Travel Itineraries
        </h1>
        <TravelItineraryList />
      </div>
    </main>
  );
}
