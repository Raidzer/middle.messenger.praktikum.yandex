import { JSDOM } from "jsdom";
import Sinon from "sinon";

const jsdom = new JSDOM(`<body></body>`, { url: "http://localhost" });

global.window = jsdom.window;
global.document = jsdom.window.document;
global.MouseEvent = jsdom.window.MouseEvent;
global.Node = jsdom.window.Node;
global.history = jsdom.window.history;
global.XMLHttpRequest = Sinon.useFakeXMLHttpRequest();
global.DocumentFragment = jsdom.window.DocumentFragment;
global.HTMLDivElement = jsdom.window.HTMLDivElement;
