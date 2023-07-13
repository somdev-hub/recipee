import imageCompression from "browser-image-compression";

export const convertToBase64 = async (file) => {
  if (file != null) {
    // console.log("originalFile instanceof Blob", file instanceof Blob); // true
    // console.log(`originalFile size ${file.size / 1024 / 1024} MB`);

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true
    };

    try {
      const compressedFile = await imageCompression(file, options);
      // console.log(
      //   "compressedFile instanceof Blob",
      //   compressedFile instanceof Blob
      // );
      // console.log(
      //   `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
      // );
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(compressedFile);
        fileReader.onload = () => {
          resolve(fileReader.result);
        };
        fileReader.onerror = (error) => {
          reject(error);
        };
      });
    } catch (error) {
      console.log(error);
    }
  }
};
