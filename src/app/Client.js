/*global  SERVICE_HOST, SERVICE_RESOURCE_LIST, SERVICE_RESOURCE_GET, SERVICE_RESOURCE_WRITE: true*/

export default class Client {

  listResources() {
    let result = new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();
      request.open("GET", this.getServiceHost() + SERVICE_RESOURCE_LIST);
      request.onreadystatechange = () => {
        if (request.readyState == 4){
          if (request.status == 200){
            let raw = request.responseText;
            let objectified = JSON.parse(raw);
            resolve(objectified);
          } else {
            console.log("Error listing the data." + request.response);
            reject("Error listing the data." + request.response);
          }
        }
      };
      request.send();
    });
    return result;
  }

  getResource(path) {
    let result = new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();
      request.open("GET", this.getServiceHost() + SERVICE_RESOURCE_GET + "?path=" + path);
      request.onreadystatechange = () => {
        if (request.readyState == 4){
          if (request.status == 200){
            let raw = request.responseText;
            resolve(raw);
          } else {
            console.log("Error getting the data." + request.response);
            reject("Error getting the data." + request.response);
          }
        }
      };
      request.send();
    });
    return result;
  }

  writeResource(content, path) {
    let result = new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();
      request.open("POST", this.getServiceHost() + SERVICE_RESOURCE_WRITE + "?path=" + path);
      request.onreadystatechange = () => {
        if (request.readyState == 4){
          if (request.status == 200){
            let raw = request.responseText;
            resolve(raw);
          } else {
            console.log("Error writting the data." + request.response);
            reject("Error writting the data." + request.response);
          }
        }
      };
      request.send(content);
    });
    return result;
  }

  getServiceHost(){
    if (SERVICE_HOST){
      return SERVICE_HOST;
    } else {
      return window.location.href;
    }
  }  
}