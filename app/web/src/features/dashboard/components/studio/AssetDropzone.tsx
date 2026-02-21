import  { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X, CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const AssetDropzone = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);



  const simulateUpload = () => {
    setUploading(true);
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };


    const onDrop = useCallback((acceptedFiles: File[]) => {
      const selectedFile = acceptedFiles[0];
      setFile(selectedFile);

      // Simulate Requirement 5: Persistent Storage Upload
      simulateUpload();
    }, []);


  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpeg", ".png", ".webp"] },
    multiple: false,
  });

  return (
    <div className="space-y-4">
      {!file ? (
        <div
          {...getRootProps()}
          className={cn(
            "relative group border-2 border-dashed rounded-2xl p-10 transition-all cursor-pointer flex flex-col items-center justify-center gap-4",
            isDragActive
              ? "border-primary bg-primary/5"
              : "border-zinc-800 bg-zinc-900/20 hover:border-zinc-700 hover:bg-zinc-900/40",
          )}
        >
          <input {...getInputProps()} />
          <div className="h-12 w-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Upload className="w-6 h-6 text-zinc-500" />
          </div>
          <div className="text-center">
            <p className="text-sm font-bold text-zinc-300">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-zinc-500 mt-1 uppercase tracking-widest font-mono">
              PNG, JPG or WEBP (Max 10MB)
            </p>
          </div>
        </div>
      ) : (
        <div className="relative group rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4 animate-in fade-in zoom-in-95">
          <div className="flex items-center gap-4">
            {/* Image Preview */}
            <div className="h-16 w-16 rounded-lg bg-zinc-800 overflow-hidden border border-white/5 relative">
              <img
                src={URL.createObjectURL(file)}
                alt="Preview"
                className="h-full w-full object-cover"
              />
              {uploading && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <Loader2 className="w-4 h-4 text-primary animate-spin" />
                </div>
              )}
            </div>

            {/* File Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-bold text-white truncate">
                  {file.name}
                </p>
                <button
                  onClick={() => setFile(null)}
                  className="p-1 hover:bg-zinc-800 rounded-md transition-colors"
                >
                  <X className="w-4 h-4 text-zinc-500 hover:text-red-400" />
                </button>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex-1 h-1.5 bg-black rounded-full overflow-hidden border border-white/5">
                  <div
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <span className="text-[10px] font-mono text-zinc-500 w-8">
                  {uploadProgress}%
                </span>
              </div>
            </div>
          </div>

          {uploadProgress === 100 && (
            <div className="absolute -top-2 -right-2 h-5 w-5 bg-green-500 rounded-full flex items-center justify-center border-2 border-black animate-in zoom-in">
              <CheckCircle2 className="h-3 w-3 text-white" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
