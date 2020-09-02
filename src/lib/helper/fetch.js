import fetchJsonp from 'fetch-jsonp';

const Helper = {
  fetchJsonp: (API, callback, errorHandler) => {
    fetchJsonp(API)
      .then(res => {
        if (res.status >= 400) {
          throw new Error('Bad response from server');
        }

        return res.json();
      })
      .then(callback, error => {
        if (typeof errorHandler === 'function') errorHandler();
      });
  },

  fetchUsePostWithJson: (
    API,
    callback,
    JsonData = {
      category: '',
      name: '',
      email: '',
      phone: '',
      content: ''
    },
    errorHandler
  ) => {
    fetch(API, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: JSON.stringify(JsonData)
    })
      .then(res => {
        if (res.status >= 400) {
          throw new Error('Bad response from server');
        }

        return res.json();
      })
      .then(callback, error => {
        if (typeof errorHandler === 'function') errorHandler();
      });
  }
};

export default Helper;
