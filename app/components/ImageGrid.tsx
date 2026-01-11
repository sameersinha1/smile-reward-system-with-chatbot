import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Smile, Share, Trash2, DollarSign, Star } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import html2canvas from "html2canvas";
import { NOUNS_SVG } from "../constants/nouns";

/* ---------------------------------- */
/* Types */
/* ---------------------------------- */
export interface Image {
  url: string;
  timestamp: string;
  isLoading?: boolean;
  smileCount: number;
  smileScore?: number;
  hasWon?: boolean;
  isNounish: boolean;
}

interface ImageGridProps {
  images: Image[];
  authenticated: boolean;
  userId?: string;
  onSmileBack: (imageUrl: string) => void;
  onDelete: (imageUrl: string, userId: string) => void;
  shimmerStyle: string;
}

export const ImageGrid = ({
  images,
  authenticated,
  userId,
  onSmileBack,
  onDelete,
  shimmerStyle,
}: ImageGridProps) => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

  /* ---------------------------------- */
  /* Share */
  /* ---------------------------------- */
  const handleShare = (image: Image) => {
    setSelectedImage(image);
    setIsShareModalOpen(true);
  };

  const saveScreenshot = async () => {
    if (!selectedImage) return;

    const preview = document.getElementById("share-preview");
    if (!preview) return;

    try {
      const canvas = await html2canvas(preview, {
        backgroundColor: "#ffffff",
        scale: 2,
        useCORS: true,
      });

      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "my-smile.png";
      link.click();
    } catch (err) {
      console.error("Screenshot failed:", err);
    }
  };

  /* ---------------------------------- */
  /* Render */
  /* ---------------------------------- */
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image) => (
          <Card
            key={image.url}
            className="p-3 border-[3px] border-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          >
            <div className={`relative ${image.isLoading ? shimmerStyle : ""}`}>
              <img
                src={image.url}
                alt="Captured smile"
                crossOrigin="anonymous"
                className="w-full h-[280px] object-cover rounded-lg mb-3 border-2 border-black"
              />

              {image.isNounish && (
                <div
                  className="absolute top-2 left-2 w-12 h-12"
                  dangerouslySetInnerHTML={{ __html: NOUNS_SVG }}
                />
              )}

              <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full border-2 border-black">
                <span className="font-bold">
                  {image.isLoading ? "?/5" : `${image.smileScore ?? 0}/5`}
                </span>
                {(image.smileScore ?? 0) > 3 && (
                  <Star className="inline h-4 w-4 ml-1 text-green-600" />
                )}
              </div>
            </div>

            <div className="flex justify-between items-center">
              <p className="text-xs text-gray-600">
                {new Date(image.timestamp).toLocaleString()}
              </p>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  disabled={!authenticated}
                  onClick={() => onSmileBack(image.url)}
                >
                  <Smile className="h-4 w-4 mr-1" />
                  {image.smileCount}
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleShare(image)}
                >
                  <Share className="h-4 w-4" />
                </Button>

                {authenticated &&
                  userId &&
                  image.url.includes(`${userId}/`) && (
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => onDelete(image.url, userId)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
              </div>
            </div>

            {!image.isLoading && image.hasWon && (
              <p className="mt-2 text-center text-green-700 font-bold">
                🎉 0.001 USDC Won!
              </p>
            )}

            {image.isLoading && (
              <p className="mt-2 text-center">Analyzing smile… ⏳</p>
            )}
          </Card>
        ))}
      </div>

      {/* Share Modal */}
      <Dialog open={isShareModalOpen} onOpenChange={setIsShareModalOpen}>
        <DialogContent className="max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-black">
              Share Your Smile 😊
            </DialogTitle>
          </DialogHeader>

          {selectedImage && (
            <div className="space-y-4">
              <div
                id="share-preview"
                className="p-4 border-[3px] border-black rounded-xl"
              >
                <img
                  src={selectedImage.url}
                  alt="Share"
                  crossOrigin="anonymous"
                  className="rounded-lg"
                />
                <p className="text-center mt-2 font-bold">
                  Smile Score: {selectedImage.smileScore ?? 0}/5
                </p>
              </div>

              <Button
                onClick={saveScreenshot}
                className="w-full bg-blue-500 text-white"
              >
                Save Screenshot
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
