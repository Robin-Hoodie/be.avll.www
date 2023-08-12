import axios from "axios";
import { BASE_URL_CONTENT } from "@/env";

const axiosInstanceMedia = axios.create({
  baseURL: `${BASE_URL_CONTENT}/api/upload`,
});

export async function getCoverPhotoUrl() {
  const { data: files } = await axiosInstanceMedia.get<
    Array<{ name: string; url: string }>
  >("files");
  const coverPhotoFile = files.find((file) => file.name === "cover.jpg");
  if (coverPhotoFile) {
    return `${BASE_URL_CONTENT}${coverPhotoFile.url}`;
  }
  return null;
}
