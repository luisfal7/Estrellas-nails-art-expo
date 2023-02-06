

const uploadImageDB = async (file: any) => {
  if (!file) return;

  try {
    const formData = new FormData();
    formData.append("upload_preset", "estrellas-nails-art");
    formData.append("folder", "estrellas-nails-art/gallery");
    formData.append("file", file);

    const url = "https://api.cloudinary.com/v1_1/do7cayuwj/image/upload";

    let res = await fetch(url, {
      method: "post",
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    let responseJson = await res.json();

    return responseJson.url;
  } catch (error) {
    console.log("Error al cargar la imagen");
    return null;
  }
};

export default uploadImageDB;
