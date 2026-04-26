import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Clock, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const stores = [
  { id: 1, name: 'TEREA 台北信義旗艦店', area: '台北市', address: '台北市信義區松壽路12號', phone: '02-2345-6789', hours: '11:00 - 21:00' },
  { id: 2, name: 'TEREA 台北忠孝店', area: '台北市', address: '台北市大安區忠孝東路四段181號', phone: '02-2771-8888', hours: '11:00 - 21:30' },
  { id: 3, name: 'TEREA 台中公益店', area: '台中市', address: '台中市南屯區公益路二段88號', phone: '04-2326-5555', hours: '11:00 - 21:00' },
  { id: 4, name: 'TEREA 高雄漢神店', area: '高雄市', address: '高雄市前金區成功一路266號', phone: '07-215-7777', hours: '11:00 - 22:00' },
  { id: 5, name: 'TEREA 新竹巨城店', area: '新竹市', address: '新竹市東區中央路229號', phone: '03-623-9999', hours: '11:00 - 21:30' },
];

const areas = ['全部', '台北市', '台中市', '高雄市', '新竹市'];

export default function StoreLocator() {
  const [selectedArea, setSelectedArea] = useState('全部');
  const [selectedStore, setSelectedStore] = useState(null);

  const filtered = selectedArea === '全部' ? stores : stores.filter(s => s.area === selectedArea);

  return (
    <section id="stores" className="relative py-32 md:py-44">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="font-heading text-xs tracking-[0.3em] uppercase text-primary mb-4">
            Store Locator
          </p>
          <h2 className="font-heading text-3xl md:text-5xl tracking-[0.1em] uppercase text-foreground font-bold">
            門市據點
          </h2>
          <p className="font-body text-muted-foreground mt-4 max-w-lg text-sm leading-relaxed tracking-wide">
            前往最近的 TEREA 授權門市，親身體驗感應加熱的純粹品味。
          </p>
        </motion.div>

        {/* Area filters */}
        <div className="flex flex-wrap gap-3 mb-12">
          {areas.map((area) => (
            <button
              key={area}
              onClick={() => { setSelectedArea(area); setSelectedStore(null); }}
              className={`font-heading text-xs tracking-[0.15em] uppercase px-5 py-2.5 rounded-full border transition-all duration-300 ${
                selectedArea === area
                  ? 'bg-secondary text-secondary-foreground border-secondary'
                  : 'bg-transparent text-muted-foreground border-border hover:border-primary hover:text-primary'
              }`}
            >
              {area}
            </button>
          ))}
        </div>

        {/* Store list */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((store, index) => (
            <motion.div
              key={store.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setSelectedStore(store)}
              className={`group cursor-pointer p-6 rounded-2xl border transition-all duration-300 ${
                selectedStore?.id === store.id
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50 bg-card'
              }`}
            >
              {/* Pulse point */}
              <div className="flex items-start gap-4">
                <div className="relative flex-shrink-0 mt-1">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <div className="absolute inset-0 w-3 h-3 rounded-full bg-primary/40 animate-ping" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-heading text-sm tracking-[0.08em] uppercase text-foreground font-semibold group-hover:text-primary transition-colors">
                    {store.name}
                  </h3>
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="font-body text-xs">{store.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="font-body text-xs">{store.hours}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="font-body text-xs">{store.phone}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 flex justify-center"
        >
          <Button
            variant="outline"
            className="font-heading text-xs tracking-[0.2em] uppercase px-8 py-6 rounded-full border-foreground text-foreground hover:bg-secondary hover:text-secondary-foreground transition-all duration-300"
          >
            <Navigation className="w-4 h-4 mr-3" />
            尋找最近門市
          </Button>
        </motion.div>
      </div>
    </section>
  );
}