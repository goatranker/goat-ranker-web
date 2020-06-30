const Axios = require('axios')
const trypull = async () => {
    try {
        const req = await Axios({
            url: "http://localhost:8000/users/account",
            method: 'GET',
            data: {"user_id": "5efaa51a32a939a57b24ff73"},
            headers: {"x-auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZmFhNTFhMzJhOTM5YTU3YjI0ZmY3MyIsImlhdCI6MTU5MzQ4NDU3MH0.VpDddhQ9zsp7JWam-8pH1_QD1kR6dfHW33YMkYBWhsg"},
        })
    } catch (error) {
        
    }
}
trypull()

