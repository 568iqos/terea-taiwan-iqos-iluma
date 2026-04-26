import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, Phone, ChevronRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const stores = [
  {
    id: 1,
    name: "IQOS 旗艦店 信義",
    city: "台北",
    address: "台北市信義區松壽路12號1樓",
    phone: "02-2723-8888",
    hours: "11:00 - 21:30",
    lat: 25.0365,
    lng: 121.5678,
  },
  {
    id: 2,
    name: "IQOS 體驗店 東區",
    city: "台北",
    address: "台北市大安區忠孝東路四段216號",
    phone: "02-2771-9999",
    hours: "11:00 - 22:00",
    lat: 25.0418,
    lng: 121.5510,
  },
  {
    id: 3,
    name: "IQOS 專賣店 中山",
    city: "台北",
    address: "台北市中山區南京西路14號",
    phone: "02-2531-6666",
    hours: "10:30 - 21:00",
    lat: 25.0528,
    lng: 121.5225,
  },
  {
    id: 4,
    name: "IQOS 台中旗艦店",
    city: "台中",
    address: "台中市西屯區台灣大道三段301號",
    phone: "04-2258-7777",
    hours: "11:00 - 21:30",
    lat: 24.1627,
    lng: 120.6405,
  },
  {
    id: 5,
    name: "IQOS 草悟道體驗店",
    city: "台中",
    address: "台中市西區英才路534號",
    phone: "04-2305-5555",
    hours: "11:00 - 21:00",
    lat: 24.1512,
    lng: 120.6632,
  },
  {
    id: 6,
    name: "IQOS 高雄旗艦店",
    city: "高雄",
    address: "高雄市前鎮區中山二路260號",
    phone: "07-335-8888",
    hours: "11:00 - 22:00",
    lat: 22.6118,
    lng: 120.3016,
  },
  {
    id: 7,
    name: "IQOS 漢神巨蛋專櫃",
    city: "高雄",
    address: "高雄市左營區博愛二路777號",
    phone: "07-555-1234",
    hours: "11:00 - 21:30",
    lat: 22.6697,
    lng: 120.3025,
  },
];

const cities = ["全部", "台北", "台中", "高雄"];

export default function Stores() {
  const [activeCity, setActiveCity] = useState("全部");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStore, setSelectedStore] = useState(null);

  const filteredStores = stores.filter((store) => {
    const cityMatch = activeCity === "全部" || store.city === activeCity;
    const searchMatch =
      store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.address.toLowerCase().includes(searchQuery.toLowerCase());
    return cityMatch && searchMatch;
  });

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="h-px w-16 bg-primary mb-8" />
            <h1 className="font-heading text-4xl md:text-6xl font-bold tracking-tight mb-4">
              門市據點
            </h1>
            <p className="font-body text-muted-foreground text-lg max-w-xl">
              全台授權販售門市，歡迎親臨體驗 Terea 的精緻風味。
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters & Store List */}
      <section className="px-6 lg:px-12 pb-32">
        <div className="max-w-7xl mx-auto">
          {/* Search & City Tabs */}
          <div className="flex flex-col md:flex-row gap-4 mb-12">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="搜尋門市名稱或地址..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 font-heading text-sm bg-card border-border"
              />
            </div>
            <div className="flex gap-2">
              {cities.map((city) => (
                <button
                  key={city}
                  onClick={() => setActiveCity(city)}
                  className={`px-5 py-2.5 font-heading text-xs tracking-widest uppercase transition-all duration-300 rounded-full ${
                    activeCity === city
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          {/* Store Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStores.map((store, i) => (
              <motion.div
                key={store.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className={`border rounded-2xl p-6 cursor-pointer transition-all duration-300 ${
                  selectedStore?.id === store.id
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/30 bg-card"
                }`}
                onClick={() => setSelectedStore(store)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="inline-block font-heading text-xs tracking-widest uppercase text-primary bg-primary/10 px-2 py-1 rounded mb-2">
                      {store.city}
                    </span>
                    <h3 className="font-heading text-lg font-bold">
                      {store.name}
                    </h3>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground mt-1" />
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                    <p className="font-body text-sm text-muted-foreground">
                      {store.address}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-muted-foreground shrink-0" />
                    <p className="font-heading text-sm text-muted-foreground">
                      {store.hours}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-muted-foreground shrink-0" />
                    <p className="font-heading text-sm text-muted-foreground">
                      {store.phone}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredStores.length === 0 && (
            <div className="text-center py-20">
              <MapPin className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="font-heading text-lg text-muted-foreground">
                找不到符合條件的門市
              </p>
              <p className="font-body text-sm text-muted-foreground/60 mt-2">
                請嘗試其他搜尋條件
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}