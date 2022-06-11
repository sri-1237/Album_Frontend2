import http from "../http-common";
class ArtistDataService {
  getAll() {
    return http.get("/artists");
  }
  get(id) {
    return http.get(`/artists/${id}`);
  }
  create(data) {
    return http.post("/artists", data);
  }
  getAlbumsFromArtist(id){
    return http.get(`/albums/${id}/albums`);
  }
  createArtist(artist, file) {
    let formData = new FormData();
    formData.append("file", file);
    return http.post(`/artists?name=${artist.name}&description=${artist.description}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  }

  // createAlbum(title, file) {
  // const formData = new FormData()
  // formData.append('myFile', file)
  // return http.post(`/albums`, formData);

  // }

  // update(id, data) {
  //   return http.put(`/albums/${id}`, data);
  // }

  update(id, artist, file) {
    let formData = new FormData();
    formData.append("file", file);
    return http.put(`/artists/${id}?name=${artist.name}&description=${artist.description}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  }

  delete(id) {
    return http.delete(`/artists/${id}`);
  }
  deleteAll() {
    return http.delete(`/artists`);
  }
  findByTitle(title) {
    return http.get(`/artists?name=${title}`);
  }
}


export default new ArtistDataService();