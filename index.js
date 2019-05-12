let facebookSDK;
const loadAutoCompleteAPI = params => {
  const script = document.createElement('script');

  script.type = 'text/javascript';

  script.src = 'https://connect.facebook.net/ja_JP/sdk.js#xfbml=1&version=' + params.version + '&appId=' + params.appId + '&autoLogAppEvents=1';

  document.querySelector('head').appendChild(script);
};

/**
 * facebooksdkloader
 *
 * @param  {object} params
 *
 * @return {promise}
 */
const facebookSdkLoader = params => {
  if (facebookSDK) {
    return Promise.resolve(facebookSDK);
  }

  return new Promise((resolve, reject) => {
    const { appId, version } = params;
    loadAutoCompleteAPI(params);

    window.fbAsyncInit = () => {
      facebookSDK = window.FB;
      facebookSDK.init({
        appId: appId,
        autoLogAppEvents: true,
        xfbml: true,
        version: version
      });
      resolve(facebookSDK);
    };
    console.log(facebookSDK);

    setTimeout(() => {
      if (!window.FB) {
        reject(new Error('Loading took too long'));
      }
    }, 5000);
  });
};

module.exports = facebookSdkLoader;

