import { Appbar } from "../components/Appbar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import JoditEditor from "jodit-react";
//import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
//import "primereact/resources/primereact.min.css"; //core css
//import "primeicons/primeicons.css"; //icons
//import { Editor } from "primereact/editor";

export const Publish = () => {
  const [title, setTitle] = useState("");
  //const [value1, setValue1] = useState("");
  const editor = useRef(null);
  const [content, setContent] = useState("");

  // const [description, setDescription] = useState("");
  const navigate = useNavigate();
  return (
    <div>
      <Appbar />
      <div className="flex justify-center w-full pt-8">
        <div className="max-w-screen-lg w-full">
          <input
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="title"
          />
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your message
            </label>
            <JoditEditor
              ref={editor}
              value={content}
              onChange={(newContent) => setContent(newContent)}
            />
            {/*} <Editor
              value={value1}
              onTextChange={(e) =>
                //@ts-ignore
                setValue1(e.htmlValue)
              }
              className="block p-2.5 w-full   text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 "
              placeholder="Write your thoughts here..."
            ></Editor>
            */}
          </div>
          <button
            onClick={async () => {
              const response = axios.post(
                `${BACKEND_URL}/api/v1/blog`,
                {
                  title,
                  content: content,
                },
                {
                  headers: {
                    Authorization: localStorage.getItem("token"),
                  },
                }
              );
              navigate(`/blog/${(await response).data.id}`);
            }}
            type="submit"
            className="inline-flex items-center   mt-2 px-5 py-2.5 text-sm font-medium text-center text-white bg-green-700 rounded-lg focus:ring-4 focus:ring-blue-200 "
          >
            Publish post
          </button>
        </div>
      </div>
    </div>
  );
};
