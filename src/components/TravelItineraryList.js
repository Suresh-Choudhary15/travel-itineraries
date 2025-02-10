"use client";
import React, { useState } from "react";
import mockData from "@/data/mockData.json";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Clock, DollarSign } from "lucide-react";

// Mock data
const mockItineraries = mockData.itineraries;

const destinations = [...new Set(mockItineraries.map((i) => i.destination))];

const TravelItineraryList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDestination, setSelectedDestination] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 5000 });

  // Filter itineraries based on search, destination, and price range
  const filteredItineraries = mockItineraries.filter((itinerary) => {
    const matchesSearch =
      itinerary.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      itinerary.destination.toLowerCase().includes(searchTerm.toLowerCase());
    itinerary.destination
      .toLowerCase()
      .split(", ")
      .some((word) => word.includes(searchTerm.toLowerCase()));

    const matchesDestination =
      !selectedDestination || itinerary.destination === selectedDestination;
    const minPrice = priceRange.min || 0;
    const maxPrice = priceRange.max || 5000;

    const matchesPrice =
      itinerary.price >= minPrice && itinerary.price <= maxPrice;
    return matchesSearch && matchesDestination && matchesPrice;
  });

  const handleBuyNow = (itinerary) => {
    alert(
      `Thank you for your interest in "${itinerary.title}"! This is a demo purchase action.`
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search and Filter Section */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <Input
              className="pl-10"
              placeholder="Search itineraries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="p-2 border rounded-md"
            value={selectedDestination}
            onChange={(e) => setSelectedDestination(e.target.value)}
          >
            <option value="">All Destinations</option>
            {destinations.map((dest) => (
              <option key={dest} value={dest}>
                {dest}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-4 items-center">
          <span>Price Range:</span>
          <Input
            type="number"
            placeholder="Min"
            className="w-24"
            value={priceRange.min === 0 ? "" : priceRange.min}
            onChange={(e) => {
              const newValue =
                e.target.value === "" ? 0 : Number(e.target.value);
              setPriceRange({ ...priceRange, min: newValue });
            }}
          />
          <span>to</span>
          <Input
            type="number"
            placeholder="Max"
            className="w-24"
            value={priceRange.max === 5000 ? "" : priceRange.max}
            onChange={(e) => {
              const newValue =
                e.target.value === "" ? 5000 : Number(e.target.value);
              setPriceRange({ ...priceRange, max: newValue });
            }}
          />
        </div>
      </div>

      {/* Itineraries Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItineraries.map((itinerary) => (
          <Card key={itinerary.id} className="flex flex-col">
            <img
              src={itinerary.image}
              alt={itinerary.title}
              className="h-48 w-full object-cover rounded-t-lg"
            />
            <CardHeader>
              <CardTitle className="text-xl">{itinerary.title}</CardTitle>
              <CardDescription className="flex items-center gap-1">
                <MapPin size={16} /> {itinerary.destination}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <Clock size={16} /> {itinerary.duration}
                </span>
                <span className="flex items-center gap-1">
                  <DollarSign size={16} /> ${itinerary.price}
                </span>
              </div>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="flex-1">
                    View Details
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{itinerary.title}</DialogTitle>
                    <DialogDescription>
                      <img
                        src={itinerary.image}
                        alt={itinerary.title}
                        className="w-full h-64 object-cover rounded-lg mb-4"
                      />
                      <div className="mb-4">{itinerary.description}</div>

                      <h3 className="font-semibold mb-2">Highlights:</h3>
                      <ul className="list-disc pl-5">
                        {itinerary.highlights.map((highlight, index) => (
                          <li key={index}>{highlight}</li>
                        ))}
                      </ul>
                      <div className="border-t pt-4 text-sm">
                        <p>
                          <strong>Difficulty:</strong> {itinerary.difficulty}
                        </p>
                        <p>
                          <strong>Best Time to Visit:</strong>{" "}
                          {itinerary.bestTimeToVisit}
                        </p>
                        <p>
                          <strong>Rating:</strong> ⭐ {itinerary.rating} / 5
                        </p>
                      </div>
                      <div className="mt-4 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Clock size={16} />
                          <span>{itinerary.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign size={16} />
                          <span>${itinerary.price}</span>
                        </div>
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
              <Button
                className="flex-1"
                onClick={() => handleBuyNow(itinerary)}
              >
                Buy Now
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TravelItineraryList;
