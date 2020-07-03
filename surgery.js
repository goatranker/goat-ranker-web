const Axios = require("axios");

const getUser = async () => {
  const options = {
    headers: {
      "x-auth-token": `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZmE5MzFkZTA5ZDBlYTE2MTNlYjJlMCIsImlhdCI6MTU5MzQ3OTk2NX0.qZzE1IvsmBS6pbl98mUL22dIBYvjBLUTlj00041kcJA`,
      user_id: "5efe75b1aff3a40748eb0f6a",
    },
  };
  try {
    const response = await Axios.get(
      "http://localhost:8000/users/account/",
      options
    );

    console.log("response", response.data);
  } catch (error) {
    console.log(error);
  }
};
getUser();
