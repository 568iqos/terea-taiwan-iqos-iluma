import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Upload, Play, Pause, Volume2, VolumeX } from "lucide-react";
import { base44 } from "@/api/base44Client";

export default function VideoSection({ siteSettings }) {
  const [videoUrl, setVideoUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [settingId, setSettingId] = useState(null);
  const videoRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!siteSettings) return;
    const rec = siteSettings.find((r) => r.key === "home_video_url");
    if (rec) {
      setVideoUrl(rec.value);
      setSettingId(rec.id);
    }
  }, [siteSettings]);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    if (settingId) {
      await base44.entities.SiteSettings.update(settingId, { value: file_url });
    } else {
      const record = await base44.entities.SiteSettings.create({ key: "home_video_url", value: file_url });
      setSettingId(record.id);
    }
    setVideoUrl(file_url);
    setUploading(false);
    setPlaying(false);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setPlaying(!playing);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !muted;
    setMuted(!muted);
  };

  return (
    <section className="py-20 md:py-28 px-6 md:px-12 bg-[#f7f7f7]">
      <div className="max-w-screen-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
        >
          {!videoUrl ? (
            <div
              onClick={() => inputRef.current?.click()}
              className="flex flex-col items-center justify-center w-full aspect-video rounded-2xl border-2 border-dashed border-border hover:border-foreground transition-colors cursor-pointer bg-white group"
            >
              {uploading ? (
                <div className="flex flex-col items-center gap-3">
                  <div className="w-8 h-8 border-2 border-foreground border-t-transparent rounded-full animate-spin" />
                  <p className="font-body text-sm text-muted-foreground">上傳中…</p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3 text-muted-foreground group-hover:text-foreground transition-colors">
                  <Upload className="w-10 h-10" />
                  <p className="font-body text-sm tracking-wide">點擊上傳影片（mp4、mov 等）</p>
                </div>
              )}
              <input
                ref={inputRef}
                type="file"
                accept="video/*"
                className="hidden"
                onChange={handleUpload}
              />
            </div>
          ) : (
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black group">
              <video
                ref={videoRef}
                src={videoUrl}
                className="w-full h-full object-cover"
                muted={muted}
                playsInline
                loop
                onEnded={() => setPlaying(false)}
              />
              {/* Controls overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
                <button
                  onClick={togglePlay}
                  className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  {playing ? (
                    <Pause className="w-7 h-7 text-white" />
                  ) : (
                    <Play className="w-7 h-7 text-white ml-1" />
                  )}
                </button>
              </div>
              {/* Mute + Replace buttons */}
              <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={toggleMute}
                  className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center hover:bg-black/60 transition-colors"
                >
                  {muted ? (
                    <VolumeX className="w-4 h-4 text-white" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-white" />
                  )}
                </button>
                <button
                  onClick={() => inputRef.current?.click()}
                  className="h-9 px-3 rounded-full bg-black/40 backdrop-blur-sm flex items-center gap-1.5 hover:bg-black/60 transition-colors"
                >
                  <Upload className="w-3.5 h-3.5 text-white" />
                  <span className="font-body text-[11px] text-white tracking-wider">更換影片</span>
                </button>
              </div>
              <input
                ref={inputRef}
                type="file"
                accept="video/*"
                className="hidden"
                onChange={handleUpload}
              />
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}