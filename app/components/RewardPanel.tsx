"use client";

import { Sparkles, Lock, Image as ImageIcon } from "lucide-react";

interface RewardPanelProps {
  canGenerateImages: boolean;
  currentStreak: number;
}

const RewardPanel = ({ canGenerateImages, currentStreak }: RewardPanelProps) => {
  return (
    <div className="max-w-2xl mx-auto mb-10">
      <div className="bg-[#E0F2FE] border-[3px] border-black rounded-lg p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
        
        <h3 className="text-2xl font-black mb-4 flex items-center gap-2">
          🎁 Rewards
          <Sparkles className="text-yellow-500" />
        </h3>

        {/* IMAGE GENERATION REWARD */}
        <div
          className={`flex items-center justify-between p-4 rounded-lg border-2 font-bold ${
            canGenerateImages
              ? "bg-[#90EE90] border-black"
              : "bg-gray-200 border-gray-400 opacity-70"
          }`}
        >
          <div className="flex items-center gap-3">
            <ImageIcon />
            <div>
              <p>Image Generation</p>
              <p className="text-sm font-medium">
                Requires 7-day streak
              </p>
            </div>
          </div>

          {canGenerateImages ? (
            <span className="text-green-700">✅ UNLOCKED</span>
          ) : (
            <span className="flex items-center gap-1">
              <Lock className="w-4 h-4" />
              Locked ({currentStreak}/7)
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default RewardPanel;
