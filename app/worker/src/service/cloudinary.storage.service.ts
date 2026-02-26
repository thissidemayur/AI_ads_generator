import type { IStorageService } from "@project/shared";
import { v2 as cloudinary } from "cloudinary";
import { env } from "../config/env";

export class CloudinaryStorageService implements IStorageService {
  constructor() {
    cloudinary.config({
      cloud_name: env.CLOUDINARY_CLOUD_NAME,
      api_key: env.CLOUDINARY_API_KEY,
      api_secret: env.CLOUDINARY_API_SECRET,
      // return http url by setting secure true
      secure: env.NODE_ENV === "production",
    });
  }

  async upload(file: Buffer | string, folder: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: `ai_ad_genereation/${folder}`,
          resource_type: "auto",
        },
        (error, uploadResult) => {
          if (error) return reject(error);
          return resolve(uploadResult!.secure_url);
        },
      );

      if (Buffer.isBuffer(file)) {
        uploadStream.end(file);
      } else {
        // if its file path or ulr
        cloudinary.uploader
          .upload(file, {
            folder: `ai_ad_genereation/${folder}`,
          })
          .then((res) => resolve(res.secure_url))
          .catch(reject);
      }
    });
  }

  async delete(url: string): Promise<void> {
    try {
      //    url structure: https://res.cloudinary.com/cloud_name/video/upload/v12345/ai_ad_generation/videos/my_file.mp4
      const splitUrl = url.split("/");
      const fileName = splitUrl[splitUrl.length - 1]?.split(".")[0]; // my_file
      const subFolderName = splitUrl[splitUrl.length - 2]; //videos
      const rootFolderName = splitUrl[splitUrl.length - 3]; //ai_ad_generation
      const publicId = `${rootFolderName}/${subFolderName}/${fileName}`;
      await cloudinary.uploader.destroy(publicId, {
        resource_type: url.includes("/video") ? "video" : "image",
      });
    } catch (error) {
      console.error(`[CLOUDINARY_DELETE_ERROR]: `, error);
    }
  }

  async generateThumbnail(videoUrl: string): Promise<string> {
    try {
      const splitUrl = videoUrl.split("/");
      const fileName = splitUrl[splitUrl.length - 1]?.split(".")[0];
      const subFolderName = splitUrl[splitUrl.length - 2];
      const rootFolderName = splitUrl[splitUrl.length - 3];
      const publicId = `${rootFolderName}/${subFolderName}/${fileName}`;

      return cloudinary.url(publicId, {
        resource_type: "video",
        format: "auto",
        transformation: [
          { width: 400, crop: "scale" },
          { quality: "auto" },
          { fetch_format: "auto" },
        ],
      });
    } catch (error) {
      console.error(`[THUMBNAIL_GENERATION_ERROR]: `, error);
      return "";
    }
  }
}
