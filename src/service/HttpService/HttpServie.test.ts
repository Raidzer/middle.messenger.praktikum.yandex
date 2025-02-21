/* eslint-disable @typescript-eslint/no-explicit-any */
import { expect } from "chai";
import sinon from "sinon";
import HTTPService from "./HttpService.ts"; // Предполагается, что код находится в HTTPService.ts

describe("HTTPService", () => {
  let http: HTTPService;
  let xhr: sinon.SinonFakeXMLHttpRequestStatic;
  let requests: sinon.SinonFakeXMLHttpRequest | null;

  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest();
    xhr.onCreate = (req) => (requests = req);
    http = new HTTPService("/test");
    requests = null;
  });

  afterEach(() => {
    xhr.restore();
    requests = null;
  });

  describe("Проверка GET", () => {
    it("Должен отправлять GET запрос на правильный endpoint и обрабатывать ответ", async () => {
      const send = http.get("/resource");
      expect(requests).not.equal(null);
      expect(requests?.method).to.equal("GET");
      expect(requests?.url).to.equal(
        "https://ya-praktikum.tech/api/v2/test/resource"
      );

      requests?.respond(
        200,
        { "Content-Type": "application/json" },
        '{"success": true, "id": 1}'
      );

      const response = await send;

      expect(response.status).to.equal(200);
      expect(response.data).to.deep.equal({
        success: true,
        id: 1,
      });
    });
  });

  describe("Проверка POST", () => {
    it("Должен отправлять POST запрос с JSON данными и обрабатывать ответ", async () => {
      const requestData = { key: "value" };
      const send = http.post("/resource", { data: requestData });

      expect(requests).not.equal(null);
      expect(requests?.method).to.equal("POST");
      expect(requests?.requestHeaders["Content-Type"]).to.equal(
        "application/json;charset=utf-8"
      );
      expect(requests?.requestBody).to.equal(JSON.stringify(requestData));
      expect(requests?.url).to.equal(
        "https://ya-praktikum.tech/api/v2/test/resource"
      );

      const responseData = { success: true, id: 1 };
      requests?.respond(
        200,
        { "Content-Type": "application/json" },
        JSON.stringify(responseData)
      );

      const response = await send;
      expect(response.status).to.equal(200);
      expect(response.data).to.deep.equal(responseData);
    });
  });

  describe("Проверка PUT", () => {
    it("Должен отправлять PUT запрос с JSON данными и обрабатывать ответ", async () => {
      const requestData = { key: "updated_value" };
      const send = http.put("/resource", { data: requestData });

      expect(requests).not.equal(null);
      expect(requests?.method).to.equal("PUT");
      expect(requests?.requestHeaders["Content-Type"]).to.include(
        "application/json"
      );
      expect(requests?.requestBody).to.equal(JSON.stringify(requestData));
      expect(requests?.url).to.equal(
        "https://ya-praktikum.tech/api/v2/test/resource"
      );

      const responseData = { success: true, updated: true };
      requests?.respond(
        200,
        { "Content-Type": "application/json" },
        JSON.stringify(responseData)
      );

      const response = await send;
      expect(response.status).to.equal(200);
      expect(response.data).to.deep.equal(responseData);
    });
  });

  describe("Проверка DELETE", () => {
    it("Должен отправлять DELETE запрос и обрабатывать ответ", async () => {
      const send = http.delete("/resource");

      expect(requests).not.equal(null);
      expect(requests?.method).to.equal("DELETE");
      expect(requests?.url).to.equal(
        "https://ya-praktikum.tech/api/v2/test/resource"
      );
      expect(requests?.requestBody).to.equal(undefined);

      const responseData = { success: true, deleted: true };
      requests?.respond(
        200,
        { "Content-Type": "application/json" },
        JSON.stringify(responseData)
      );

      const response = await send;
      expect(response.status).to.equal(200);
      expect(response.data).to.deep.equal(responseData);
    });
  });
});
