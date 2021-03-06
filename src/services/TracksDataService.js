import http from "../http-common";
class TracksDataService {
  getAllTracks() {
    // console.log("album id...",albumId);
    return http.get(`/tracks`);
  }
  getAllTracksWithAlbum(albumId) {
    // console.log("album id...",albumId);
    return http.get(`/albums/${albumId}/tracks`);
  }
  getTrack(albumId,id) {
    return http.get(`/albums/${albumId}/tracks/${id}`);
  }
  createTrack(albumId,data) {
    return http.post(`/albums/${albumId}/tracks`, data);
  }
  updateTrack(albumId,id, data) {
    return http.put(`/albums/${albumId}/tracks/${id}`, data);
  }
  deleteTrack(albumId,id) {
    return http.delete(`/albums/${albumId}/tracks/${id}`);
  }
  findByTitle(title) {
    return http.get(`/tracks?title=${title}`);
  }

}
export default new TracksDataService();