import http from "../http-common";
class AlbumDataService {
  getAll() {
    return http.get("/albums");
  }
  get(id) {
    return http.get(`/albums/${id}`);
  }
  create(data) {
    return http.post("/albums", data);
  }

  createAlbum(title, file) {
    let formData = new FormData();
    formData.append("file", file);
    return http.post(`/albums?title=${title}`, formData, {
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

  update(id, data) {
    return http.put(`/albums/${id}`, data);
  }
  delete(id) {
    return http.delete(`/albums/${id}`);
  }
  deleteAll() {
    return http.delete(`/albums`);
  }
  findByTitle(title) {
    return http.get(`/albums?title=${title}`);
  }
}


export default new AlbumDataService();