export function $ajax({ method = "get", url, data, success, error, ste_header = "application/x-www-form-urlencoded" }) {
    var xhr = null;
    url = "../"+url
    try {
      xhr = new XMLHttpRequest();
    } catch (error) {
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    if (method == "get" && data) {
      url += `?${data}`;
    }
    xhr.open(method, url, true);
    if (method == "get") {
      xhr.send();
    } else {
      xhr.setRequestHeader("Content-type", ste_header);
      xhr.send(data);
    }
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          if (success) {
            success(xhr.responseText);
          }
        } else {
          if (error) {
            error("Error" + xhr.status);
          }
        }
      }
    }
  }