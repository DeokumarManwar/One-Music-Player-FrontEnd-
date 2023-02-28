import React from "react";
import { motion } from "framer-motion";
import { actionType } from "../context/reducer";
import { changingUserPremium } from "../api";
import { useStateValue } from "../context/StateProvider";

const PremiumPage = () => {
  const [{ user, getAllUsers }, dispatch] = useStateValue();
  const updateUserPremium = (userId) => {
    changingUserPremium(userId, "Request Send").then((res) => {
      if (res) {
        getAllUsers().then((data) => {
          dispatch({
            type: actionType.SET_ALL_USERS,
            allUsers: data.data,
          });
        });
      }
    });
  };
  return (
    <div className="text-white">
      Please Contact onlinemusicplayerr@gmail.com
      <div className="flex items-center gap-4">
        <motion.button
          whileTap={{ scale: 0.75 }}
          className="outline-none border-none text-sm px-4 py-1 rounded-md bg-green-400 text-black hover:shadow-md"
          onClick={updateUserPremium(user.user._id)}
        >
          Send
        </motion.button>
      </div>
    </div>
  );
};

export default PremiumPage;
