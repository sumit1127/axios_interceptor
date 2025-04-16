import axios from "axios";

//response
axios.interceptors.response.use(
  (response) => response,
  (err) => {
    const status = err.response ? err.response.status : null;

    if (status == 401) {
      console.log("Unauthorized access");
    } else if (status == 404) {
      console.log("Page Not found");
    } else {
      console.log("Error occured", err);
    }
    return Promise.reject(err);
  }
);

//optimizing request
// axios.interceptors.request.use(
//   (response)=>{
//   response.data = response.data.map((x) => {
//      id : x.id,
//      name : x.name
//   })
//   }
// )

//config for axios interceptor

//sending data in request payload
axios.interceptors.request.use((config) => {
  config.data = {
    title: "new post",
    content: "new content",
  };
  return config;
});
axios
  .post("https://api.bbm.com/posts")
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

//handling query parameters
axios.interceptors.request.use((config) => {
  config.params = {
    category: "Oppenheimer",
    limits: 42,
  };
});
axios
  .get("https://api.bbm.com/posts")
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

//axios instance
const axiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 1000,
});

//request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authtoken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    console.log("request intercepted", config);
    return config;
  },
  (error) => {
    console.log(error);
    return Propmise.reject(error);
  }
);

//response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const status = error.response ? error.response.status : null;

    if (status === 401) {
      console.log("Unauthorized access");
    } else if (status === 404) {
      console.log("Post not found");
    } else {
      console.log("An Error occurred ", error);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
