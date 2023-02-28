import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { IoTrash } from "react-icons/io5";
import {
  deleteAlbumById,
  deleteArtistById,
  deleteSongById,
  getAllAlbums,
  getAllArtists,
  getAllSongs,
} from "../api";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "../config/firebase.config";
import {
  RequestDelSongById,
  RequestDelArtistById,
  RequestDelAlbumById,
  RequestDelSongMsg,
  RequestDelArtistMsg,
  RequestDelAlbumMsg,
} from "../api/index";
import { RiChatDeleteFill } from "react-icons/ri";

const SongCard = ({ data, index, type }) => {
  // console.log(type);
  const [isDelete, setIsDelete] = useState(false);
  const [delReason, setDelReason] = useState(false);
  const [msgContent, setmsgContent] = useState();
  const [seeDeleteMsg, setSeeDeleteMsg] = useState(false);
  const [{ user, alertType, allSongs, allAlbums, allArtists }, dispatch] =
    useStateValue();

  // console.log(data);

  const deleteRequestFunc = () => {
    // Song Delete Request
    if (type === "song") {
      RequestDelSongById(
        data._id,
        data.deleteRequest === "false" ? "true" : "false"
      ).then((res) => {
        // console.log(res.data);
        if (res) {
          getAllSongs().then((data) => {
            dispatch({
              type: actionType.SET_ALL_SONGS,
              allSongs: data.songs,
            });
          });
        }
      });
      if (data.deleteRequest === "true") {
        RequestDelSongMsg(data._id, msgContent).then((res) => {
          console.log(res.data);
          setDelReason(false);
          if (res) {
            getAllSongs().then((data) => {
              dispatch({
                type: actionType.SET_ALL_SONGS,
                allSongs: data.songs,
              });
            });
          }
        });
      } else {
        RequestDelSongMsg(data._id, "").then((res) => {
          console.log(res.data);
          setDelReason(false);
          if (res) {
            getAllSongs().then((data) => {
              dispatch({
                type: actionType.SET_ALL_SONGS,
                allSongs: data.songs,
              });
            });
          }
        });
      }
    }

    // Artist Delete Request
    if (type === "artist") {
      RequestDelArtistById(
        data._id,
        data.deleteRequest === "false" ? "true" : "false"
      ).then((res) => {
        console.log(res.data);
        if (res) {
          getAllArtists().then((data) => {
            dispatch({
              type: actionType.SET_ALL_ARTISTS,
              allArtists: data.artist,
            });
          });
        }
      });
      if (data.deleteRequest === "true") {
        RequestDelArtistMsg(data._id, msgContent).then((res) => {
          console.log(res.data);
          setDelReason(false);
          if (res) {
            getAllArtists().then((data) => {
              dispatch({
                type: actionType.SET_ALL_ARTISTS,
                allArtists: data.artist,
              });
            });
          }
        });
      } else {
        RequestDelArtistMsg(data._id, "").then((res) => {
          console.log(res.data);
          setDelReason(false);
          if (res) {
            getAllArtists().then((data) => {
              dispatch({
                type: actionType.SET_ALL_ARTISTS,
                allArtists: data.artist,
              });
            });
          }
        });
      }
    }

    // Album delete Request
    if (type === "album") {
      RequestDelAlbumById(
        data._id,
        data.deleteRequest === "false" ? "true" : "false"
      ).then((res) => {
        console.log(res.data);
        if (res) {
          getAllAlbums().then((data) => {
            dispatch({
              type: actionType.SET_ALL_ALBUMS,
              allAlbums: data.album,
            });
          });
        }
      });
    }
    if (data.deleteRequest === "true") {
      RequestDelAlbumMsg(data._id, msgContent).then((res) => {
        console.log(res.data);
        setDelReason(false);
        if (res) {
          getAllAlbums().then((data) => {
            dispatch({
              type: actionType.SET_ALL_ALBUMS,
              allAlbums: data.album,
            });
          });
        }
      });
    } else {
      RequestDelAlbumMsg(data._id, "").then((res) => {
        console.log(res.data);
        setDelReason(false);
        if (res) {
          getAllAlbums().then((data) => {
            dispatch({
              type: actionType.SET_ALL_ALBUMS,
              allAlbums: data.album,
            });
          });
        }
      });
    }
  };

  const deleteData = (data) => {
    // console.log(type);
    console.log(data);
    // Song

    if (type === "song") {
      const deleteRef = ref(storage, data.imageURL);

      deleteObject(deleteRef).then(() => {});
      deleteSongById(data._id).then((res) => {
        if (res.data) {
          dispatch({
            type: actionType.set_ALERT_TYPE,
            alertType: "success",
          });
          setTimeout(() => {
            dispatch(
              {
                type: actionType.set_ALERT_TYPE,
                alertType: null,
              },
              3000
            );
            getAllSongs().then((data) => {
              dispatch({
                type: actionType.SET_ALL_SONGS,
                allSongs: data.songs,
              });
            });
          });
        } else {
          dispatch({
            type: actionType.set_ALERT_TYPE,
            alertType: "danger",
          });
          setTimeout(() => {
            dispatch(
              {
                type: actionType.set_ALERT_TYPE,
                alertType: null,
              },
              3000
            );
          });
        }
      });
    }
    // Album
    if (type === "album") {
      const deleteRef = ref(storage, data.imageURL);
      deleteObject(deleteRef).then(() => {});
      deleteAlbumById(data._id).then((res) => {
        if (res.data) {
          dispatch({
            type: actionType.set_ALERT_TYPE,
            alertType: "success",
          });
          setTimeout(() => {
            dispatch(
              {
                type: actionType.set_ALERT_TYPE,
                alertType: null,
              },
              3000
            );
            getAllAlbums().then((data) => {
              dispatch({
                type: actionType.SET_ALL_ALBUMS,
                allAlbums: data.album,
              });
            });
          });
        } else {
          dispatch({
            type: actionType.set_ALERT_TYPE,
            alertType: "danger",
          });
          setTimeout(() => {
            dispatch(
              {
                type: actionType.set_ALERT_TYPE,
                alertType: null,
              },
              3000
            );
          });
        }
      });
    }
    // Artist
    if (type === "artist") {
      const deleteRef = ref(storage, data.imageURL);
      deleteObject(deleteRef).then(() => {});
      console.log(data);
      deleteArtistById(data._id).then((res) => {
        if (res.data) {
          dispatch({
            type: actionType.set_ALERT_TYPE,
            alertType: "success",
          });
          setTimeout(() => {
            dispatch(
              {
                type: actionType.set_ALERT_TYPE,
                alertType: null,
              },
              3000
            );
            getAllArtists().then((data) => {
              dispatch({
                type: actionType.SET_ALL_ARTISTS,
                allArtists: data.artist,
              });
            });
          });
        } else {
          dispatch({
            type: actionType.set_ALERT_TYPE,
            alertType: "danger",
          });
          setTimeout(() => {
            dispatch(
              {
                type: actionType.set_ALERT_TYPE,
                alertType: null,
              },
              3000
            );
          });
        }
      });
    }
  };

  // console.log(data.data.artist);
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="relative w-40 min-w-210 px-2 py-4 cursor-pointer hover:bg-blue-100 bg-white shadow-md rounded-lg flex flex-col items-center hover:shadow-2xl border border-black"
    >
      <div className="2-40 min-w-[160px] h-40 min-h-[160px] rounded-lg drop-shadow-lg relative overflow-hidden">
        <motion.img
          whileHover={{ scale: 1.05 }}
          src={data?.imageURL}
          className="w-full h-full rounded-lg object-cover"
        />
      </div>
      <p className="text-base text-center text-headingColor font-semibold my-2">
        {data.name?.length > 20 ? `${data.name.slice(0, 20)}..` : data.name}
        {data.artist && (
          <span className=" text-sm text-center text-gray-400 flex items-center justify-between my-1">
            {data.artist?.length > 10
              ? `${data.artist.slice(0, 10)}..`
              : data.artist}
          </span>
        )}
      </p>

      <motion.i
        whileTap={{ scale: 0.75 }}
        className={`w-auto h-8 flex p-4 items-center justify-center rounded-md ${
          data.deleteRequest === "false" ? "bg-gray-300" : "bg-red-300"
        } hover:${
          data.deleteRequest === "false" ? "bg-gray-600" : "bg-red-600"
        }`}
        onClick={() =>
          data.deleteRequest === "false"
            ? user.user._id === "636a97696bebbaaf44362a1e" &&
              deleteRequestFunc()
            : setDelReason(true)
        }
      >
        <p>{data.deleteRequest === "false" ? "Request Send" : "Request"}</p>
      </motion.i>

      {user.user._id === "636a97696bebbaaf44362a1e" &&
        data.deleteRequest === "false" && (
          <div
            className="w-full absolute bottom-2 left-40 flex items-center justify-between px-4 "
            onClick={() => {
              setSeeDeleteMsg(!seeDeleteMsg);
            }}
          >
            <motion.i
              whileTap={{ scale: 0.75 }}
              className="text-base text-black drop-shadow-md hover:text-gray-600"
            >
              <RiChatDeleteFill className="h-7 w-7 rounded-md" />
            </motion.i>
          </div>
        )}

      {seeDeleteMsg && (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="absolute z-10 top-72 right-4 p-4 flex items-start flex-col gap-4 bg-white shadow-xl rounded-md border border-black"
        >
          <p className="text-textColor text-[12px] font-semibold">
            {data.deleteRequestMsg}
          </p>
        </motion.div>
      )}

      {delReason && (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="absolute z-10 top-72 right-4 p-6 flex items-start flex-col gap-4 bg-white shadow-xl rounded-md border border-black "
        >
          <input
            type="text"
            className={`w-292 px-4 py-2 border-2 
             hover:border-gray-500  hover:shadow-lg  border-black
           rounded-md bg-white outline-none duration-150 transition-all ease-in-out text-base text-textColor font-semibold`}
            placeholder="Reason For Deletion or Update..."
            value={msgContent}
            onChange={(e) => {
              setmsgContent(e.target.value);
            }}
          />
          <div className="flex items-center gap-4">
            <motion.button
              whileTap={{ scale: 0.75 }}
              className="outline-none border-none text-sm px-4 py-1 rounded-md bg-green-400 text-black hover:shadow-md"
              onClick={deleteRequestFunc}
            >
              Send
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.75 }}
              className="outline-none border-none text-sm px-4 py-1 rounded-md bg-red-400 text-black hover:shadow-md"
              onClick={() => setDelReason(false)}
            >
              Cancel
            </motion.button>
          </div>
        </motion.div>
      )}

      {user.user._id === "636a97696bebbaaf44362a1e" && (
        <div className="w-full absolute bottom-2 right-2 flex items-center justify-between px-4">
          <motion.i
            whileTap={{ scale: 0.75 }}
            className="text-base text-red-400 drop-shadow-md hover:text-red-600"
            onClick={() => setIsDelete(true)}
          >
            <IoTrash />
          </motion.i>
        </div>
      )}
      {isDelete && (
        <motion.div
          className="absolute inset-0 backdrop-blur-md bg-cardOverlay flex items-center flex-col justify-center px-4 py-2 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-lg text-headingColor font-semibold text-center">
            Are you sure do you want to delete it?
          </p>
          <div className="flex items-center gap-4">
            <motion.button
              className="px-3 py-2 text-sm uppercase text-white bg-green-700 rounded-md cursor-pointer"
              whileTap={{ scale: 0.75 }}
              onClick={() => deleteData(data)}
            >
              Yes
            </motion.button>
            <motion.button
              className="px-3 py-2 text-sm uppercase text-white bg-red-700 rounded-md cursor-pointer"
              whileTap={{ scale: 0.75 }}
              onClick={() => {
                setIsDelete(false);
              }}
            >
              No
            </motion.button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SongCard;
