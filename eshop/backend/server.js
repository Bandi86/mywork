const app = require("./app");
const connectDatabase = require("./db/Database");

// Handling uncaught exceptions
process.on("uncaughtException", (err) => {
	console.log(`ERROR: ${err.message}`);
	console.log("Shutting down the server for handling uncaught exception");
});

// Setting up config file
if (process.env.NODE !== "production") {
	require("dotenv").config({
		path: "config.env",
	});
}

async function main() {
	try {
		await connectDatabase();
	} catch (err) {
		console.log(`Mongoose connection error: ${err.message}`);
		process.exit(1);
	}
}


// Create server
const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
	console.log(`Server is running on https://localhost:${port}`);
});

app.get("/", (req, res) => {
	res.send("Üdvözöljük az alkalmazásban!");
});

// Handling unhandled promise rejections
process.on("unhandledRejection", (err) => {
	console.log(`Shutting down the server for ${err.message}`);
	console.log(
		"Shutting down the server for handling unhandled promise rejections"
	);
	server.close(() => {
		process.exit(1);
	})
});
