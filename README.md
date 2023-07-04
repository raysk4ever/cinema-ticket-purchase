# Cinema Ticket Purchasing Platform API

This is a web API built with Node.js and TypeScript that provides functionalities for a Cinema Ticket Purchasing Platform. It allows users to create cinemas with seats, purchase specific seats, and purchase the first two free consecutive seats in a cinema.

## API Endpoints

- `POST /cinemas` - Create a new cinema with N seats. Returns the cinema ID.
- `POST /cinemas/:cinemaId/purchase/:seatNumber` - Purchase a specific seat number in cinema C.
- `POST /cinemas/:cinemaId/purchase-consecutive` - Purchase the first two free consecutive seats in cinema C.

## Prerequisite

- Mongodb
- Redis

## Installation

1. Clone the repository:

```shell
git clone https://github.com/raysk4ever/cinema-ticket-purchase.git
```

2. Install dependencies:
```shell
cd cinema-ticket-platform
npm install
```

3. Start the API server:
```shell
npm start
```

By default, the server runs on port `3000`. You can modify the port in the `src/index.ts` file if needed.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvement, please feel free to open an issue or submit a pull request.

## Author
**Ravi Singh**

[![portfolio](https://img.shields.io/badge/my_portfolio-1DA1F2?style=for-the-badge&logo=ko-fi&logoColor=white)](https://socialamigo.in)  
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ravi-raysk/)  
[![twitter](https://img.shields.io/badge/github-000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/raysk4ever)  
    

## License

You can modify and customize this README file according to your specific project structure and requirements.
