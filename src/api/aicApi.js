import aicApi from "./apiInstances/aicApiInstance";

// https://api.artic.edu/api/v1/artworks/search?q=8&query[term][is_public_domain]=true&fields=id,title,artist_title,medium_display,date_display,image_id,alt_image_ids
const searchArt = (term, page, limit) => {
  return aicApi
    .get("/artworks/search", {
      params: {
        q: term,
        page,
        limit,
        "query[term][is_public_domain]": true, // comment out for more exciting art, but probably not allowed legally
        // other potentially good fields: `alt_image_ids`, `color`
        fields: "id,title,artist_title,medium_display,date_display,image_id",
      },
    })
    .then((response) => response.data);
};

export default {
  searchArt,
};
