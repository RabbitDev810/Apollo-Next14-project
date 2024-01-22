const axios = require("axios")

const test = async () => {
    const {data} = await axios.get(`http://localhost:3000/api/get-calls?chain=ether&channel_name=All`)
    console.log(JSON.parse(data))
}

test()