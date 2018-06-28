module.exports = {
    "adapter": process.env.DB_ADAPTER || "mongo", // mongo, mysql, ram
    "mongo": "mongodb://localhost:27017/taskDb",
    "mysql": "mysql://root:parola@192.168.99.100:3306/taskDb"
}