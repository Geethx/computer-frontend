import { createClient } from "@supabase/supabase-js";

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhhbXJxanhoaHhveHZybHBuYmNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk5MzQ3MTQsImV4cCI6MjA4NTUxMDcxNH0.1zBSwjdDUqzHFN2y2cr4kChQnTyD9fbfGYSjrt0Ykuo";
const supabaseURL = "https://xamrqjxhhxoxvrlpnbca.supabase.co";

const supabase = createClient(supabaseURL, supabaseKey);

export default function uploadFile(file) {
  return new Promise((resolve, reject) => {
    if (file == null) {
      reject("No file uploaded");
      return;
    }

    const timestamp = new Date().getTime();
    const fileName = timestamp + "-" + file.name;

    supabase.storage
      .from("Images")
      .upload(fileName, file, {
        upsert: false,
        cacheControl: 3600,
      })
      .then(() => {
        const url = supabase.storage.from("Images").getPublicUrl(fileName)
          .data.publicUrl;
        resolve(url);
      })
      .catch(() => {
        reject("Failed to upload file");
      });
  });
}
