
import { getEnv } from './env.js';    // get our value for STG/PROD from config file

//console.log("ENV", getEnv());

const av = Autodesk.Viewing;
const avp = av.Private;

export function initLMV() {
    return new Promise(resolve=>{
    Autodesk.Viewing.Initializer({
        env: getEnv().dtLmvEnv,
        api: 'dt',
        //useCookie: avp.useCookie,
        useCookie: false,
        useCredentials: true,
        shouldInitializeAuth: false,
        opt_out_tracking_by_default: true,
        productId: 'Digital Twins',
        corsWorker: true,

        config3d: {
          extensions: ['Autodesk.BoxSelection'],
          screenModeDelegate: av.NullScreenModeDelegate,
        },
      }, function () {
        avp.logger.setLevel(5);
        resolve();
      });
    });
}

export function startViewer(container) {
    const viewerElement = document.createElement('div');
    container.appendChild(viewerElement);
    const viewer = new av.GuiViewer3D(viewerElement, {
        extensions: ['Autodesk.BoxSelection'],
        screenModeDelegate: av.NullScreenModeDelegate,
        theme: 'light-theme',
      });

    viewer.start();
    window.viewer = viewer;

      // This was in a different place before
    Autodesk.Viewing.endpoint.HTTP_REQUEST_HEADERS['Authorization'] = 'Bearer ' + window.sessionStorage.token;

    return viewer;
}
