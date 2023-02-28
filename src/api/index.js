import axios from "axios";

const baseURL = "http://localhost:4000/";
// const baseURL = "https://one-music-app.herokuapp.com/";

export const validateUser = async (token) => {
  try {
    const res = await axios.get(`${baseURL}api/users/login`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return res.data;
  } catch (e) {
    return null;
  }
};

export const getAllUsers = async () => {
  try {
    const res = await axios.get(`${baseURL}api/users/getUsers`);
    return res.data;
  } catch (error) {
    return null;
  }
};

export const getAllArtists = async () => {
  try {
    const res = await axios.get(`${baseURL}api/artist/getAll`);
    return res.data;
  } catch (error) {
    return null;
  }
};

export const getAllAlbums = async () => {
  try {
    const res = await axios.get(`${baseURL}api/albums/getAll`);
    return res.data;
  } catch (error) {
    return null;
  }
};

export const getAllSongs = async () => {
  try {
    const res = await axios.get(`${baseURL}api/songs/getAll`);
    return res.data;
  } catch (error) {
    return null;
  }
};

export const changingUserRole = async (userId, role) => {
  try {
    const res = axios.put(`${baseURL}api/users/updateRole/${userId}`, {
      data: { role: role },
    });
    return res;
  } catch (error) {
    return null;
  }
};

export const changingUserPremium = async (userId, permission) => {
  try {
    const res = axios.put(`${baseURL}api/users/updatePremium/${userId}`, {
      data: { permission: permission },
    });
    return res;
  } catch (error) {
    return null;
  }
};

export const changingUserPlaylist = async (userId, playlist) => {
  try {
    const res = axios.put(`${baseURL}api/users/newPlaylist/${userId}`, {
      data: { playlist: playlist },
    });
    return res;
  } catch (error) {
    return null;
  }
};

export const removeUser = async (userId) => {
  try {
    const res = axios.delete(`${baseURL}api/users/deleteUser/${userId}`);
    return res;
  } catch (error) {
    return null;
  }
};

export const saveNewSong = async (data) => {
  try {
    const res = axios.post(`${baseURL}api/songs/save`, { ...data });

    return (await res).data.savedSong;
  } catch (error) {
    return null;
  }
};

export const saveNewArtist = async (data) => {
  try {
    const res = axios.post(`${baseURL}api/artist/save`, { ...data });

    return (await res).data.savedArtist;
  } catch (error) {
    return null;
  }
};

export const saveNewAlbum = async (data) => {
  try {
    const res = axios.post(`${baseURL}api/albums/save`, { ...data });

    return (await res).data.savedAlbum;
  } catch (error) {
    return null;
  }
};

export const deleteSongById = async (id) => {
  try {
    const res = axios.delete(`${baseURL}api/songs/delete/${id}`);
    return res;
  } catch (error) {
    return null;
  }
};

export const deleteAlbumById = async (id) => {
  try {
    const res = axios.delete(`${baseURL}api/albums/delete/${id}`);
    return res;
  } catch (error) {
    return null;
  }
};

export const deleteArtistById = async (id) => {
  try {
    const res = axios.delete(`${baseURL}api/artist/delete/${id}`);
    return res;
  } catch (error) {
    return null;
  }
};

export const RequestDelSongById = async (id, deleteRequest) => {
  try {
    const res = axios.put(`${baseURL}api/songs/updatedelete/${id}`, {
      data: { deleteRequest: deleteRequest },
    });
    return res;
  } catch (error) {
    return null;
  }
};

export const RequestDelSongMsg = async (id, deleteRequestMsg) => {
  try {
    const res = axios.put(`${baseURL}api/songs/updatedeletemsg/${id}`, {
      data: { deleteRequestMsg: deleteRequestMsg },
    });
    return res;
  } catch (error) {
    return null;
  }
};

export const RequestDelAlbumById = async (id, deleteRequest) => {
  try {
    const res = axios.put(`${baseURL}api/albums/updatedelete/${id}`, {
      data: { deleteRequest: deleteRequest },
    });
    return res;
  } catch (error) {
    return null;
  }
};

export const RequestDelAlbumMsg = async (id, deleteRequestMsg) => {
  try {
    const res = axios.put(`${baseURL}api/albums/updatedeletemsg/${id}`, {
      data: { deleteRequestMsg: deleteRequestMsg },
    });
    return res;
  } catch (error) {
    return null;
  }
};

export const RequestDelArtistById = async (id, deleteRequest) => {
  try {
    const res = axios.put(`${baseURL}api/artist/updatedelete/${id}`, {
      data: { deleteRequest: deleteRequest },
    });
    return res;
  } catch (error) {
    return null;
  }
};

export const RequestDelArtistMsg = async (id, deleteRequestMsg) => {
  try {
    const res = axios.put(`${baseURL}api/artist/updatedeletemsg/${id}`, {
      data: { deleteRequestMsg: deleteRequestMsg },
    });
    return res;
  } catch (error) {
    return null;
  }
};
