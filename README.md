## Description

This project contains the typescript backend for the challenge. The code has been implemented by keeping
in mind the SOLID principles. You will find use of IoC principle and dependency injection being implemented.

The challenge has been solved in the following way:

1. The excel sheets file is parsed at the time of bootstrapping.
2. There is an abstract class which takes the file path and returns the respective sheet to the concrete class
3. Three sheets have been used in this challenge.
   a. PLNT21: To get the power plants data as individual units. This sheet's data will be used to get Top N plants by the annual net generation and to get the plants that belong to a specific state.

   b. ST21: To get the cumulative annual net generation of the state. As in this sheet each row represents a different state data. This data will be used to calculate the absolute annual net gen value of a state

   c. US21: To get the cumulative annual net generation of all states which means the country. This value will be used to calculate the percentage of a state out of all the states.

## Startup

The utility function parseSheet will be called during the bootstraping of the project. It will parse the excel file into separate sheets while the project is setup so that it's ready to be consumed by the api. Tests will also be run while the project is being started.

The following one command will make the api accesable to be used.

```
make run-project
```

[Note]: First time when you spin up the container it might take a few minutes as it parses the sheets and
once the container has been spun up please access the swagger api playground from the following address.

`localhost:3018/api`

For a faster response use the browser to load the responses instead of the swagger.
For e.g

[http://localhost:3018/power-plants/top?count=10](http://localhost:3018/power-plants/top?count=10)

[http://localhost:3018/power-plants/state/stats?state=ak](http://localhost:3018/power-plants/state/stats?state=ak)

[http://localhost:3018/power-plants/state?state=ak](http://localhost:3018/power-plants/state?state=ak)
