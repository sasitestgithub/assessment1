
const express = require("express");
const app = express();
const controller = require("./controller");
const _ = require('lodash')

app.get("/forecast", function (req, res) {
    let queryParams = req.query;

    if (Object.keys(queryParams).length === 0)
        return res.send({ Code: "422", Message: "Please provide city name and sort order" });
    if (!queryParams.city)
        return res.send({ Code: "423", Message: "Please provide city name" });
    if (!queryParams.orderBy)
        return res.send({ Code: "434", Message: "Please provide sort order" });

    let city = queryParams.city;
    const weatherUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=0049058f942c6a19bfa550036cbcb840";
    let sortOrder = queryParams.orderBy;

    controller.getWeatherData(weatherUrl, function (err, response) {
        if (err) {
            console.log('error:', err);
        } else {
            let parsedList = JSON.parse(response);
            let sortedList = _.orderBy(parsedList.list, ["dt"], [sortOrder]);
            var formattedData = controller.formatResponseData(sortedList);
            return res.send(formattedData);
        }
    });
});

app.listen(8080, function () {
    console.log("Weather app listening on port 8080!");
});
