const express = require("express");
const app = express();

const axios = require("axios");

const port = 3000;

app.get("/register-visit", (req, res) => {
  const ip = req.headers["ip"];
  const token = req.body["token"];

  axios
    .post(
      `http://api.visitoredge.com/api/external-access/public/third-party-data/${ip}`,
      { Authorization: token }
    )
    .then((response) => res.json(response.data))
    .catch((err) => res.secn(err));

  res.send();
});

app.get("/load-pixel", (req, res) => {
  res.send(`  
    function loadInfo() {
        const reqData = {
            url: window.location.href
        };

        let res =  fetch("https://api.visitoredge.com/api/external-access/public/auth-token", {
            method: "GET",
            headers: {
                "Content-Type": 'application/json',
                "SameSite": "Lax",
                "x-api-key": '0b604fb5-37e0-4967-b01d-d23cad71aa6d',
            },
        })
        .then(res => {
            console.log(res)
             fetch("https://api.visitoredge.com/register-visit", {
                method: "POST",
                headers: {
                    "Content-Type": 'application/json',
                    "SameSite": "Lax"
                },
                body: {
                    "token": res.data.token
                }
            })
            .then(console.log)
        })
    }

    loadInfo();
  `);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
