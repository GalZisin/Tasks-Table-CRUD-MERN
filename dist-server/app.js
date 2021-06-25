"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var cors_1 = __importDefault(require("cors"));
var taskRoute_1 = __importDefault(require("./routes/taskRoute"));
var auth_1 = __importDefault(require("./routes/auth"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var errors_1 = __importDefault(require("./middlewares/errors"));
var app = express_1.default();
var corsOptions = {
    origin: true,
    credentials: true,
    optionsSuccessStatus: 200, // For legacy browser support
};
app.use(cors_1.default(corsOptions));
app.use(express_1.default.json());
app.use(cookie_parser_1.default());
app.use('/api/v1', taskRoute_1.default);
app.use('/api/v1', auth_1.default);
//Middleware to handle errors
app.use(errors_1.default);
if (process.env.NODE_ENV === 'production') {
    app.use(express_1.default.static('client/build'));
    app.get('/*', function (req, res) {
        console.log('path.resolve == ' + path_1.default.resolve(__dirname, 'client', 'build', 'index.html'));
        var ret = path_1.default
            .resolve(__dirname, 'client', 'build', 'index.html')
            .replace('/dist-server', '')
            .replace('\\dist-server', '');
        res.sendFile(ret);
        console.log('path.resolve ret== ' + ret);
    });
}
exports.default = app;
