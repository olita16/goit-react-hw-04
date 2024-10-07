import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com";

const FetchImages = async (searchQuery, page) => {
  try {
    const params = {
      query: searchQuery,
      page: page,
      per_page: 12,
    };

    const response = await axios.get("/search/photos", {
      params,
      headers: {
        Authorization: `Client-ID 05TZIXUxamP4moDw44XLVh1oCepSyL-MdpSIIl8RJEo`,
      },
    });

    if (response.data.results.length === 0) {
      throw new Error("No images found for this search query");
    }

    const images = response.data.results.map(
      ({ id, urls, alt_description }) => {
        return {
          id,
          webformatURL: urls.small, 
          largeImageURL: urls.regular, 
          tags: alt_description || "Image",
        };
      }
    );

    return { images, totalImages: response.data.total };
  } catch (error) {
    console.error("Error fetching images:", error.message);
    throw error;
  }
};

export default FetchImages;
