import React, { useEffect, useState } from "react";
import TodoCard from "../components/TodoCard";
import { useDispatch, useSelector } from "react-redux";
import { todoendpoints } from "../services/api";
import { apiConnector } from "../services/apiconnector";
import axios from "axios";
import { setTodolist } from "../slices/todoSlice";
import { toast } from "react-hot-toast";
import {Link, useNavigate} from "react-router-dom";
import { setLoading } from "../slices/authSlice";


import {useAuth} from "@clerk/clerk-react";
import {logindispatcher} from "../services/operations/authApi";

const Home = () => {
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const { token } = useSelector((state) => state.auth);
  console.log("Token From slice",token)
  const [refresh, setrefresh] = useState(false);
  const { CREATE_TODO, DELETE_TODO, GETALL_TODO } = todoendpoints;
  const user = useSelector((state) => state.profile);
  const todolist = useSelector((state) => state.todolist);


  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isSignedIn, isLoaded ,userId,sessionId,getToken } = useAuth();

  console.log(useAuth());


  useEffect(() => {
    console.log("UseEffect");
    const handleSignIn = async () => {
      if (isSignedIn && isLoaded) {
        const token = await getToken();

        dispatch(logindispatcher(userId, sessionId,token, navigate));
      }
    };

    handleSignIn();
  }, [isSignedIn]);

  //add todo handler
  const handleonSubmit = async (e) => {
    e.preventDefault();
    // console.log(token);
    // console.log(user);
    if (isSignedIn === false) {
      toast.error("Log in first to create todo");
      return;
    } else {
      const toastId = toast.loading("loading...");
      dispatch(setLoading(true));
      try {
        const data = await apiConnector("POST", CREATE_TODO, {
          title,
          description,
          userId,
          sessionId,
          token
        }, {
              Authorization :`Bearer ${token}`
            }
            );
        toast.success("Todo created");
        settitle("");
        setdescription("");
        setrefresh((prev) => !prev);
        // console.log("API RESPONSE--", data);
      } catch (e) {
        console.log("SUBMIT TODO ERROR.......", e);
        toast.error("Api error while submiting todo to db");
      }
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };

  //delete  todo handler
  const deleteTodoHandler = async (id) => {
    try {
      // console.log(id);
      const { data } = await axios.delete(`${DELETE_TODO}${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Assuming you are using a bearer token
        },
      });
      // const {data}=await apiConnector("DELETE",)
      toast.success(data.message);
      setrefresh((prev) => !prev);
    } catch (e) {
      console.log("DELTE API ERROR====", e);
      toast.error("Unable to delete todo");
    }
  };
  //fetch all todo handler
  const getAllTodos = async (e) => {
    try {
      // console.log(token);
      // console.log(GETALL_TODO);
      const data2 = await apiConnector("GET", GETALL_TODO, null, {
        Authorization: `Bearer ${token}`,
        token,
      });
      console.log(data2.data.data);

      dispatch(setTodolist(data2.data.data));
    } catch (e) {
      console.log("Fetching TODO ERROR.......", e);
    }
  };
  useEffect(() => {
    getAllTodos();
  }, [refresh]);

  return (
    <div className="flex flex-col">
      <div className="mx-auto flex flex-col w-11/12 items-center justify-center">
        <div
          className={`flex flex-col justify-center items-center gap-y-2 mt-4 lg:w-[80%] w-[100%] display
          ${isSignedIn === false ? "hidden" : "display"} }`}
        >
          <form
            onSubmit={handleonSubmit}
            className="  lg:p-5 md:p-5 p-2 flex items-center flex-col w-[100%] shadow-lg"
          >
            <label className="lg:w-[60%] ">
              <input
                required
                placeholder="Enter Title"
                value={title}
                type="text"
                onChange={(e) => settitle(e.target.value)}
                className="w-full  border-b-2 border-[#789ADE]  p-[12px] placeholder:text-[#768bd7] placeholder:font-Nunito placeholder:font-[400] placeholder:tracking-[3.6px] drop-shadow-none outline-none"
              />
            </label>
            <label className="w-[70%] ">
              <input
                required
                value={description}
                type="text"
                onChange={(e) => setdescription(e.target.value)}
                placeholder="Take a note"
                className="w-[100%] border-b-2  border-[#789ADE]  p-[12px] placeholder:text-[#768bd7] placeholder:font-Nunito placeholder:font-[400] placeholder:tracking-[3.6px] outline-none resize-y"
              />
            </label>
            <button
              type="submit"
              // onClick={() => setTaskbar((prev) => !prev)}
              className="bg-[#8ba5fa] hover:bg-[#7390f2] tracking-[2.6px] p-2 rounded-md mt-3 text-white "
            >
              {/* {taskbar ? " Submit task" : " Add task"} */}
              Submit
            </button>
          </form>
        </div>
        {isSignedIn === false && (
          <div className="text-black font-Nunito font-[900]  flex items-center flex-col mt-40">
            <p className="lg:tracking-[3.6px] lg:text-[30px] text-[25px] tracking-[1.5px]">Welcome to Todo APP</p>
            <p className=" lg:text-[27px] text-[18px]">
              {" "}
              <Link to="login" className="text-[#7a90d7] font-[900]">
               Login   {" "}
              </Link>
              first to create Todo
            </p>
          </div>
        )}
      </div>
      <div className="mx-auto  w-11/12 mt-10 justify-between ">
        <div className=" grid lg:grid-cols-3 grid-cols-2 gap-4">
          {todolist.todolist.map((Task) => {
            return (
              <TodoCard
                key={Task._id}
                title={Task.title}
                description={Task.description}
                id={Task._id}
                deleteTodoHandler={deleteTodoHandler}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
