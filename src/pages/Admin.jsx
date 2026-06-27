import React, { useState, useEffect, useRef } from "react";
import { base44 } from "@/api/base44Client";
import { motion } from "framer-motion";
import { Save, Plus, Trash2, LogOut, Image, HelpCircle, Video, Upload, ImagePlus, FileText, Eye, EyeOff, Edit2 } from "lucide-react";

async function normalizeImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = 1000;
        canvas.height = 1000;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "#fff";
        ctx.fillRect(
