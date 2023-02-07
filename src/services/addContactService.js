import http from "./httpServices";

function addContactService(contact) {
  return http.post("/contacts", contact);
}

export default addContactService;
