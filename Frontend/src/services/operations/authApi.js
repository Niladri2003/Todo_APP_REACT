import { toast } from "react-hot-toast";

import { setLoading, setToken,setSessionId } from "../../slices/authSlice";
import { apiConnector } from "../apiconnector";
import { endpoints } from "../api";
import { setUser } from "../../slices/user";
import { setTodolist } from "../../slices/todoSlice";

const { SIGNUP_API, LOGIN_API } = endpoints;

export function logindispatcher(userId,sessionId,token, navigate) {
  console.log(userId, sessionId,token);
  return async (dispatch) => {
    try {

      if (!userId && !sessionId) {
        throw new Error("Authentication problem try again");
      }
      dispatch(setToken(token));
      dispatch(setUser(userId));
      dispatch(setSessionId(sessionId));
      navigate("/");
    } catch (e) {
      console.log("LOGIN ERROR............", e);
    }
  };
}


