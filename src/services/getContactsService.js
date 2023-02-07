import http from "./httpServices";

function getContactsService() {
  return http.get("/contacts");
}

export default getContactsService;
