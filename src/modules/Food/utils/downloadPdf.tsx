import { Platform } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

import { showDownloadSuccessAlert } from '@app/utils';

type PdfType = {
  title: string;
  pdfSource: string;
};

export function downloadPdf({ title, pdfSource }: PdfType) {
  const DIRS = RNFetchBlob.fs.dirs;
  const path = `${DIRS.DownloadDir}/${title}.pdf`;

  const type = 'application/pdf';

  return new Promise(resolve => {
    RNFetchBlob.config({
      path,
      addAndroidDownloads: {
        useDownloadManager: true,
        path,
        notification: true,
        title: path,
        mime: type,
        mediaScannable: true,
      },
    })
      .fetch('GET', pdfSource)
      .then(res => {
        if (Platform.OS === 'android') {
          showDownloadSuccessAlert({
            onConfirm: () => RNFetchBlob.android.actionViewIntent(res.path(), type),
          });
        } else {
          RNFetchBlob.ios.openDocument(res.path());
        }
        resolve(true);
      })
      .catch(() => resolve(true));
  });
}
